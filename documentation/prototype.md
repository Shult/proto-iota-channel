# Prototype : Channel IOTA Identity 

# 0 - Authentification 

## 0.1 - Création du propriétaire du channel 

**Première étape :** Création du fichier JSON contenant les données nécessaire à la création d'une identité.
```
cd integration-services/clients/client-sdk/examples/
```

```
nano 0-MakeRootIdentityAdmin.ts
```

Modifier : 
- username
- dans writeFileSync modifier le nom du fichier

Exécuter
```
npm run example-0
```

Si tout c'est bien passé un fichier .json sera créer contenant toutes les données dont nous aura besoin par la suite (did et secretKey) pour créer l'identité.

**Deuxième étape :** Création de l'identité

```
nano 1-CreateIdentityAndCredential.ts
```
Modifier :
- adminIdentity (Par le nom du fichier json précédemment créé)
- username
- Credentials

Exécuter
```
npm run example-1
```

**Troisième étape :** S'authentifier sur le réseau 
```
cd ../../../../is-node-authentication
```

```
nano authentication.js
```

Modifier : 
- Faire attention à l'URL
- identityId : Mettre le did disponible dans le fichier JSON créer à l'étape 1
- secretKey : Mettre la secretKey disponible dans le fichier JSON créer à l'étape 1

```
npm run start
```

## 0.2 - Création d'un utilisateur

Même chose que précédemment en renommant les variables différemment 

## I - Création du channel par "Le propriétaire" 

Pour la suite tout ce passe dans le répertoire : "integration-services/client/client-sdk/examples"
- Modifier l'authentification avec le did et la secret key de Le propriétaire  dans le fichier I-ownerCreateChannel.
- Exécuter
```
npm run I-ownerCreateChannel
```

## II - L'utilisateur envoie une demande de souscription au channel
- Modifier l'authentification avec le did et la secret key de "L'utilisateur".
- Récupérer l'adresse du channel et modifié la dans le fichier II-userRequestChannel.ts .
- Exécuter
```
npm run II-userRequestChannel
```

## III - Le propriétaire accepte la demande
- Modifier l'authentification avec le did et la secret key de "Le propriétaire".
- Récupérer l'adresse du channel et modifié la dans le fichier III-ownerAuthorizedSubscription.ts .
- Exécuter
```
npm run III-ownerAuthorizedSubcription.ts .
```

# IV - L'utilisateur écrit sur le channel 
Programme du **"Holder"**.
Exemple de payload utile :
- Un did:iota valide : payload: "did:iota:4jMGRQWR5eehtCLFjwr2VtaSKV31Y9NKJzMU7vzrhKZ5"
- Un json contenant des informations précise : payload: '{"type":"askCredential","firstname":"MESTRE","lastname":"Shult","age":"23", "did":"did:iota:4jMGRQWR5eWR5ea:4jMGRQWR5eehtCLFjwr2VtaSKV31Y9NKJzMU7vzrhKZ5"}'
- Un message quelconque pour discuter sur le channel.

**Modification :**

- Modifier l'authentification avec le did et la secret key de "L'utilisateur".
- Modifier le message à envoyer sur le channel en modifiant le contenu du payload. 
- Récupérer l'adresse du channel et modifié la dans le fichier IV-userWriteToTheChannel.ts .
- Exécuter
```
npm run IV-userWriteToTheChannel
```

### IV.1 - Le propriétaire  écrit sur le channel
- Modifier l'authentification avec le did et la secret key de "Le propriétaire" .
- Récupérer l'adresse du channel et modifié la dans le fichier IV.1-userWriteToTheChannel.ts .
- Exécuter
```
npm run IV.1-userWriteToTheChannel
```

# V - Le propriétaire lit le message de L'utilisateur
Programme du **"Issuer"**.
Le issuer (propriétaire du channel) vient lire le dernier message envoyé sur le channel et répond en fonction du message.
- 

- Modifier l'authentification avec le did et la secret key de "Le propriétaire".
- Récupérer l'adresse du channel et modifié la dans le fichier V-ownerReadFromTheChannel.ts .
- Exécuter
```
npm run V-ownerReadFromTheChannel
```

### V - Le propriétaire lit l'historique des messages envoyés sur le channel
- Modifier l'authentification avec le did et la secret key de "Le propriétaire".
- Récupérer l'adresse du channel et modifié la dans le fichier V-ownerReadFromTheChannel.ts .
- Exécuter
```
npm run V-ownerReadHistoryFromTheChannel
```

### V.1 - L'utilisateur lit le message de Le propriétaire
- Modifier l'authentification avec le did et la secret key de L'utilisateur.
- Récupérer l'adresse du channel et modifié la dans le fichier V.1-ownerReadFromTheChannel.ts .
- Exécuter
```
npm run V.1-userReadFromTheChannel
```

### V.1 - L'utilisateur lit l'historique des messages envoyés sur le channel
- Modifier l'authentification avec le did et la secret key de L'utilisateur.
- Récupérer l'adresse du channel et modifié la dans le fichier V.1-ownerReadFromTheChannel.ts .
- Exécuter
```
npm run V.1-userReadHistoryFromTheChannel
```

### CI - Create and Issue credential
- Exécuter
```
npm run CI-createAndIssueCredential
```

### CII - Check credential
- Exécuter
```
npm run CII-checkCredential
```

### CIII - TrueVerif
Inutile pour l'instant.
```
npm run CIII-TrueVerif
```

### MI - VerifExternal 
Version de test pour "le verifier"
```
npm run MI-VerifExternal
```

### MI - VerifIdCardExternal
Version de test pour "le verifier"
```
npm run Mi-VerifIdCardExternal
```

### MII - IssueDriverLicense
Version de test pour V-ownerReadFromTheChannel.ts
```
npm run MII-IssueDriverLicense
```

# MIV - Verifier
Programme du **"verifier"**.
Lorsque le verifier reçois le message ("checkMyCredential") sur le channel, il vérifie le certificat.
Lit le dernier message envoyé sur le channel toutes les 10 secondes. Si c'est le même que précédemment, ne l'affiche pas.
```
npm run MIV-Verifier
```
