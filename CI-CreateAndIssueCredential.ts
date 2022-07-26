import { IdentityClient, CredentialTypes, UserType, IdentityJson } from '@iota/is-client';
import { defaultConfig } from './configuration';
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';

async function createAndIssueCredentials() {
  const identity = new IdentityClient(defaultConfig);

  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;
  
  // Recover the user identity
  const userIdentity = JSON.parse(readFileSync('./sylvainIdentityFrom0.json').toString()) as IdentityJson;

  // Authenticate as the admin identity
  await identity.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);

  // Get admin identity data
  const adminIdentityPublic = await identity.find(adminIdentity.doc.id);

  // Get admin identy's VC
  const identityCredential = adminIdentityPublic?.verifiableCredentials?.[0];

  console.log('Identity Credential of Admin', identityCredential);


  console.log('~~~~~~~~~~~~~~~~');
  console.log('User identity: ', userIdentity);
  console.log('~~~~~~~~~~~~~~~~');
  // Assign a verifiable credential to the user as rootIdentity.
  // With the BasicIdentityCredential the user is not allowed to issue further credentials
  const userCredential = await identity.createCredential(
    identityCredential,
    userIdentity?.doc?.id,
    CredentialTypes.BasicIdentityCredential,
    UserType.Person,
    {
      diplome: "Diplôme d'ingénieur",
      annee: "2024"
    }
  );

  console.log('Created credential: ', userCredential);
  console.log('~~~~~~~~~~~~~~~~');
  writeFileSync('sylvainCredential.json', JSON.stringify(userCredential, null, 2));

  // Verify the credential issued
  const verified = await identity.checkCredential(userCredential);

  console.log('Verification result: ', verified);
}


createAndIssueCredentials();
