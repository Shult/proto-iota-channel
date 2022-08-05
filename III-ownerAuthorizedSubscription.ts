import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);

async function ownerCreateChannel() {
  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;
  
  const channelAddress = "e5a68d7c62652d3c5acb8fb7366a67ce52e921b90a870ed82941cc0db6d66c0b0000000000000000:4097c1bd8c6c9841fc9d7f2a";
  // Authenticate as the owner of the channel 
  await ownerClient.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);
   
  // Find subscriptions to the channel that are not already authorized.
  const subscriptions = await ownerClient.findAllSubscriptions(channelAddress, false);
  const subscriptions2 = await ownerClient.findAllSubscriptions(channelAddress, true);

  console.log('Subscriptions Found:', subscriptions);
  console.log("Already subscribe", subscriptions2);
  const unauthorizedSubscriptions = subscriptions.filter(
    (subscription) => !subscription.isAuthorized
  );

  console.log('Unauthorized subscriptions:', unauthorizedSubscriptions);

  for (const subscription of unauthorizedSubscriptions) {
    console.log(`Authorizing subscription: ${subscription.id}...`);
    //Authorize the user to the channel. Authorization can happen via the id of the user or the generated subscription link.
    const keyloadLink = await ownerClient.authorizeSubscription(channelAddress, {
      id: subscription.id
    });
    console.log('Subscription Keyload Link:', keyloadLink);
  }
}
ownerCreateChannel();
