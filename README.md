# HRnet Project

**Dernière mise à jour :** 14 août 2024  

![HTML](https://img.shields.io/badge/-HTML-E34F26?style=flat&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/-CSS-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white)
![npm](https://img.shields.io/badge/-npm-CB3837?style=flat&logo=npm&logoColor=white) ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/-Typescript-3178C6?style=flat&logo=typescript&logoColor=white)  ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white) ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?style=flat&logo=prettier&logoColor=black) ![Zustand](https://img.shields.io/badge/-Zustand-666?style=flat&logo=zustand&logoColor=white)

Ce projet fait partie de la formation **OpenClassrooms** intitulée "**Développeur d'application - JavaScript React**". Il s'agit du projet intitulé "**Faites passer une librairie jQuery vers React**".

## Objectif du projet

Le but de ce projet est de migrer une application existante basée sur **jQuery** vers **React**. Les plugins jQuery ont été remplacés par des composants React afin de moderniser le codebase et d'améliorer les performances et la maintenabilité.

## Composants migrés

* **Dropdown** : Un composant de sélection pour les formulaires.
* **DatePicker** : Un sélecteur de date interactif.
* **DataTable** : Un tableau de données avec pagination, tri et recherche.
* **Modal** : Une fenêtre modale personnalisable, publiée sous forme de package sur **npm**. Ce composant est disponible ici : [bd-react-simple-modal](https://www.npmjs.com/package/bd-react-simple-modal).

## Technologies Utilisées

* **React** : Framework JavaScript pour construire des interfaces utilisateur.
* **TypeScript** : Superset de JavaScript qui ajoute un typage statique.
* **SCSS (Sass)** : Préprocesseur CSS utilisé pour écrire des styles plus maintenables.
* **Vite.js** : Outil de bundling rapide et léger pour les projets modernes en JavaScript/TypeScript.
* **Zustand** : Bibliothèque légère pour la gestion de l'état global.
* **Prettier** : Outil de formatage automatique du code pour maintenir un style cohérent.
* **ESLint** : Outil d'analyse de code pour identifier et corriger les problèmes de code.

## Utilisation de Mockaroo

Pour le développement, un mock a été généré à l'aide de [Mockaroo](https://www.mockaroo.com/) pour simuler un ensemble de 100 employés. Cela permet de tester les fonctionnalités de l'application avec un grand volume de données.

Le mock est utilisé dans l'environnement de développement grâce à la gestion des fichiers **.env**. Le fichier **.env.development** active l'utilisation du mock, tandis que le fichier **.env.production** désactive cette fonctionnalité pour l'environnement de production.

## Installation et lancement du projet

### Prérequis


* **Node.js** (version 14 ou supérieure)
* **npm**


### Installation

1. Clonez le repository :

```
git clone https://github.com/bdelanls/hrnet-project.git
```

2. Installez les dépendances :

```
npm install
```

### Lancer l'application

Pour lancer l'application en mode développement :

```
npm run dev
```

Une fois l'application lancée, vous pouvez la visualiser dans votre navigateur à l'adresse suivante :
```
http://localhost:3000
```

Pour construire l'application pour la production :

```
npm run build
```

## Dépendances principales

* **react** : Bibliothèque de base pour la création de composants React.
* **react-dom** : Utilisé pour rendre les composants React dans le DOM.
* **zustand** : Pour la gestion de l'état global de l'application.
* **@types/react** : Définitions TypeScript pour React.
* **sass** : Préprocesseur CSS utilisé pour les styles en SCSS.
* **vite** : Outil de build et serveur de développement.
* **typescript** : Langage de programmation utilisé dans le projet pour un typage strict.
* **eslint** : Utilisé pour l'analyse statique du code et l'application des règles de codage.

## Voir l'application en ligne

L'application est disponible en ligne à l'adresse suivante : [https://p14.oc.bdelanls.fr/](https://p14.oc.bdelanls.fr/)