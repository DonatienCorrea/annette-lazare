// ===== Données des tables — À REMPLACER PAR VOS VRAIES DONNÉES =====
// Chaque table porte le nom d'un village manjak (région de Cacheu,
// Guinée-Bissau / Sénégal). Adaptez librement les noms et les invités.
const tables = [
    {
        name: "Bassarel",
        guests: ["Anna Mendy", "Adji Aïdara Tall", "Paulette Ndiaye", "Farcé Ndiaye", "Kinta Ndiaye", "Carlitou Gomis", "Soeur Yvonne", "Mariam Ndiaye", "Adama Ndiaye", "Libre"],
    },
    {
        name: "Bissau",
        guests: ["Paulette Gomis (Iza)", "Martha Silva", "Ange Marie Silva", "Bella Basse", "Solinda Gomis (fille de Claude)", "Chantal", "Jeannette Mendy", "Étienne Mendy", "Thérèse Gomis (fille de Claude)", "Ethane (fils de Jacky)"],
    },
    {
        name: "Bula",
        guests: ["Enzo Correa", "Meuventar Gomis", "Joséphine Gomis (Jojo)", "Emma Gomis (fille de Virginie)", "Annita Mendy", "Gabriel Mendy", "Nolhan Correa", "Noela Gomis", "Maman Gomis (Soeur de Noela)", "Dieudonne Correa"],
    },
    {
        name: "Thiour",
        guests: ["Yolande Correa", "Père Pierre Guillaume Dupont", "Marie Benoit", "Rose Mado", "Sophie", "Frédéric", "Charlie Ndiaye", "Raymond", "Bertha Ndiaye (Correa)"],
    },
    {
        name: "Pèlund",
        guests: ["Pocounore Mendy", "Vinciane Leprince", "Marie-Madeleine Mendy (Mame Merry)", "Anna-Amarathieu Correa", "Patrick Mendy", "Marlène Mendy", "Tata Isabelle", "Honorette Correa", "Alya"],
    },
    {
        name: "Canchungo",
        guests: ["Donatien Correa", "Clémence Gonzalez", "Daouda Sy", "Céline Gomis", "Étienne Gomis", "Alexis Gomis", "Anthony Correa", "André Gomis (Los)", "Oufeque Mendy"],
    },
    {
        name: "Béniche",
        guests: ["Isabelle Gomis", "Virginie Gomis", "Arminda Preira", "Nenette Dupont", "Veronique Sarr (Mami)", "Amy Sarr", "Maria Mendes", "Henriette", "Fama"],
    },
    {
        name: "Catdije",
        guests: ["Claude Gomis", "Damina Gomis", "Laurent Gomis (Nina)", "Véronique Gomis", "Jacques Correa", "Jean Jacques", "Joe CFA", "Peuthio", "Laurent Mendy (Papeye)"],
    },
    {
        name: "Badiopi",
        guests: ["Jean Paul Mendy", "Dominique Gomis", "Issa Sidibe", "Issa Thioubou", "Mamadou Ndiaye", "Alima Ndiaye", "Pape Saint Severt", "Ousmane Sy", "Jean Baptiste"],
    },
    {
        name: "Lonpath",
        guests: ["Mama Titi Gomis", "Odile Planterose", "Madeleine Diatta", "Étienne Diatta", "Sophie Basse", "Francis Basse", "Georgina Mendy (Mimi)", "Soeur Line", "Jacqueline Correa"],
    },
    {
        name: "Île Bijagos",
        guests: ["Cécile Hono", "Céline Pinchon", "Ikram Bendelladji", "Joséphine Mendy", "Sylvestre Gomis", "Patrice (Sylvestre)", "Eveline Cisse", "Inès (décoratrice)", "Line Félicité"],
    },
    {
        name: "Oucougne",
        guests: ["Rosa Gomis", "Jacky", "Germaine (soeur de Idy)", "Feli Laz (soeur de Idy)", "Eveline Faubert", "Stéphane Faubert", "Sergrame Mendy", "Femme de Sergrame", "Nicole Gomis (Vanessa)"],
    },
    {
        name: "Bleukeus / Outhekor",
        guests: ["Gina Correa (Bleukeus)", "Gilbert Correa (Bleukeus)", "Grand Jean-Pierre", "Sophie Mendy", "Papis Mendy", "Sebastien (Seba) frère Idy", "Blaise Mendy", "Pascal Preira Laz", "Femme de Pascal Laz", "Copine de la femme de Pascal Laz"],
    },
    {
        name: "Catió",
        guests: ["Ferdinand Gomis", "Grand Henry", "Grand Richard", "Grand Pape (Mendy)", "Alain Mendy", "Ndassy Mendy", "Michèle (fille de Ines)", "Émilie Gomis (cousine de Laurent)", "Virginie Vernon"],
    },
    {
        name: "Bara Mahma",
        guests: ["Syntha Gomis (Belle Mère)", "Lifau Mendy", "Yety", "Benjamin Mendy", "Meya (Femme de Benjamin)", "Marie N Dama", "Semba Mendy",  "Mireille Gomis", "Libre"],
    },
    {
        name: "Babok",
        guests: ["Marie Madeleine Gomis", "Tatiana Mendy", "Odile Correa", "Sona Gomis", "Béatrice Mendy", "Charlotte (Kor)", "Miguel (Mari de Charlotte)", "Pascaline Mendy", "André Thiembe"],
    },
    {
        name: "Babanda",
        guests: ["Paul Mendy", "André Ndissan", "Idy", "Nessa femme Idy", "Nina Gomis", "Sœur de Nina", "Denise Gomis", "Soeur Francine", "Laurent Paul"],
    },
    {
        name: "Bolama",
        guests: ["Déo Preira", "Thibault Dupont", "Louis (Choriste)", "Suzanne (Choriste)", "Marie (Choriste)", "Michel (Choriste)", "Fatima (Choriste)", "Betina (Choriste)", "Marena (Choriste)"],
    },
];

// ===== Références DOM =====
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearSearch');
const tablesContainer = document.getElementById('tablesContainer');
const noResults = document.getElementById('noResults');

// ===== Écouteurs d'événements =====
searchInput.addEventListener('input', handleSearch);
clearButton.addEventListener('click', clearSearch);

// ===== Utilitaires =====

/**
 * Supprime les accents et met en minuscule pour une recherche tolérante.
 */
function normalize(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Échappe les caractères HTML pour éviter toute injection.
 */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Distance de Levenshtein entre deux chaînes (nombre minimal
 * d'insertions / suppressions / substitutions pour passer de a à b).
 */
function levenshtein(a, b) {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    let curr = new Array(b.length + 1);

    for (let i = 1; i <= a.length; i++) {
        curr[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            curr[j] = Math.min(
                prev[j] + 1,
                curr[j - 1] + 1,
                prev[j - 1] + cost
            );
        }
        [prev, curr] = [curr, prev];
    }

    return prev[b.length];
}

/**
 * Tolérance d'erreur autorisée selon la longueur du terme recherché.
 */
function fuzzyThreshold(term) {
    const len = term.length;
    if (len <= 3) return 1;
    if (len <= 6) return 2;
    return 3;
}

/**
 * Plus petite distance entre le terme et un invité : 0 si le terme est
 * contenu tel quel, sinon la meilleure correspondance approximative
 * (par mot ou par fenêtre glissante de longueur proche du terme).
 */
function bestDistance(normGuest, normTerm) {
    if (!normTerm) return Infinity;
    if (normGuest.includes(normTerm)) return 0;

    let best = Infinity;

    for (const word of normGuest.split(/\s+/)) {
        best = Math.min(best, levenshtein(word, normTerm));
        if (best === 0) return 0;
    }

    const len = normTerm.length;
    for (let win = Math.max(1, len - 1); win <= len + 1; win++) {
        for (let i = 0; i + win <= normGuest.length; i++) {
            best = Math.min(best, levenshtein(normGuest.slice(i, i + win), normTerm));
            if (best === 0) return 0;
        }
    }

    return best;
}

/**
 * Met en évidence le terme recherché dans un nom (insensible aux accents/casse).
 */
function highlight(name, term) {
    const safeName = escapeHtml(name);
    if (!term) return safeName;

    const normName = normalize(name);
    const normTerm = normalize(term);
    const index = normName.indexOf(normTerm);

    if (index === -1) return safeName;

    // On retrouve les positions dans la chaîne d'origine (1 caractère = 1 caractère après NFD pour nos cas usuels).
    const before = escapeHtml(name.slice(0, index));
    const match = escapeHtml(name.slice(index, index + term.length));
    const after = escapeHtml(name.slice(index + term.length));

    return `${before}<mark>${match}</mark>${after}`;
}

// ===== Recherche =====

function handleSearch() {
    const term = searchInput.value.trim();
    clearButton.hidden = term === '';
    render(term);
}

function clearSearch() {
    searchInput.value = '';
    clearButton.hidden = true;
    searchInput.focus();
    render('');
}

/**
 * Affiche les tables. Si un terme est saisi, seules les tables
 * contenant au moins un invité correspondant restent visibles,
 * et les noms correspondants sont mis en avant. En l'absence de
 * correspondance exacte, on propose les résultats les plus proches
 * (tolérance aux fautes de frappe).
 */
function render(term = '') {
    const normTerm = normalize(term);
    tablesContainer.innerHTML = '';

    if (term === '') {
        noResults.hidden = true;
        tables.forEach(table => {
            tablesContainer.appendChild(createTableCard(table, term, new Set(table.guests)));
        });
        return;
    }

    // 1) Correspondances exactes (le terme est contenu dans le nom).
    let matches = collectMatches(table => table.guests.filter(
        guest => normalize(guest).includes(normTerm)
    ));

    let approximate = false;

    // 2) Aucune correspondance exacte : on cherche les plus proches.
    if (matches.length === 0) {
        const threshold = fuzzyThreshold(normTerm);
        matches = collectMatches(table => {
            return table.guests.filter(
                guest => bestDistance(normalize(guest), normTerm) <= threshold
            );
        }, table => Math.min(
            ...table.guests.map(guest => bestDistance(normalize(guest), normTerm))
        ));
        approximate = matches.length > 0;
    }

    if (matches.length === 0) {
        noResults.hidden = false;
        return;
    }

    noResults.hidden = true;

    if (approximate) {
        const notice = document.createElement('p');
        notice.className = 'approx-notice';
        notice.textContent = 'Aucune correspondance exacte. Voici les résultats les plus proches :';
        tablesContainer.appendChild(notice);
    }

    matches.forEach(({ table, matchedGuests }) => {
        tablesContainer.appendChild(createTableCard(table, term, matchedGuests));
    });
}

/**
 * Parcourt les tables et renvoie celles ayant au moins un invité retenu
 * par la fonction de filtrage fournie, triées par pertinence (distance).
 */
function collectMatches(filterFn, scoreFn) {
    return tables
        .map(table => ({
            table,
            matchedGuests: new Set(filterFn(table)),
            score: scoreFn ? scoreFn(table) : 0,
        }))
        .filter(entry => entry.matchedGuests.size > 0)
        .sort((a, b) => a.score - b.score);
}

/**
 * Construit la carte d'une table avec sa liste d'invités.
 * `matchedGuests` est l'ensemble des invités à mettre en avant.
 */
function createTableCard(table, term, matchedGuests) {
    const card = document.createElement('article');
    card.className = 'table-card';

    const hasMatch = term !== '' && matchedGuests.size > 0 &&
        table.guests.some(guest => matchedGuests.has(guest));
    if (hasMatch) card.classList.add('is-match');

    const guestsHtml = table.guests
        .map(guest => {
            const isMatch = term !== '' && matchedGuests.has(guest);
            return `<li class="${isMatch ? 'guest-match' : ''}">${highlight(guest, term)}</li>`;
        })
        .join('');

    card.innerHTML = `
        <div class="table-card-header">
            <span class="table-label">Table</span>
            <span class="table-name">${escapeHtml(table.name)}</span>
        </div>
        <ul>${guestsHtml}</ul>
    `;

    return card;
}

// ===== Initialisation =====
document.addEventListener('DOMContentLoaded', () => render(''));
