// ============================================================================
// Main — Graph-first navigation, note panel, minimap
// ============================================================================

let graph;
let noteOpen = false;

function openNote(noteId) {
    if (!NOTES[noteId]) return;

    const note = NOTES[noteId];
    const panel = document.getElementById('notePanel');
    const body = document.getElementById('noteBody');
    const titleBar = document.getElementById('noteTitleBar');
    const minimap = document.getElementById('minimap');
    const hint = document.getElementById('headerHint');

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

    body.innerHTML = `<div class="note">${note.content}${backlinkHtml}</div>`;
    body.scrollTop = 0;
    titleBar.textContent = note.title;

    panel.classList.add('open');
    minimap.classList.add('visible');
    hint.classList.add('hidden');
    noteOpen = true;

    // Update graph selection
    if (graph) {
        graph.selectedNode = graph.nodes.find(n => n.id === noteId) || null;
        graph.drawMinimap(document.getElementById('minimapCanvas'));
    }
}

function closeNote() {
    const panel = document.getElementById('notePanel');
    const minimap = document.getElementById('minimap');
    const hint = document.getElementById('headerHint');

    panel.classList.remove('open');
    minimap.classList.remove('visible');
    hint.classList.remove('hidden');
    noteOpen = false;

    if (graph) graph.selectedNode = null;
}

// Escape key closes note
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && noteOpen) closeNote();
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    graph = new Graph(document.getElementById('graph'));
});
