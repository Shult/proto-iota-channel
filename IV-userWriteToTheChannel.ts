import { AccessRights, IdentityClient, ChannelClient } from '@iota/is-client';

import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const userClient = new ChannelClient(defaultConfig);

async function ownerCreateChannel() {
  // Authenticate as the owner of the channel 
  await userClient.authenticate("did:iota:29SM6ydu7RvKn6LCdM1ey1tgd5kr1N8o1yNpJWLkcwTB", "Ft1Veb2opTCfRUJgaUQf7rJrKMzYUYSVN1KBPxVkoadn");  

  // Writing data to channel as the channel owner. Make sure to authorize potential channel readers beforehand.
  console.log('Writing to channel...');
  await userClient.write("624c8f78c869286f848fc682e94288af36a491a8d3e893c081ae7d1418c0e0440000000000000000:570fbeacd99c26b686a6b9db", {
    payload: { log: "Hey, it's my first message on the channel" }
  });

}
ownerCreateChannel();
