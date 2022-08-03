import { IdentityClient, CredentialTypes, UserType, IdentityJson } from '@iota/is-client';
import { defaultConfig } from './configuration';
import { readFileSync } from 'fs';
import { externalDriverCredential1 } from './externalData';
import { writeFileSync } from 'fs';

async function trustedAuthorities() {
  const identity = new IdentityClient(defaultConfig);

  // Recover the admin identity
  const adminIdentity = JSON.parse(readFileSync('./adminIdentity.json').toString()) as IdentityJson;
 
  // Recover the user identity
  const userIdentity = JSON.parse(readFileSync('./sylvainIdentityFrom0.json').toString()) as IdentityJson;

  // Authenticate as the admin identity
  await identity.authenticate(adminIdentity.doc.id, adminIdentity.key.secret);

  //Get root identity to issue an credential for the new driver
  const adminIdentityPublic = await identity.find(adminIdentity.doc.id);
  console.log(`Root identity's id: `, adminIdentityPublic.id);

  // Get root identity's credential to create new credentials
  // @ts-ignore: Object is possibly 'null'.
  const identityCredential = adminIdentityPublic!.verifiableCredentials[0];

  // List all trusted authorities, currently only one authority is trusted for issuing credentials
  const trustedAuthorities = await identity.getTrustedAuthorities();
  console.log('Trusted authorities: ', trustedAuthorities);

  // Assign a verifiable credential to the driver for drive allowance
  const driverCredential = await identity.createCredential(
    identityCredential,
    userIdentity?.doc?.id,
    CredentialTypes.BasicIdentityCredential,
    UserType.Person,
    {
      driveAllowance: true,
      issuanceDate: new Date()
    }
  );
  writeFileSync('driverlicenseSylvain.json', JSON.stringify(driverCredential, null, 2));
  console.log("Driver license: ");
  console.log(driverCredential);
  
}

trustedAuthorities();
