# Prototype IOTA Channel

Communication between a owner (Issuer or Verifier) and a user (Holder) using did:iota. This protoype will be use further to issuing and validating credentials. At this moment it's only for communicate.

### Roadmap : 

- ###  1 - Communication
- [x] 0 - Authentification
    - [x] 0.1 - Création de l'identité 1
    - [x] 0.2 - Création de l'identité 2

- [x] I - Création du channel par l'identité 1

- [x] II - L'identité 2 envoie une demande de souscription au channel

- [x] III - L'identité 1 accepte la demande
    - [ ] III.1 - L'identié 1 refuse la demande

- [x] IV - L'identité 2 écrit sur le channel
    - [x] IV.1 - L'identité 1 écrit sur le channel

- [x] V - L'identité 1 lit le message de l'identité 2
    - [x] V.1 - L'identité 2 lit le message de l'identité 1

- ### 2 - Amélioration de la communication
- [ ] Créer un QRcode avec l'adresse du channel.
- [ ] Lorsque l'on scan le QRcode on envoie une demande de d'authorisation au channel. Celà récupère donc aussi notre did.
- [ ] Une fois le QRcode scanner et l'authorisation valider, ouvre automatiquement un chat pour l'utilisateur. 
- [ ] Lis automatiquement les messages lorsque l'on est sur le chat.

- ### 3 - Credentials
- [ ] Issue credential (create-credential)
- [ ] Verifie credential (check-credential)
- [ ] Revoke credential


### Prérequis

git, npm

### Installation

**integration-services**
```
git clone https://github.com/iotaledger/integration-services.git
```
[Suivre le wiki pour configurer le services](https://wiki.iota.org/integration-services/getting_started/installation/node_setup)

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
