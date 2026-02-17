// ============================================================================
// Main — Note navigation, tabs, sidebar, search
// ============================================================================

let currentNote = 'welcome';
let openTabs = ['welcome'];

function openNote(noteId) {
    if (!NOTES[noteId]) return;

    currentNote = noteId;

    // Update sidebar active state
    document.querySelectorAll('.file').forEach(f => f.classList.remove('active'));
    const fileEl = document.querySelector(`.file[data-note="${noteId}"]`);
    if (fileEl) fileEl.classList.add('active');

    // Add to tabs if not already open
    if (!openTabs.includes(noteId)) {
        openTabs.push(noteId);
    }
    renderTabs();

    // Render note content
    renderNote(noteId);

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

function renderNote(noteId) {
    const note = NOTES[noteId];
    const view = document.getElementById('noteView');

    // Build backlinks
    const backlinks = [];
    Object.keys(NOTES).forEach(id => {
        if (id !== noteId && NOTES[id].links.includes(noteId)) {
            backlinks.push({ id, title: NOTES[id].title });
        }
    });

    let backlinkHtml = '';
    if (backlinks.length > 0) {
        backlinkHtml = `
            <div class="backlinks">
                <div class="backlinks-title">Linked mentions (${backlinks.length})</div>
                ${backlinks.map(bl =>
                    `<span class="backlink-item" onclick="openNote('${bl.id}')">${bl.title}</span>`
                ).join('')}
            </div>
        `;
    }

    view.innerHTML = `<div class="note">${note.content}${backlinkHtml}</div>`;
    view.scrollTop = 0;
}

function renderTabs() {
    const tabBar = document.getElementById('tabBar');
    tabBar.innerHTML = openTabs.map(noteId => {
        const note = NOTES[noteId];
        const isActive = noteId === currentNote;
        return `
            <div class="tab ${isActive ? 'active' : ''}" data-note="${noteId}" onclick="openNote('${noteId}')">
                <span>${note.title}</span>
                ${openTabs.length > 1 ? `<button class="tab-close" onclick="closeTab(event, '${noteId}')">x</button>` : ''}
            </div>
        `;
    }).join('');
}

function closeTab(event, noteId) {
    event.stopPropagation();
    const idx = openTabs.indexOf(noteId);
    if (idx === -1 || openTabs.length <= 1) return;

    openTabs.splice(idx, 1);

    if (currentNote === noteId) {
        const newIdx = Math.min(idx, openTabs.length - 1);
        openNote(openTabs[newIdx]);
    } else {
        renderTabs();
    }
}

function toggleFolder(headerEl) {
    const folder = headerEl.parentElement;
    folder.classList.toggle('open');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function toggleGraph() {
    const panel = document.getElementById('graphPanel');
    const isOpen = panel.classList.toggle('open');

    if (isOpen && !graphInstance) {
        graphInstance = new GraphView(document.getElementById('graphCanvas'));
    } else if (isOpen && graphInstance) {
        graphInstance.resize();
        graphInstance.buildGraph();
    }
}

// Search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const files = document.querySelectorAll('.file');

        files.forEach(file => {
            const name = file.querySelector('span').textContent.toLowerCase();
            const noteId = file.dataset.note;
            const note = NOTES[noteId];
            const tags = note ? note.tags.join(' ').toLowerCase() : '';

            if (!query || name.includes(query) || tags.includes(query)) {
                file.style.display = '';
            } else {
                file.style.display = 'none';
            }
        });
    });

    // Keyboard shortcut: Ctrl+P to focus search
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            searchInput.blur();
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    });

    // Load initial note
    openNote('welcome');
});
