// ===== Données des tables — À REMPLACER PAR VOS VRAIES DONNÉES =====
// Chaque table porte le nom d'un village manjak (région de Cacheu,
// Guinée-Bissau / Sénégal). Adaptez librement les noms et les invités.
const tables = [
    {
        name: "Canchungo",
        guests: ["Marie Dupont", "Jean Martin", "Annick Fournier", "Camille Petit"],
    },
    {
        name: "Babanda",
        guests: ["Sophie Laurent", "Pierre Blanc", "David Fontaine", "Hélène Roux"],
    },
    {
        name: "Bleukeus",
        guests: ["Isabelle Leclerc", "Marc Dubois", "Françoise Collet", "Antoine Garnier"],
    },
    {
        name: "Pelundo",
        guests: ["Claire Rousseau", "Louis Mercier", "Serge Germain", "Émilie Faure"],
    },
    {
        name: "Cacheu",
        guests: ["Nathalie Bernard", "André Lefevre", "Julie Lambert", "Thomas Noël"],
    },
    {
        name: "Bula",
        guests: ["Sylvie Simon", "Paul Moreau", "Caroline Vincent", "Hugo Marchand"],
    },
    {
        name: "Pikine",
        guests: ["Valérie Girard", "Michel Henry", "Laure Robin", "Nicolas Perrin"],
    },
    {
        name: "Guediawaye",
        guests: ["Brigitte Michel", "Eric Renard", "Sandrine Gauthier", "Olivier Roy"],
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
 * et les noms correspondants sont mis en avant.
 */
function render(term = '') {
    const normTerm = normalize(term);
    tablesContainer.innerHTML = '';

    const tablesToShow = term === ''
        ? tables
        : tables.filter(table =>
            table.guests.some(guest => normalize(guest).includes(normTerm))
        );

    if (tablesToShow.length === 0) {
        noResults.hidden = false;
        return;
    }

    noResults.hidden = true;

    tablesToShow.forEach(table => {
        tablesContainer.appendChild(createTableCard(table, term, normTerm));
    });
}

/**
 * Construit la carte d'une table avec sa liste d'invités.
 */
function createTableCard(table, term, normTerm) {
    const card = document.createElement('article');
    card.className = 'table-card';

    const hasMatch = term !== '' &&
        table.guests.some(guest => normalize(guest).includes(normTerm));
    if (hasMatch) card.classList.add('is-match');

    const guestsHtml = table.guests
        .map(guest => {
            const isMatch = term !== '' && normalize(guest).includes(normTerm);
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
