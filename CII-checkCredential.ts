import { IdentityClient, CredentialTypes, UserType, IdentityJson } from '@iota/is-client';
import { defaultConfig } from './configuration';
import { readFileSync } from 'fs';

async function checkCredential() {
  const identity = new IdentityClient(defaultConfig);

  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;
  
  // Recover the user identity
  const sylvainIdentity = JSON.parse(readFileSync('./sylvainIdentityFrom0.json').toString()) as IdentityJson; 
  
  // Recover the user credential
  const sylvainCredential = JSON.parse(readFileSync('./sylvainCredential.json').toString()) as Credential;

  // Authenticate as the admin identity
  await identity.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);

  // Get admin identity data
  const adminIdentityPublic = await identity.find(adminIdentity.doc.id);

  // Get admin identy's VC
  const identityCredential = adminIdentityPublic?.verifiableCredentials?.[0];

  console.log('Identity Credential of Admin', identityCredential);
  
  const userCredential = await identity.createCredential(
    identityCredential,
    sylvainCredential?.id,
    CredentialTypes.BasicIdentityCredential,
    UserType.Person,
    {
	profession: 'Professor'
    }
  );

  // Verify the credential issued
  const verified = await identity.checkCredential(userCredential);
  
  console.log(userCredential);

  console.log('Verification result: ', verified);

}

checkCredential();
