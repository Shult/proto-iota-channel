import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const userClient = new ChannelClient(defaultConfig);

async function ownerCreateChannel() {
  const userIdentity = JSON.parse(readFileSync('./verifierIdentity.json').toString()) as IdentityJson;
  const channelAddress = "e5a68d7c62652d3c5acb8fb7366a67ce52e921b90a870ed82941cc0db6d66c0b0000000000000000:4097c1bd8c6c9841fc9d7f2a";
  console.log("Send a subscription request to : "+channelAddress);
  
  // Authenticate as the owner of the channel 
  await userClient.authenticate(userIdentity.doc.id, userIdentity.key.secret);  

  try {
  // Request subscription to the channel as the user. The returned subscriptionLink can be used to authorize the user to the channel.
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
}
ownerCreateChannel();
