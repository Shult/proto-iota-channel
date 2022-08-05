# Prototype IOTA Channel

Communication between a owner (Issuer or Verifier) and a user (Holder) using did:iota. This protoype will be use further to issuing and validating credentials. At this moment it's only for communicate.

### Roadmap : 

- ###  1 - Communication
- [x] 0 - Authentification
    - [x] 0.1 - Création du propriétaire du channel
    - [x] 0.2 - Création d'un utilisateur

- [x] I - Création du channel par "Le propriétaire"

- [x] II - L'utilisateur envoie une demande de souscription au channel

- [x] III - Le propriétaire accepte la demande
    - [ ] III.1 - Le propriétaire refuse la demande

- [x] IV - L'utilisateur écrit sur le channel
    - [x] IV.1 - Le propriétaire écrit sur le channel

- [x] V - Le propriétaire lit le message de L'utilisateur 
- [x] V - Le propriétaire lit l'historique des messages envoyés sur le channel
    - [x] V.1 - L'utilisateur lit le message de "Le propriétaire"
    - [x] V.1 - L'utilisateur lit l'historique des messages envoyés sur le channel

- ### 2 - Amélioration de la communication
- [ ] Créer un QRcode avec l'adresse du channel.
- [ ] Lorsque l'on scan le QRcode on envoie une demande de d'authorisation au channel. Celà récupère donc aussi notre did.
- [ ] Une fois le QRcode scanné et l'authorisation validée, ouvre automatiquement un chat pour l'utilisateur. 
- [ ] Lis automatiquement les messages lorsque l'on est sur le chat.

- ### 3 - Credentials
- [x] Issue credential (create-credential)
- [x] Verifie credential (check-credential)
- [ ] Revoke credential

- ### 4 - Amélioration credential
- [ ] Pouvoir écrire un message sans devoir entrer dans le fichier.
- [ ] Envoyer automatiquement une demande pour rejoindre le channel si on essaye de rejoindre un channel où l'on n'est pas encore autorisé.
- [ ] Lire et écrire des messages simultanément.
- [ ] Verifier : ne plus avoir à lire dans un fichier json mais directement lire le credential depuis un message sur le channel.


### Prérequis

git, npm

### Installation

**integration-services**
```
git clone https://github.com/iotaledger/integration-services.git
```
[Suivre le wiki pour configurer le service](https://wiki.iota.org/integration-services/getting_started/installation/node_setup)

**is-node-authentication**
```
git clone https://github.com/Schereo/is-node-authentication.git
cd is-node-authentication
npm install
```

**proto-iota-channel**
```
cd integration-services/clients/client-sdk/examples
git clone https://github.com/Shult/proto-iota-channel.git
cd proto-iota-channel
mv * ..
```
