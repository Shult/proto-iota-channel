import { AccessRights, IdentityClient, ChannelClient } from '@iota/is-client';

import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);

async function ownerCreateChannel() {
  // Authenticate as the owner of the channel 
  await ownerClient.authenticate("did:iota:64aT68cUaMEpFeyE2CvXzyFvoV37iMT2FsiNCpQ6JreS", "84oHbpsduwuY8uMEsLg2TGkPhfBnqBBNbPmEyvssBZVL");
   
  // Find subscriptions to the channel that are not already authorized.
  const subscriptions = await ownerClient.findAllSubscriptions("624c8f78c869286f848fc682e94288af36a491a8d3e893c081ae7d1418c0e0440000000000000000:570fbeacd99c26b686a6b9db", false);

  console.log('Subscriptions Found:', subscriptions);

  const unauthorizedSubscriptions = subscriptions.filter(
    (subscription) => !subscription.isAuthorized
  );

  console.log('Unauthorized subscriptions:', unauthorizedSubscriptions);

  for (const subscription of unauthorizedSubscriptions) {
    console.log(`Authorizing subscription: ${subscription.id}...`);
    //Authorize the user to the channel. Authorization can happen via the id of the user or the generated subscription link.
    const keyloadLink = await ownerClient.authorizeSubscription("624c8f78c869286f848fc682e94288af36a491a8d3e893c081ae7d1418c0e0440000000000000000:570fbeacd99c26b686a6b9db", {
      id: subscription.id
    });
    console.log('Subscription Keyload Link:', keyloadLink);
  }
}
ownerCreateChannel();
