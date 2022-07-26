import { AccessRights, IdentityClient, ChannelClient } from '@iota/is-client';

import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const ownerClient = new ChannelClient(defaultConfig);

async function ownerCreateChannel() {
  // Authenticate as the owner of the channel 
  await ownerClient.authenticate("did:iota:64aT68cUaMEpFeyE2CvXzyFvoV37iMT2FsiNCpQ6JreS", "84oHbpsduwuY8uMEsLg2TGkPhfBnqBBNbPmEyvssBZVL");

  // The owner creates a channel where he/she want to publish data of type 'example-data'.
  const { channelAddress } = await ownerClient.create({
    name: `Channel-${Math.ceil(Math.random() * 100000)}`,
    topics: [{ type: 'example-data', source: 'example-creator' }]
  });
	
  console.log("Channel Address: "); 
  console.log(channelAddress);

  console.log('Writing to channel...');
  // Writing data to the channel as the channel owner.
  await ownerClient.write(channelAddress, {
    payload: { log: `This is log file 1` }
  });
}
ownerCreateChannel();
