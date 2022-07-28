import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const userClient = new ChannelClient(defaultConfig);

async function ownerCreateChannel() {
  const userIdentity = JSON.parse(readFileSync('./sylvainIdentityFrom0.json').toString()) as IdentityJson;

  // Authenticate as the owner of the channel 
  await userClient.authenticate(userIdentity.doc.id, userIdentity.key.secret);  

  // Request subscription to the channel as the user. The returned subscriptionLink can be used to authorize the user to the channel.
  const { subscriptionLink } = await userClient.requestSubscription("611f2ce8d70f309787c223b52b4f9a0ec73170c16b655674e9e7ad148b4a94ba0000000000000000:b7e2911ae63290ba161d2578", {
    accessRights: AccessRights.ReadAndWrite
  });
   
  console.log("Add this in the future");
  console.log("201 : Request send");
  console.log('Subscription Link:', subscriptionLink);
  console.log("400 : Request already send"); 
}
ownerCreateChannel();
