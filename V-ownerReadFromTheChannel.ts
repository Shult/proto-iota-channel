import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';
import "isomorphic-fetch";

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);

async function ownerCreateChannel() {
  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;
 
  const channelAddress = "5b1de17c370bbdbf6ce9b245d3a5e744d55b669ad6a7e6d0ef9c5d428f29017f0000000000000000:3a1dda08b0be93690dbb8cc8";

  // Authenticate as the owner of the channel 
  await ownerClient.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);
  
  // Reading the channel as the owner
  console.log('reading as the owner...');
  let save1;
  while(true){
	let channelData = await ownerClient.read(channelAddress);
	if(save1== channelData?.[0]?.messageId) {
	}
	else {
		console.log(channelData?.[0]?.log?.payload);
	}
	save1 = channelData?.[0]?.messageId;
	//console.log(channelData?.[0]?.log?.payload);
	await delay(10000);
  }
  
/*
  var i= channelData.length - 1;
  await ownerClient.read(channelAddress)
	.then((response) => {
		while(i!=-1){
			//console.log(response?.[i]?.log?.payload);
			//console.log(response?.[i]?.messageId);
			i--;
		}
	})
	.catch((reason) => {
		console.log(reason);
	})
	.finally(() => {
		console.log("END");
	});
*/


}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

ownerCreateChannel();
