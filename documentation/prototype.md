# Prototype : Channel IOTA Identity 

## 0 - Authentification 

### 0.1 - Création de l'identité 1

**Première étape :** Création du fichier JSON contenant les données nécessaire à la création d'une identité.

```
nano integration-services/client/client-sdk/examples/0-MakeRootIdentityAdmin.ts
```

Modifier : 
- username
- dans writeFileSync modifer le nom du fichier

Exécuter
```
npm run example-0
```

Si tout c'est bien passé un fichier .json sera créer contenant toutes les données dont nous aura besoin par la suite (did et secretKey) pour créer l'identité.

**Deuxième étape :** Création de l'identité

```
nano integration-services/client/client-sdk/examples/1-CreateIdentityAndCredential.ts
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
nano is-node-authentication
```

Modifier : 
- Faire attention à l'url
- identityId : Mettre le did disponible dans le fichier JSON créer à l'étape 1
- secretKey : Mettre la secretKey disponible dans le fichier JSON créer à l'étape 1

```
npm run start
```

### 0.2 - Création de l'identité 2

Même chose que précédemment en renommant les variables différemment 

## I - Création du channel par l'identité 1

Pour la suite tout ce passe dans le répertoire : "integration-services/client/client-sdk/examples"
- Modifier l'authentification avec le did et la secret key de l'identité 1 dans le fichier I-ownerCreateChannel.
- Exécuter
```
npm run I-ownerCreateChannel
```

## II - L'identité 2 envoie une demande de souscription au channel
- Modifier l'authentification avec le did et la secret key de l'identité 2.
- Récupérer l'adresse du channel et modifié la dans le fichier II-userRequestChannel.ts .
- Exécuter
```
npm run II-userRequestChannel
```

## III - L'identité 1 accepte la demande
- Modifier l'authentification avec le did et la secret key de l'identité 1.
- Récupérer l'adresse du channel et modifié la dans le fichier III-ownerAuthorizedSubscription.ts .
- Exécuter
```
npm run III-ownerAuthorizedSubcription.ts .
```

## IV - L'identité 2 écrit sur le channel 
- Modifier l'authentification avec le did et la secret key de l'identité 2.
- Récupérer l'adresse du channel et modifié la dans le fichier IV-userWriteToTheChannel.ts .
- Exécuter
```
npm run IV-userWriteToTheChannel
```

## IV.1 - L'identité 1 écrit sur le channel
- Modifier l'authentification avec le did et la secret key de l'identité 1.
- Récupérer l'adresse du channel et modifié la dans le fichier IV.1-userWriteToTheChannel.ts .
- Exécuter
```
npm run IV.1-userWriteToTheChannel
```

## V - L'identité 1 lit les messages présent sur le channel
- Modifier l'authentification avec le did et la secret key de l'identité 1.
- Récupérer l'adresse du channel et modifié la dans le fichier V-ownerReadFromTheChannel.ts .
- Exécuter
```
npm run V-ownerReadFromTheChannel
```

## V.1 - L'identité 2 lit les messages présent sur le channel
- Modifier l'authentification avec le did et la secret key de l'identité 2.
- Récupérer l'adresse du channel et modifié la dans le fichier V.1-ownerReadFromTheChannel.ts .
- Exécuter
```
npm run V.1-ownerReadFromTheChannel
```

## CI - Create and Issue credential
- Exécuter
```
npm run CI-createAndIssueCredential
```

## CII - Check credential
- Exécuter
```
npm run CII-checkCredential
```
Problème : 
- [ ] En soit la vérification fonctionne mais en recréant un credential pas en vérifiant réellement le credential fournis
- [ ] Changer la façon d'envoyer le credential