# vehicle-cli
Sur ce dépôt se trouve un client en ligne de commande permettant d'interagir avec un serveur HTTP qui gère le stockage de véhicules (le *vehicle-server*).

ATTENTION: ce dépôt ne gère pas l'implémenation du *vehicle-server*, ou de la base de données derrière ce serveur HTTP, mais seulement l'outil cli permettant d'interroger ce serveur HTTP.

## Mise en place du cli

Pour mettre en place le cli sur votre machine, après avoir copié ce repository et en vous situant dans le dossier parent du projet (vehicle-cli), passez la commande suivante sur le terminal pour créer une image docker locale de l'application:
```bash
    docker build -t vehicle-cli .
```
Et ensuite, pour pouvoir utiliser cette application sur n'importe lequel de votre terminal:
```bash
alias vehicle-cli='docker run --rm --network host vehicle-cli'
```

## Utilisation du cli

Le point d'entrée de l'application est 
```bash
vehicle-cli
```

Pour afficher l'aide: 
```bash
vehicle-cli --help
```

Ce cli dispose de 3 commandes: 
```create-vehicle```, ```list-vehicles```et  ```delete-vehicle```.
Avant chaque commande, vous pouvez spécifier sur quel serveur vous voulez effectuer la requête comme suit: 
```bash
    vehicle-cli --address=<url> [cmd]
```
Par défaut, la valeur de l'option ```--address``` est ```localhost:8080```.

Pour afficher l'aide sur une commande spécifique, vous pouvez effectuer:
```bash
    vehicle-cli [cmd] --help
```

### 1. ```create-vehicle```

```bash
    vehicle-cli --address=<url> create-vehicle --shortcode=<shortcode> --battery=<level> --longitude=<long> --latitude=<lat>
```

Permet d'insérer un véhicule avec les caractéristiques données dans le serveur.

Avec les options (obligatoires):

```--shortcode```: le *shortcode* du véhicule (doit être composé de strictement 4 caractères)
```--battery```: le niveau de la batterie du véhicule (entier de 0 à 100)
```--longitude```: la longitude du véhicule (entier de -90 à 90)
```--latitude```: la latitude du véhicule (entier de -90 à 90)

Ces options sont toutes obligatoires et l'oubli d'une d'entre fera que la commande ne peut pas se lancer.
Si les caractéristiques d'une des options ne sont pas respectées (par exemple, shortcode plus grand que 4 caractères), alors la commande renverra l'erreur renvoyée par le serveur (en reprenant le même exemple: ```Shortcode must be only 4 characters long```).

### 2. ```list-vehicles```

```bash 
vehicle-cli --address=<url> list-vehicles 
```

Permet de lister l'ensemble des véhicules présents sur le serveur.

### 3. ```delete-vehicle```

```bash
vehicle-cli --address=<url> delete-vehicle --shortcode=shortcode>
```

Permet de supprimer un véhicule dans la base de données en passant son shortcode.

Avec l'option (obligatoire): 
```--shortcode```: le *shortcode* du véhicule à supprimer (doit être composé de strictement 4 caractères)