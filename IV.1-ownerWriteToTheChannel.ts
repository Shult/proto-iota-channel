import { AccessRights, IdentityClient, ChannelClient } from '@iota/is-client';

import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);

async function ownerWriteToTheChannel() {
  // Authenticate as the owner of the channel 
  await ownerClient.authenticate("did:iota:64aT68cUaMEpFeyE2CvXzyFvoV37iMT2FsiNCpQ6JreS", "84oHbpsduwuY8uMEsLg2TGkPhfBnqBBNbPmEyvssBZVL");  

  // Writing data to channel as the channel owner. Make sure to authorize potential channel readers beforehand.
  console.log('Writing to channel...');
  await ownerClient.write("e5a68d7c62652d3c5acb8fb7366a67ce52e921b90a870ed82941cc0db6d66c0b0000000000000000:4097c1bd8c6c9841fc9d7f2a", {
    payload: "checkMyCredential"
  });

}
ownerWriteToTheChannel();
