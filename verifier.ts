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
	const channelAddress = "b20fec6b0e0e46c07ebd567fc42debf5b50a74f51fce51902166763c16e5b7730000000000000000:96535c623ce19ba653d590f5";

	// Reading the channel as the verifier
	console.log('Reading as the verifier...');

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
		
			if(payload === "Holder: checkMyCredential") {
				console.log("Checking credential...");
					
				const identity = new IdentityClient(defaultConfig);
				const credentialToCheck = JSON.parse(readFileSync('./userCredential.json').toString());
				const verified = await identity.checkCredential(credentialToCheck);
				console.log('Credential verification: ', verified.isVerified);
				
				if(verified.isVerified == true) {
					console.log("Writing to channel as the Verifier...");
					await verifierClient.write(channelAddress, {
						payload: "Verifier: Welcom "+ credentialToCheck.credentialSubject.firstname +" "+credentialToCheck.credentialSubject.lastname
					});
				} else {
					console.log("Writing to channel as the Verifier...");
                                        await verifierClient.write(channelAddress, {
                                                payload: "Verifier: Credential not valid"
                                        });
				}

			}
		}
		save1 = channelData?.[0]?.messageId;
		await delay(10000);
	}
}

function delay(ms: number) {
	return new Promise( resolve => setTimeout(resolve, ms) );
}

verifier();
