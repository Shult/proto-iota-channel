import { AccessRights, IdentityClient, ChannelClient, IdentityJson } from '@iota/is-client';
import { readFileSync } from 'fs';
import { defaultConfig } from './configuration';

// In this example we will use two instances of the ChannelClient() both will authenticate a different user.
const userClient = new ChannelClient(defaultConfig);

async function userWriteToTheChannel() {
  const adminIdentity = JSON.parse(readFileSync('./shultIdentity.json').toString()) as IdentityJson;
  await userClient.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);
  const channelAddress = "e5a68d7c62652d3c5acb8fb7366a67ce52e921b90a870ed82941cc0db6d66c0b0000000000000000:4097c1bd8c6c9841fc9d7f2a";
  // Writing data to channel as the channel owner. Make sure to authorize potential channel readers beforehand.
  console.log('Writing to channel...');
  await userClient.write(channelAddress, {
    //payload: { log: '1' }
    //payload: "did:iota:4jMGRQWR5eehtCLFjwr2VtaSKV31Y9NKJzMU7vzrhKZ5"
    payload: '{"type":"askCredential","firstname":"MESTRE","lastname":"Shult","age":"23", "did":"did:iota:4jMGRQWR5eehtCLFjwr2VtaSKV31Y9NKJzMU7vzrhKZ5"}'
    //payload: "easter egg"
  });

}
userWriteToTheChannel();


