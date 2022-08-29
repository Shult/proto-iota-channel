import fetch from 'node-fetch';
import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const userClient = new ChannelClient(defaultConfig);


type GetUsersResponse = {
  channelID: string;
};

async function getChannel() {
	try {
		const response = await fetch('http://localhost:8080/channelID', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}

		// 👇️ const result: GetUsersResponse
		const result = (await response.json()) as GetUsersResponse;

		console.log('result is: ', JSON.stringify(result, null, 4));
		console.log("ChannelID = "+ result.channelID);
		
	// ------------- Request subscription-----------------------
		const userIdentity = JSON.parse(readFileSync('./userIdentity.json').toString()) as IdentityJson;
		const channelAddress = result.channelID;
		console.log("Send a subscription request to : "+channelAddress);

		// Authenticate as an user of the channel
		await userClient.authenticate(userIdentity.doc.id, userIdentity.key.secret);

		try {
			// Request subscription to the channel as the user. The returned subscriptionLink can be used to authorize the use>
			const { subscriptionLink } = await userClient.requestSubscription(channelAddress, {
				accessRights: AccessRights.ReadAndWrite
			});
		} catch (e) {
			if(e=400){
				console.log("Error : request already sent", e);
			}
			else if(e=401){
				console.log("Error : No valid api key provided/ Not authenticated", e);
			}
			else if(e=201){
				console.log("Request sent successfully !");
			}
			else {
				console.log("Unexpected error", e);
			}
  }
	// ------------- Request authentification END -----------------------

	// ------------- Notifie the issuer that a new request is here -----------------------
		try {
			const response = await fetch('http://localhost:8080/channelAuthorizedSubscription', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Error! status: ${response.status}`);
			}

			// 👇 const result: GetUsersResponse
			const result = (await response.json()) as GetUsersResponse;

			console.log('result is: ', JSON.stringify(result, null, 4));
		} catch (e) {
			if(e=400){
				console.log("Error : request already sent", e);
			}
			else if(e=401){
				console.log("Error : No valid api key provided/ Not authenticated", e);
			}
			else if(e=201){
				console.log("Request sent successfully !");
			}
			else {
				console.log("Unexpected error", e);
		}
  }

	// ------------- Notifie the issuer that a new request is here-----------------------


		return result.channelID;
	} catch (error) {
		if (error instanceof Error) {
			console.log('error message: ', error.message);
			return error.message;
		} else {
			console.log('unexpected error: ', error);
			return 'An unexpected error occurred';
		}
	}
}

getChannel();
