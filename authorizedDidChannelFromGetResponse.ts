import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';
import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);


async function ownerCreateChannel() {
  const fs = require('fs');

  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;

  const channelID = readFileSync('./channelID.txt').toString();
  
  const channelAddress = channelID;
  // Authenticate as the owner of the channel 
  await ownerClient.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);
   
  // Find subscriptions to the channel that are not already authorized.
  const subscriptions = await ownerClient.findAllSubscriptions(channelAddress, false);
  const subscriptions2 = await ownerClient.findAllSubscriptions(channelAddress, true);

  // Print all details
  //console.log('Subscriptions Found:', subscriptions);
  //console.log("Already subscribe", subscriptions2);
 
  console.log("Subscriptions Found:");  
  subscriptions.forEach(element => console.log(element.id));
  
  console.log("Already subscribe:");
  subscriptions2.forEach(element => console.log(element.id));  

  const unauthorizedSubscriptions = subscriptions.filter(
    (subscription) => !subscription.isAuthorized
  );

  //console.log('Unauthorized subscriptions:', unauthorizedSubscriptions);
  console.log('Unauthorized subscriptions:');
  unauthorizedSubscriptions.forEach(element => console.log(element.id));  

  for (const subscription of unauthorizedSubscriptions) {
    console.log(`Authorizing subscription: ${subscription.id}...`);
    //Authorize the user to the channel. Authorization can happen via the id of the user or the generated subscription link.
    const keyloadLink = await ownerClient.authorizeSubscription(channelAddress, {
      id: subscription.id
    });
    //console.log('Subscription Keyload Link:', keyloadLink);

    console.log("Write the DID's user that request the channel in a file, to give it to the user, for him to create a DID for the user that request.");
    fs.writeFileSync("userDidThatRequestTheChannel.txt", subscription.id);
    //console.log(subscription.id);
  }
}
ownerCreateChannel();
