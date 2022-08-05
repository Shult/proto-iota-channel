import { AccessRights, IdentityClient, ChannelClient, IdentityJson, CredentialTypes, UserType } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';
import { writeFileSync } from 'fs';
import { externalDriverCredential1 } from './externalData';
import "isomorphic-fetch";

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);

async function ownerCreateChannel() {
  const identity = new IdentityClient(defaultConfig);
  /*
  // For the credential, we don't need anymore to read the user identity, the user now send his credential by a message in the channel
  const userIdentity = JSON.parse(readFileSync('./sylvainIdentityFrom0.json').toString()) as IdentityJson;
  */

  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;
 
  const channelAddress = "e5a68d7c62652d3c5acb8fb7366a67ce52e921b90a870ed82941cc0db6d66c0b0000000000000000:4097c1bd8c6c9841fc9d7f2a";

  // Authenticate as the owner of the channel 
  await ownerClient.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);
  
  // Reading the channel as the owner
  console.log('reading as the owner...');
  let save1;

  // Waiting for new message on the channel, and respond back
  while(true){
	let channelData = await ownerClient.read(channelAddress);

	// Check if it's a new message or not. If it's not a new message do nothing, else print the message and respond to it.
	if(save1== channelData?.[0]?.messageId) {
	}
	else {
		// Print the new message
		console.log(channelData?.[0]?.log?.payload);
		const payload = channelData?.[0]?.log?.payload;

		/*
		// Parse the payload to JSON to get multiple variable from the user
		if(payload.startsWith('{')) {
			console.log("Parsing JSON");
			let payloadJSON = JSON.parse(payload);
			console.log(payloadJSON.firstname);
		}		
		*/
	
		// Check if the credentials is okay
		if(channelData?.[0]?.log?.payload == "Verif cred") {
			console.log("Verifying credential");
		}

		// Example of startsWith
		if(payload.startsWith('did:iota:')){
			console.log("DID iota valide");
		}

		if(payload == "easter egg"){
			console.log("Just a test");
		}		

		// Enter a valid DID to get a credentials
		//if(payload.startsWith('did:iota:')){
		if(payload.startsWith('{"type":"askCredential",')) {
                        console.log("Parsing JSON...");
                        let payloadJSON = JSON.parse(payload);

			console.log("Sending credential to ", payloadJSON.did);
			
			// Authenticate as the admin identity
			await identity.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);

			//Get root identity to issue an credential for the new driver
			const adminIdentityPublic = await identity.find(adminIdentity.doc.id);
			console.log(`Root identity's id: `, adminIdentityPublic.id);

			// Get root identity's credential to create new credentials
			// @ts-ignore: Object is possibly 'null'.
			const identityCredential = adminIdentityPublic!.verifiableCredentials[0];

			// List all trusted authorities, currently only one authority is trusted for issuing credentials
			const trustedAuthorities = await identity.getTrustedAuthorities();
			console.log('Trusted authorities: ', trustedAuthorities);

			// Assign a verifiable credential to the driver for drive allowance
			const driverCredential = await identity.createCredential(
				identityCredential,
				//payload,
				payloadJSON.did,
				CredentialTypes.BasicIdentityCredential,
				UserType.Person,
				{
					//firstname: "MESTRE",
					//lastname: "Sylvain",
					//age: "22"
					firstname: payloadJSON.firstname,
                                        lastname: payloadJSON.lastname,
                                        age: payloadJSON.age
				}
			);
			writeFileSync('idCardShult.json', JSON.stringify(driverCredential, null, 2));
			console.log("Driver license: ");
			console.log(driverCredential);
		}
	}
	save1 = channelData?.[0]?.messageId;
	//console.log(channelData?.[0]?.log?.payload);
	await delay(10000);
  }
  
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

ownerCreateChannel();
