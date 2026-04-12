# LoL DPM 

LoL DPM est notre application Angular de statistiques League of Legends inspirée de OP.GG.
Elle permet de rechercher un joueur par son Riot ID et de consulter ses statistiques détaillées.

## Fonctionnalités

- Recherche d'un joueur par Game Name et Tag Line (Le Game Name doit avoir 3 caractères minimum)
- Affichage du profil : niveau, icône, rangs Solo/Duo et Flex
- Top 5 des champions les plus maîtrisés
- Historique des 10 dernières parties avec KDA, CS et durée
- Détail complet d'une partie avec les 10 joueurs
- Liste complète des champions avec recherche en temps réel

### Clé API Riot
- La clé API a une durée de vie de 24h, je vous prie donc de m'envoyer un mail ou un message teams pour que je puisse vous en générer une nouvelle. Il vous faudra juste la mettre à la place de l'ancienne ligne 17 dans `src/app/services/riot-api.ts`.

## Lancement

La commande utilisée pour lancer notre projet : 
ng serve --proxy-config=proxy.conf.json

## Utilisation

1. Entrez un Game Name et un Tag Line (Il faut que cela soit des comptes existantants voici une liste de comptes pour faire vos test :
StaulkMB Tag:EUW
Loupio Tag:7219
brw Tag:999
ShogunKC Tag:EUW
 VicYTive Tag:4851
 Pèdrito Tag:EUW
 Si vous en avez besoin deplus vous pouvez en trouvez sur https://op.gg/fr mais recherchez bien dans le serveur EUW)
2. Cliquez sur Rechercher
3. Consultez le profil, les rangs et les champions maîtrisés
4. Cliquez sur "Voir l'historique des parties" 
5. Cliquez sur une partie pour voir le détail complet de cette partie
6. Consultez la liste des champions via le menu Champions

## Équipe

- DEFOSSEZ Erwan
- PAHIMA Brice Armel
- NIYOBUZIMA Daniel Béni

