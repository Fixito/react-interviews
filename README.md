# Entretien REACT

Le style importe peu.
Vous pouvez tout faire dans le composant App.

## Installer le linter de create-react-app

```
npm i -D eslint-config-react-app
```

Créer un fichier `.eslintrc.json` à la racine du projet avec le contenu suivant :

```JSON
{
  "extends": "react-app"
}
```

## Niveau Débutant

### Compteur

Créer un compteur commençant à 0 ainsi qu'un bouton permettant de l'incrémenter de 1.

### API

```JS
const url = 'https://randomuser.me/api?page=1';
```

1. Récupérer les données et les afficher dans une balise `<pre>`

```js
JSON.stringify(user, null, 2);
```

2. Afficher le nom et l'image de la personne
3. Créer un bouton pour charger plus personnes (une page = 1 personne)

## Niveau Intermédiaire

```JS
const url = 'https://randomuser.me/api/?results=20';
```

1. Récupérer les données.
2. Afficher les données situées dans la propriété `location` sous forme d'un tableau

```HTML
<table>
  <thead>
    <th></th>
  </thead>
  <tbody>
    <tr>
      <td></td>
    </tr>
  </tbody>
</table>
```

3. Réaliser une fonction qui permet de trier le tableau dans l'ordre croissant et décroissant selon l'en-tête sur lequel on clique

[Array.prototype.sort()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

```JS
function compare(a, b) {
  if (a est inférieur à b selon les critères de tri)
     return -1;
  if (a est supérieur à b selon les critères de tri)
     return 1;
  // a doit être égal à b
  return 0;
}
```

4. Ajouter un `input` de recherche qui affiche toutes les lignes qui incluent sa valeur peu importe la colonne
