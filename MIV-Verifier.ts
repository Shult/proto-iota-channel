import { AccessRights, IdentityClient, ChannelClient, CredentialTypes, UserType, IdentityJson } from '@iota/is-client';
import { defaultConfig } from './configuration';
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';


const verifierClient = new ChannelClient(defaultConfig);

async function verifier() {
	const identity = new IdentityClient(defaultConfig);

	// Recover the verifier identity
	const verifierIdentity = JSON.parse(readFileSync('./verifierIdentity.json').toString()) as IdentityJson;

	// Authenticate as the verifier of the channel
	await verifierClient.authenticate(verifierIdentity.doc.id, verifierIdentity.key.secret);  

	// List all trustedAuthorities, to verify the external authority has been added
	const trustedAuthorities2 = await identity.getTrustedAuthorities();
	console.log('Trusted authorities: ', trustedAuthorities2);

	// Address du channel
	const channelAddress = "e5a68d7c62652d3c5acb8fb7366a67ce52e921b90a870ed82941cc0db6d66c0b0000000000000000:4097c1bd8c6c9841fc9d7f2a";

	// Reading the channel as the verifier
	console.log('reading as the verifier...');

	// Previous message on the channel, to avoit to print it two time
	let save1;

	while(true) {
		let channelData = await verifierClient.read(channelAddress);
		
	        // Check if it's a new message or not. If it's not a new message do nothing, else print the message and resp>
		if(save1== channelData?.[0]?.messageId) {
			// Same message from the last reading so we are doing nothing to avoid spam.
		}
		else {
			// Print the new message
	                const payload = channelData?.[0]?.log?.payload;
			console.log(payload);
		
			if(payload === "checkMyCredential") {
				verifieCredential();
			}
		}
		save1 = channelData?.[0]?.messageId;
		await delay(10000);
	}
}

function delay(ms: number) {
	return new Promise( resolve => setTimeout(resolve, ms) );
}

async function verifieCredential() {
	console.log("Checking credential...");
	
	// Temporary : Read the idCardShult.json but in the future we want to check the credential by getting the credential by the user message on the channel
	const identity = new IdentityClient(defaultConfig);
	const credentialToCheck = JSON.parse(readFileSync('./idCardShult.json').toString());
	
	const verified = await identity.checkCredential(credentialToCheck);
	console.log('Credential verification: ', verified);
}

verifier();
