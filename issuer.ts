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

  // Get the information for the entry "askCredential" by reading the file user.json
  const userData = JSON.parse(readFileSync('./user.json').toString());

  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;
 
  const channelAddress = "b20fec6b0e0e46c07ebd567fc42debf5b50a74f51fce51902166763c16e5b7730000000000000000:96535c623ce19ba653d590f5";

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
			writeFileSync('idCardAlice.json', JSON.stringify(driverCredential, null, 2));
			console.log("Driver license: ");
			console.log(driverCredential);
		}
		
		// Enter "askCredential" to get your credential (The issuer will read the file user.json to get the informations about the user)
		if(payload.startsWith('Holder: askCredential')) {
			console.log("Sending credential to ", userData.did);

                        // Authenticate as the admin identity
                        await identity.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);

                        //Get root identity to issue an credential for the new driver
                        const adminIdentityPublic = await identity.find(adminIdentity.doc.id);
                        console.log(`Root identity's id: `, adminIdentityPublic.id);

                        // Get root identity's credential to create new credentials
                        // @ts-ignore: Object is possibly 'null'.
                        const identityCredential = adminIdentityPublic!.verifiableCredentials[0];

                        // List all trusted authorities, currently only one authority is trusted for issuing credenti>
                        const trustedAuthorities = await identity.getTrustedAuthorities();
                        console.log('Trusted authorities: ', trustedAuthorities);

                        // Assign a verifiable credential to the driver for drive allowance
                        const userCredential = await identity.createCredential(
                                identityCredential,
                                //payload,
                                userData.did,
                                CredentialTypes.BasicIdentityCredential,
                                UserType.Person,
                                {
                                        firstname: userData.firstname,
                                        lastname: userData.lastname,
                                        age: userData.age
                                }
                        );
                        writeFileSync('userCredential.json', JSON.stringify(userCredential, null, 2));
                        console.log("User credential: ");
                        console.log(userCredential);

			//Notify the user that the credential is created
			console.log("Sending notification to:", userData.firstname, userData.lastname);
			console.log('Writing to channel...');
			let variablePayload = "Issuer: Your credential is ready " + userData.firstname + " " + userData.lastname;
			await ownerClient.write(channelAddress, {
				//payload: "Issuer: Your credential is ready !"
				payload: variablePayload
			});

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
