// ============================================================================
// Graph Engine — Premium force-directed graph with physics simulation
// ============================================================================

class Graph {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dpr = window.devicePixelRatio || 1;
        this.nodes = [];
        this.edges = [];
        this.hoveredNode = null;
        this.selectedNode = null;
        this.dragNode = null;
        this.dragOffset = { x: 0, y: 0 };
        this.mouse = { x: -999, y: -999 };
        this.camera = { x: 0, y: 0, zoom: 1 };
        this.targetCamera = { x: 0, y: 0, zoom: 1 };
        this.particles = [];
        this.time = 0;
        this.settled = false;

        this.nodeColors = {
            'hub':      { fill: '#cba6f7', glow: 'rgba(203,166,247,0.2)' },
            'project':  { fill: '#89b4fa', glow: 'rgba(137,180,250,0.2)' },
            'skill':    { fill: '#a6e3a1', glow: 'rgba(166,227,161,0.2)' },
            'life':     { fill: '#fab387', glow: 'rgba(250,179,135,0.2)' },
            'creative': { fill: '#f5c2e7', glow: 'rgba(245,194,231,0.2)' },
            'contact':  { fill: '#94e2d5', glow: 'rgba(148,226,213,0.2)' },
        };

        this.resize();
        this.build();
        this.bindEvents();
        this.loop();
    }

    resize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.canvas.width = w * this.dpr;
        this.canvas.height = h * this.dpr;
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.ctx.scale(this.dpr, this.dpr);
        this.w = w;
        this.h = h;
    }

    build() {
        this.nodes = [];
        this.edges = [];
        const ids = Object.keys(NOTES);
        const map = {};

        ids.forEach((id, i) => {
            const note = NOTES[id];
            const angle = (i / ids.length) * Math.PI * 2;
            const spread = Math.min(this.w, this.h) * 0.28;
            const node = {
                id,
                label: note.title,
                type: note.type || 'hub',
                x: this.w / 2 + Math.cos(angle) * spread + (Math.random() - 0.5) * 80,
                y: this.h / 2 + Math.sin(angle) * spread + (Math.random() - 0.5) * 80,
                vx: 0, vy: 0,
                size: note.size || (note.links.length > 4 ? 18 : note.links.length > 2 ? 13 : 9),
                connections: note.links.length,
            };
            this.nodes.push(node);
            map[id] = node;
        });

        ids.forEach(id => {
            NOTES[id].links.forEach(target => {
                if (map[target] && !this.edges.find(e =>
                    (e.a === id && e.b === target) || (e.a === target && e.b === id)
                )) {
                    this.edges.push({ a: id, b: target });
                }
            });
        });
    }

    // --- Physics ---
    physics() {
        const nodes = this.nodes;
        const map = {};
        nodes.forEach(n => map[n.id] = n);

        // Repulsion
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                let dx = b.x - a.x, dy = b.y - a.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const force = 2500 / (dist * dist);
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;
                if (a !== this.dragNode) { a.vx -= fx; a.vy -= fy; }
                if (b !== this.dragNode) { b.vx += fx; b.vy += fy; }
            }
        }

        // Edge attraction
        this.edges.forEach(edge => {
            const a = map[edge.a], b = map[edge.b];
            if (!a || !b) return;
            let dx = b.x - a.x, dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const ideal = 160;
            const force = (dist - ideal) * 0.004;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            if (a !== this.dragNode) { a.vx += fx; a.vy += fy; }
            if (b !== this.dragNode) { b.vx -= fx; b.vy -= fy; }
        });

        // Center gravity
        nodes.forEach(n => {
            if (n === this.dragNode) return;
            n.vx += (this.w / 2 - n.x) * 0.0008;
            n.vy += (this.h / 2 - n.y) * 0.0008;
        });

        // Integrate
        let totalV = 0;
        nodes.forEach(n => {
            if (n === this.dragNode) return;
            n.vx *= 0.88;
            n.vy *= 0.88;
            n.x += n.vx;
            n.y += n.vy;
            n.x = Math.max(40, Math.min(this.w - 40, n.x));
            n.y = Math.max(60, Math.min(this.h - 40, n.y));
            totalV += Math.abs(n.vx) + Math.abs(n.vy);
        });

        this.settled = totalV < 0.5;
    }

    // --- Particles ---
    spawnParticles(x, y, color) {
        for (let i = 0; i < 6; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 1,
                color,
                size: Math.random() * 2 + 1,
            });
        }
    }

    updateParticles() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.025;
            p.vx *= 0.97;
            p.vy *= 0.97;
            return p.life > 0;
        });
    }

    // --- Draw ---
    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);
        this.time += 0.01;

        const map = {};
        this.nodes.forEach(n => map[n.id] = n);

        const hovered = this.hoveredNode;
        const hoveredLinks = hovered ? NOTES[hovered.id]?.links || [] : [];

        // Draw grid dots (subtle)
        ctx.fillStyle = 'rgba(42, 42, 61, 0.4)';
        const spacing = 40;
        for (let x = spacing; x < this.w; x += spacing) {
            for (let y = spacing; y < this.h; y += spacing) {
                ctx.beginPath();
                ctx.arc(x, y, 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Draw edges
        this.edges.forEach(edge => {
            const a = map[edge.a], b = map[edge.b];
            if (!a || !b) return;

            const isActive = hovered && (hovered.id === edge.a || hovered.id === edge.b);
            const isSelected = this.selectedNode && (this.selectedNode.id === edge.a || this.selectedNode.id === edge.b);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            if (isActive || isSelected) {
                ctx.strokeStyle = 'rgba(203, 166, 247, 0.35)';
                ctx.lineWidth = 1.5;
            } else {
                ctx.strokeStyle = 'rgba(42, 42, 61, 0.6)';
                ctx.lineWidth = 0.8;
            }
            ctx.stroke();
        });

        // Draw edge glow for hovered
        if (hovered) {
            this.edges.forEach(edge => {
                const a = map[edge.a], b = map[edge.b];
                if (!a || !b) return;
                if (hovered.id !== edge.a && hovered.id !== edge.b) return;

                const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                const colA = this.nodeColors[a.type]?.fill || '#6c7086';
                const colB = this.nodeColors[b.type]?.fill || '#6c7086';
                gradient.addColorStop(0, colA + '30');
                gradient.addColorStop(1, colB + '30');

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 3;
                ctx.stroke();
            });
        }

        // Draw particles
        this.particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
            ctx.fill();
        });

        // Draw nodes
        this.nodes.forEach(node => {
            const colors = this.nodeColors[node.type] || this.nodeColors.hub;
            const isHovered = hovered === node;
            const isConnected = hovered && hoveredLinks.includes(node.id);
            const isSelected = this.selectedNode === node;
            const isActive = isHovered || isConnected || isSelected;
            const breathe = Math.sin(this.time * 2 + node.x * 0.01) * 0.5 + 0.5;

            const size = isHovered ? node.size * 1.3 :
                         isActive ? node.size * 1.1 : node.size;

            // Outer glow
            if (isActive) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, size + 12, 0, Math.PI * 2);
                ctx.fillStyle = colors.glow;
                ctx.fill();
            }

            // Ambient pulse
            if (!isActive && node.size > 10) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, size + 4 + breathe * 3, 0, Math.PI * 2);
                ctx.fillStyle = colors.fill + '08';
                ctx.fill();
            }

            // Node body
            ctx.beginPath();
            ctx.arc(node.x, node.y, size, 0, Math.PI * 2);

            if (isHovered || isSelected) {
                ctx.fillStyle = colors.fill;
                ctx.shadowColor = colors.fill;
                ctx.shadowBlur = 20;
            } else if (isActive) {
                ctx.fillStyle = colors.fill + 'cc';
                ctx.shadowBlur = 0;
            } else {
                ctx.fillStyle = colors.fill + '70';
                ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.shadowBlur = 0;

            // Inner highlight
            if (isHovered || isSelected) {
                ctx.beginPath();
                ctx.arc(node.x - size * 0.2, node.y - size * 0.2, size * 0.35, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.15)';
                ctx.fill();
            }

            // Label
            const showLabel = isActive || node.size > 10 || this.settled;
            if (showLabel) {
                ctx.font = `${isHovered ? '13px' : '11px'} Inter, sans-serif`;
                ctx.textAlign = 'center';
                ctx.fillStyle = isActive ? '#cdd6f4' : '#6c7086';
                ctx.fillText(node.label, node.x, node.y + size + 16);
            }
        });
    }

    // --- Loop ---
    loop() {
        this.physics();
        this.updateParticles();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    // --- Minimap ---
    drawMinimap(miniCanvas) {
        const ctx = miniCanvas.getContext('2d');
        const scale = 0.15;
        miniCanvas.width = this.w * scale * this.dpr;
        miniCanvas.height = this.h * scale * this.dpr;
        ctx.scale(this.dpr, this.dpr);
        ctx.clearRect(0, 0, this.w * scale, this.h * scale);

        const map = {};
        this.nodes.forEach(n => map[n.id] = n);

        this.edges.forEach(e => {
            const a = map[e.a], b = map[e.b];
            if (!a || !b) return;
            ctx.beginPath();
            ctx.moveTo(a.x * scale, a.y * scale);
            ctx.lineTo(b.x * scale, b.y * scale);
            ctx.strokeStyle = 'rgba(42,42,61,0.6)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
        });

        this.nodes.forEach(n => {
            const colors = this.nodeColors[n.type] || this.nodeColors.hub;
            ctx.beginPath();
            ctx.arc(n.x * scale, n.y * scale, Math.max(2, n.size * scale * 1.5), 0, Math.PI * 2);
            ctx.fillStyle = n === this.selectedNode ? colors.fill : colors.fill + '80';
            ctx.fill();
        });
    }

    // --- Events ---
    bindEvents() {
        const getPos = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const hitTest = (pos) => {
            for (let i = this.nodes.length - 1; i >= 0; i--) {
                const n = this.nodes[i];
                const dx = pos.x - n.x, dy = pos.y - n.y;
                if (Math.sqrt(dx * dx + dy * dy) < n.size + 10) return n;
            }
            return null;
        };

        // Mouse move
        this.canvas.addEventListener('mousemove', (e) => {
            const pos = getPos(e);
            this.mouse = pos;

            if (this.dragNode) {
                this.dragNode.x = pos.x;
                this.dragNode.y = pos.y;
                this.dragNode.vx = 0;
                this.dragNode.vy = 0;
                return;
            }

            const prev = this.hoveredNode;
            this.hoveredNode = hitTest(pos);
            this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'grab';

            // Spawn particles when entering a node
            if (this.hoveredNode && this.hoveredNode !== prev) {
                const colors = this.nodeColors[this.hoveredNode.type] || this.nodeColors.hub;
                this.spawnParticles(this.hoveredNode.x, this.hoveredNode.y, colors.fill);
            }
        });

        // Mouse down
        this.canvas.addEventListener('mousedown', (e) => {
            const pos = getPos(e);
            const node = hitTest(pos);
            if (node) {
                this.dragNode = node;
                this.dragStart = { x: pos.x, y: pos.y };
            }
        });

        // Mouse up → click detection
        this.canvas.addEventListener('mouseup', (e) => {
            if (this.dragNode && this.dragStart) {
                const pos = getPos(e);
                const dx = pos.x - this.dragStart.x;
                const dy = pos.y - this.dragStart.y;
                const moved = Math.sqrt(dx * dx + dy * dy);

                if (moved < 5) {
                    // It's a click
                    this.selectedNode = this.dragNode;
                    const colors = this.nodeColors[this.dragNode.type] || this.nodeColors.hub;
                    this.spawnParticles(this.dragNode.x, this.dragNode.y, colors.fill);
                    openNote(this.dragNode.id);
                }
            }
            this.dragNode = null;
            this.dragStart = null;
        });

        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            const pos = getPos(e);
            const node = hitTest(pos);
            if (node) {
                this.dragNode = node;
                this.dragStart = { x: pos.x, y: pos.y };
            }
        }, { passive: true });

        this.canvas.addEventListener('touchmove', (e) => {
            if (this.dragNode) {
                const pos = getPos(e);
                this.dragNode.x = pos.x;
                this.dragNode.y = pos.y;
            }
        }, { passive: true });

        this.canvas.addEventListener('touchend', (e) => {
            if (this.dragNode) {
                this.selectedNode = this.dragNode;
                openNote(this.dragNode.id);
            }
            this.dragNode = null;
        });

        window.addEventListener('resize', () => this.resize());
    }
}
