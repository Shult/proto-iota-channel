import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);

async function ownerCreateChannel() {
  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;
  
  const channelAddress = "5b1de17c370bbdbf6ce9b245d3a5e744d55b669ad6a7e6d0ef9c5d428f29017f0000000000000000:3a1dda08b0be93690dbb8cc8";
  // Authenticate as the owner of the channel 
  await ownerClient.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);
   
  // Find subscriptions to the channel that are not already authorized.
  const subscriptions = await ownerClient.findAllSubscriptions(channelAddress, false);

  console.log('Subscriptions Found:', subscriptions);
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
