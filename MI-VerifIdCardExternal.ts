import { IdentityClient, CredentialTypes, UserType, IdentityJson } from '@iota/is-client';
import { defaultConfig } from './configuration';
import { readFileSync } from 'fs';
import { externalDriverCredential1 } from './externalData';

async function trustedAuthorities() {
  const identity = new IdentityClient(defaultConfig);

  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;

  // Recover the user credential
  //const driverCredential = JSON.parse(readFileSync('./driverlicense.json').toString()) as Credential;
  const driverCredential = JSON.parse(readFileSync('./idCardSylvain.json').toString()) as Credential;

  // Authenticate as the admin identity
  await identity.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);



  // Verify the drivers license issued by an external authority.
  // This drivers license will not be trusted because it was not added as an trusted authority by us.
  const verified2 = await identity.checkCredential(externalDriverCredential1);
  console.log('Driving authority verification: ', verified2);

  // Added the external authority to the trusted authorities.
  // The id of the external authority can be found in the external credential
  const externalTrustedAuthority = externalDriverCredential1.issuer;
  await identity.addTrustedAuthority(externalTrustedAuthority);

  // List all trustedAuthorities, to verify the external authority has been added
  const trustedAuthorities2 = await identity.getTrustedAuthorities();
  console.log('Trusted authorities: ', trustedAuthorities2);

  // Verify the drivers license issued by an external authority.
  // This time the verification result should be positive
  const verified5 = await identity.checkCredential(externalDriverCredential1);
  console.log('Id Card  authority verification: ', verified5);

  // Remove the external authority again, just for repeatability
  await identity.removeTrustedAuthority(externalTrustedAuthority);
}

trustedAuthorities();
