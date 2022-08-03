import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const userClient = new ChannelClient(defaultConfig);

async function userReadHistoryFromTheChannel() {
  // Recover the user identity
  const userIdentity = JSON.parse(readFileSync('./sylvainIdentityFrom0.json').toString()) as IdentityJson;
 
  const channelAddress = "5b1de17c370bbdbf6ce9b245d3a5e744d55b669ad6a7e6d0ef9c5d428f29017f0000000000000000:3a1dda08b0be93690dbb8cc8";

  // Authenticate as an user of the channel 
  await userClient.authenticate(userIdentity.doc.id, userIdentity.key.secret);
  
  // Reading the channel as an user
  console.log('reading as an user...');
  let channelData = await userClient.read(channelAddress);

  // Print all message sent to the channel
  console.log(channelData.length);
  let i=channelData.length - 1;
  while(i!= -1) {
	console.log('Message: ', channelData?.[i]?.log?.payload);
	i--;
  }
}
userReadHistoryFromTheChannel();
