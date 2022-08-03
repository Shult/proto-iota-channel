import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);

  //const channelAddress = "5b1de17c370bbdbf6ce9b245d3a5e744d55b669ad6a7e6d0ef9c5d428f29017f0000000000000000:3a1dda08b0be93690dbb8cc8";

async function ownerCreateChannel() {
  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;
 
  const channelAddress = "5b1de17c370bbdbf6ce9b245d3a5e744d55b669ad6a7e6d0ef9c5d428f29017f0000000000000000:3a1dda08b0be93690dbb8cc8";

  // Authenticate as the owner of the channel 
  await ownerClient.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);
  
  // Reading the channel as the owner
  console.log('reading as the owner...');
  let channelData = await ownerClient.read(channelAddress);
  //console.log('First channel data log: ', channelData?.[0]?.log?.payload);   

  // Print all message sent to the channel
  //channelData.forEach(element => console.log(element.log?.payload));
  console.log(channelData.length);
  let i=channelData.length - 1;
  while(i!= -1) {
	console.log('Message: ', channelData?.[i]?.log?.payload);
	i--;
  }
}
ownerCreateChannel();
