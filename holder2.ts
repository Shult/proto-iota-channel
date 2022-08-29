import { AccessRights, IdentityClient, ChannelClient, IdentityJson, CredentialTypes, UserType } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';
import { writeFileSync } from 'fs';
import { externalDriverCredential1 } from './externalData';
import "isomorphic-fetch";


// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const userClient = new ChannelClient(defaultConfig);

// Provient de GET.TS
type GetUsersResponse = {
  channelID: string;
};


async function userWriteToTheChannel(cmd: string) {
	// Authentification as a user
	const userIdentity = JSON.parse(readFileSync('./userIdentity.json').toString()) as IdentityJson;
	var PORT="0";
	await userClient.authenticate(userIdentity.doc.id, userIdentity.key.secret);

	try {
		if(cmd=="Holder: askCredential"){
			//console.log("cmd (A) = ", cmd);
			PORT = "8080";

		} else if(cmd=="Holder: checkMyCredential"){
			//console.log("cmd (C) = ", cmd);
			PORT = "8081";
		}
		console.log("PORT = ", PORT);

	// ------------ Get channel ID ------------------
		console.log("Ask the API the channelID...");
		// Ask the API the channelID
                const response = await fetch('http://localhost:'+PORT+'/channelID', {
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

                //console.log('result is: ', JSON.stringify(result, null, 4));
                console.log("The channelID id : "+ result.channelID);
	// ------------ Get channel ID END ------------------	


	// ------------- Request subscription-----------------------
                const channelAddress = result.channelID;
                console.log("Send a subscription request to : "+channelAddress +"...");

                // Authenticate as an user of the channel
                //await userClient.authenticate(userIdentity.doc.id, userIdentity.key.secret);

                try {
                        // Request subscription to the channel as the user. 
                        const { subscriptionLink } = await userClient.requestSubscription(channelAddress, {
                                accessRights: AccessRights.ReadAndWrite
                        });
                } catch (e) {
			// Error handler
		}
        // ------------- Request authentification END -----------------------

	// ------------- Notify the client that a new request is here -----------------------
                try {
			if(cmd=="Holder: askCredential"){
				console.log("Notify the isser that a new request is here...");
			} else if(cmd=="Holder: checkMyCredential") {
				console.log("Notify the verifier that a new request is here...");
			}

                        const response = await fetch('http://localhost:'+PORT+'/channelAuthorizedSubscription', {
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

			// Ici attendre que l'authorization soit accepté

                        console.log('result of the GET channelAuthorizationSubscription: ', JSON.stringify(result, null, 4));
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

        // ------------- Notify the issuer that a new request is here END -----------------------
	
	// ----------- BIG THNING INCOMING END --------------------


	  
	// Writing data to channel as an user. Send 'A' for ask credential and 'C' for check credential
	console.log('Writing to channel "'+ cmd +'"...');
	await userClient.write(channelAddress, {
		//payload: "TEST ALICE"
		//payload: "Holder: askCredential"
		//payload: "Holder: checkMyCredential"
		payload: cmd
	});
	
	// ------------------- Notify the issuer that there is a new message on the channel ---------------
		try {
                        console.log("Notify the issuer that there is a new message on the channel...");
                        const response = await fetch('http://localhost:'+PORT+'/newMessageOnTheChannel', {
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

                        console.log('result of the GET channelAuthorizationSubscription: ', JSON.stringify(result, null, 4));
                } catch (e) {
                        if(e=400){
                                console.log("Error message 1", e);
                        }
                        else if(e=401){
                                console.log("Error message 2", e);
                        }
                        else if(e=201){
                                console.log("Error message 3");
                        }
                        else {
                                console.log("Error message : Unexpected error", e);
			}
                }

	// ------------------- Notify the issuer that there is a new message on the channel END ---------------
	
	// When the message is sent, the user is waiting for a response 
	let save1;
	while(true) {
		let channelData = await userClient.read(channelAddress);

		// Check if it's a new message or not. If it's not a new message do nothing, else print the message and resp>
		if(save1== channelData?.[0]?.messageId) {
		}
		else {
			// Print the new message
			const payload = channelData?.[0]?.log?.payload;
			console.log(payload);
			console.log("reading as a user...");
			if(payload.startsWith("Issuer: Your credential is ready")){
				input();
				break;
			}
			if(payload.startsWith("Verifier: Welcom")){
                                input();
                                break;
                        }

			
		}
		save1 = channelData?.[0]?.messageId;
		await delay(10000);
	}
	
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

// Delay fonction
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
} 

// Ask the user to send an ask Credential request or a check credential request 
function input(){
	const prompt = require("prompt-sync")({ sigint: true });
	const cmd = prompt("Enter 'A' to askCredential and 'C' to checkCredential? ");
	if(cmd=="A"){
		console.log("asking credential...");
		userWriteToTheChannel("Holder: askCredential");
	}else if (cmd=="C"){
		console.log("checking credential...");
		userWriteToTheChannel("Holder: checkMyCredential");
	}
}

input();
