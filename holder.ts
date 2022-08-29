import { AccessRights, IdentityClient, ChannelClient, IdentityJson, CredentialTypes, UserType } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';
import { writeFileSync } from 'fs';
import { externalDriverCredential1 } from './externalData';
import "isomorphic-fetch";


// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const userClient = new ChannelClient(defaultConfig);

async function userWriteToTheChannel() {
	// Authentification as a user (Alice)
	const adminIdentity = JSON.parse(readFileSync('./userIdentity.json').toString()) as IdentityJson;
	await userClient.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);
  
	// Address of the channel
	const channelAddress = "d6f21075c8e6b88ff84991c606c895c4133b8daecaa93e182a52accd6449da5c0000000000000000:1bd4b67a050b0500c46c50f9";
  
	// Writing data to channel as the channel owner. Make sure to authorize potential channel readers beforehand.
	console.log('Writing to channel...');
	await userClient.write(channelAddress, {
		//payload: "TEST ALICE"
		//payload: "Holder: askCredential"
		payload: "Holder: checkMyCredential"
	});

	// When the message is sent, the user is waiting for a response 
	//console.log("reading as a user...");
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
				//console.log("Your credential is ready !");
				console.log('Writing to channel...');
				await userClient.write(channelAddress, {
					payload: "Holder: Ok thank you !"
				});
			}
		}
		save1 = channelData?.[0]?.messageId;
		await delay(10000);
	}
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const prompt = require("prompt-sync")({ sigint: true });
const cmd = prompt("Enter 'A' to askCredential and 'C' to checkCredential? ");
console.log(`You are ${cmd} years old.`);
if(cmd=="A"){
	console.log("asking credential...");
}else if (cmd=="C"){
	console.log("checking credential");
}
userWriteToTheChannel();


