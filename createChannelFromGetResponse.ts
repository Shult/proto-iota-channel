import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);

async function ownerCreateChannel() {
  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;

  // Authenticate as the owner of the channel 
  await ownerClient.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);

  // The owner creates a channel where he/she want to publish data of type 'example-data'.
  const { channelAddress } = await ownerClient.create({
    name: `Channel-${Math.ceil(Math.random() * 100000)}`,
    topics: [{ type: 'example-data', source: 'example-creator' }]
  });
	
  //console.log("Channel Address: "); 
  console.log(channelAddress);

  // Create link to send request to this channel
  const linkRequest = "http://localhost:3002/api/v0.1/subscriptions/request/"+channelAddress+"?api-key=5a3eb628-8cdb-43c9-86d9-37fdf07c01fe";
  //console.log(linkRequest);
}
ownerCreateChannel();
