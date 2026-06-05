# Site de mariage — Annette & Lazare

Un site élégant et responsive pour notre mariage, avec comme fonction principale un **plan de table interactif** : chaque invité peut rechercher son nom pour retrouver sa table.

## Fonctionnalités

✨ **Fonction principale : le plan de table**
- Toutes les tables sont affichées avec la liste de leurs invités
- En tapant un nom dans la recherche, **seules les tables contenant un résultat restent visibles**
- Les noms correspondants sont **mis en avant** (surlignés)
- Recherche insensible à la casse et aux accents

📅 **Autres sections**
- Informations pratiques (lieu, horaire, dress code)
- Programme de la journée
- Contact
- Style chic avec une police manuscrite lisible (Parisienne + Cormorant Garamond)

## Démarrage rapide

Ouvrez simplement `index.html` dans votre navigateur. Aucun outil ni serveur nécessaire.

## Personnalisation

### 1. Les tables et les invités (`script.js`)

Remplacez le tableau `tables` par vos vraies données :

```javascript
const tables = [
    {
        name: "Les Lilas",                 // nom ou numéro de la table
        guests: ["Marie Dupont", "Jean Martin"],
    },
    // ... autres tables
];
```

> Astuce : vous pouvez utiliser un numéro comme nom, par ex. `name: "1"`.

### 2. Les informations de l'événement (`index.html`)

- **Titre / date** : section `hero`
- **Lieu, horaire, dress code** : section `details`
- **Programme** : section `programme`
- **Contact** : e-mail et téléphone dans la section `contact`

### 3. Les couleurs et la police (`styles.css`)

Modifiez les variables dans `:root` :

```css
:root {
    --gold: #b08d57;     /* doré principal */
    --ink: #2b2724;      /* texte */
    --ivory: #f6f1e7;    /* fond */
    --font-script: 'Parisienne', cursive;        /* police manuscrite */
    --font-serif: 'Cormorant Garamond', serif;   /* police de lecture */
}
```

## Fonctionnement de la recherche

1. Tapez un nom (ou une partie d'un nom) dans le champ de recherche
2. Les tables sans correspondance disparaissent
3. Les invités correspondants sont surlignés en doré
4. Effacez la recherche (croix ✕) pour réafficher toutes les tables

## Structure des fichiers

```
annette-lazare/
├── index.html      # Structure du site
├── styles.css      # Style chic et responsive
├── script.js       # Plan de table + recherche
└── README.md       # Ce fichier
```

## Mise en ligne

Hébergement gratuit possible sur GitHub Pages, Netlify ou Vercel : il suffit d'envoyer les trois fichiers.
