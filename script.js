// ===== Données des tables — À REMPLACER PAR VOS VRAIES DONNÉES =====
// Chaque table porte le nom d'un village manjak (région de Cacheu,
// Guinée-Bissau / Sénégal). Adaptez librement les noms et les invités.
const tables = [
    {
        name: "Bassarel",
        guests: ["Anna Mendy", "Adji Aïdara Tall", "Tata Paulette", "Tonton Facer", "Tata Kinta", "Carlitou Gomis", "Soeur Yvonne", "Mariam Pélund", "Tata Adama", "Libre"],
    },
    {
        name: "Bissau",
        guests: ["Paulette Iza", "Martha", "Ange Marie", "Bella", "Solinda Claude", "Chantal", "Jeannette", "Étienne", "Fille de Claude", "Ethane Jacky"],
    },
    {
        name: "Bula",
        guests: ["Enzo Correa", "Meuventar", "Jojo", "Emma Virginie", "Annita", "Gabriel", "Nolhan Correa", "Noela", "Maman (Soeur de Noela)", "Dieudonne Correa"],
    },
    {
        name: "Thiour",
        guests: ["Tata Yolande", "Pierre Guillaume", "Marie Benoit", "Rose Mado", "Sophie", "Charlie", "Raymond", "Frédéric", "Bertha"],
    },
    {
        name: "Pèlund",
        guests: ["Pocounore Mendy", "Vinciane Leprince", "Marie-Madeleine Mendy (Mame Merry)", "Anna-Amarathieu Correa", "Patrick Mendy", "Marlène Mendy", "Tata Isabelle", "Honorrette Correa", "Alya"],
    },
    {
        name: "Canchungo",
        guests: ["Donatien Correa", "Clémence Gonzalez", "Daouda Sy", "Céline Gomis", "Étienne Gomis", "Alexis Gomis", "Anthony Correa", "André Los", "Oufeque Mendy"],
    },
    {
        name: "Béniche",
        guests: ["Isabelle", "Virginie", "Arminda", "Nenette", "Mami Sarr", "Amy Sarr", "Maria Mendes", "Henriette", "Fama"],
    },
    {
        name: "Catdije",
        guests: ["Claude", "Damina", "Laurent Nina", "Véronique Gomis", "Jacques", "Jean Jacques", "Joe CFA", "Peuthio", "Papeye"],
    },
    {
        name: "Badiopi",
        guests: ["Jean Paul", "Dominique", "Issa Sidibe", "Issa Thioubou", "Mamadou Ndiaye", "Alima Ndiaye", "Pape Saint Severt", "Ousmane Sy", "Jean Baptiste"],
    },
    {
        name: "Lonpath",
        guests: ["Mama Titi Gomis", "Odile Planterose", "Madeleine Diatta", "Étienne Diatta", "Sophie Basse", "Francis Basse", "Georgina Mendy (Mimi)", "Soeur Line", "Jacqueline Correa"],
    },
    {
        name: "Île Bijagos",
        guests: ["Cécile Hono", "Céline Pinchon", "Ikram Bendelladji", "Joséphine Mendy", "Sylvestre Gomis", "Patrice (Sylvestre)", "Eveline Cisse", "Inès", "Line Félicité"],
    },
    {
        name: "Oucougne",
        guests: ["Rosa", "Jacky", "Germaine Idy", "Feli Laz", "Eveline Faubert", "Stéphane Faubert", "Sergrame", "Femme de Sergrame", "Nicole Vanessa"],
    },
    {
        name: "Bleukeus / Outhekor",
        guests: ["Gina Bleukeus", "Gilbert Bleukeus", "Grand Jean-Pierre", "Sophie", "Papis", "Seba frère Idy", "Blaise Mendy", "Pascal Laz", "Femme de Pascal Laz", "Copine de la femme de Pascal Laz"],
    },
    {
        name: "Catió",
        guests: ["Ferdinand Gomis", "Grand Henry", "Grand Richard", "Grand Pape", "Alain", "Ndassy", "Michèle Ines", "Émile Los", "Virginie Vernon"],
    },
    {
        name: "Bara Mahma",
        guests: ["Belle Mère", "Lifau", "Femme de tonton Benjamin", "Yety belle famille", "Tonton Benjamin", "Marie Dama", "Semba", "Tata Mirielle", "Libre"],
    },
    {
        name: "Babok",
        guests: ["Marie Madeleine", "Tatiana", "Odile", "Sona", "Béatrice", "Charlotte", "Miguel Charlotte", "Pascaline", "Libre"],
    },
    {
        name: "Babanda",
        guests: ["Paul", "André", "Idy", "Nessa femme Idy", "Nina", "Sœur de Nina", "Denis William", "Soeur Francine", "Laurent Paul"],
    },
    {
        name: "Bolama",
        guests: ["Déo", "Thibault", "Louis", "Suzanne", "Marie", "Michel", "Fatima", "Betina", "Marena"],
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
