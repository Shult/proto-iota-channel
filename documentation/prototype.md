# Prototype : Channel IOTA Identity 

# I - Authentification 

### I.1 - Création de l'identité 1

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

### I.2 - Création de l'identité 2

Même chose que précédemment en renommant les variables différemment 







# II - Création du channel par l'identité 1

Programme écrit de mes propres mains donc pas possible de l'avoir directement pour le moment étant donné que je n'ai pas accès à GIT.

Exécuter
```
npm run I-ownerCreateChannel
```

