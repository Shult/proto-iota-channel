import { AccessRights, IdentityClient, ChannelClient } from '@iota/is-client';

import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);

async function ownerWriteToTheChannel() {
  // Authenticate as the owner of the channel 
  await ownerClient.authenticate("did:iota:64aT68cUaMEpFeyE2CvXzyFvoV37iMT2FsiNCpQ6JreS", "84oHbpsduwuY8uMEsLg2TGkPhfBnqBBNbPmEyvssBZVL");  

  // Writing data to channel as the channel owner. Make sure to authorize potential channel readers beforehand.
  console.log('Writing to channel...');
  await ownerClient.write("624c8f78c869286f848fc682e94288af36a491a8d3e893c081ae7d1418c0e0440000000000000000:570fbeacd99c26b686a6b9db", {
    payload: { log: "Hey, I'm the channel owner, welcom everyone !" }
  });

}
ownerWriteToTheChannel();
