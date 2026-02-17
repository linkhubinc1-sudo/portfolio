// ============================================================================
// Graph View — Interactive force-directed graph of connected notes
// ============================================================================

class GraphView {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.edges = [];
        this.hoveredNode = null;
        this.draggingNode = null;
        this.animationId = null;
        this.mouse = { x: 0, y: 0 };

        this.colors = {
            '#home': '#cba6f7',
            '#project': '#89b4fa',
            '#life': '#a6e3a1',
            '#skills': '#fab387',
            '#photography': '#f5c2e7',
            '#contact': '#94e2d5',
            '#about': '#b4befe',
            default: '#6c7086'
        };

        this.init();
        this.bindEvents();
    }

    init() {
        this.resize();
        this.buildGraph();
        this.simulate();
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height - 40; // minus header
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }

    buildGraph() {
        this.nodes = [];
        this.edges = [];

        const noteIds = Object.keys(NOTES);
        const nodeMap = {};

        // Create nodes
        noteIds.forEach((id, i) => {
            const note = NOTES[id];
            const angle = (i / noteIds.length) * Math.PI * 2;
            const radius = 120;
            const node = {
                id,
                label: note.title,
                x: this.centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 60,
                y: this.centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 60,
                vx: 0,
                vy: 0,
                radius: note.links.length > 3 ? 8 : 5,
                color: this.getNodeColor(note.tags),
                connections: note.links.length
            };
            this.nodes.push(node);
            nodeMap[id] = node;
        });

        // Create edges from note links
        noteIds.forEach(id => {
            const note = NOTES[id];
            note.links.forEach(targetId => {
                if (nodeMap[targetId] && !this.edges.find(e =>
                    (e.source === id && e.target === targetId) ||
                    (e.source === targetId && e.target === id)
                )) {
                    this.edges.push({ source: id, target: targetId });
                }
            });
        });
    }

    getNodeColor(tags) {
        for (const tag of tags) {
            if (this.colors[tag]) return this.colors[tag];
        }
        return this.colors.default;
    }

    simulate() {
        const step = () => {
            this.applyForces();
            this.draw();
            this.animationId = requestAnimationFrame(step);
        };
        step();
    }

    applyForces() {
        const nodeMap = {};
        this.nodes.forEach(n => nodeMap[n.id] = n);

        // Repulsion between all nodes
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const a = this.nodes[i];
                const b = this.nodes[j];
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const force = 800 / (dist * dist);
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;
                a.vx -= fx;
                a.vy -= fy;
                b.vx += fx;
                b.vy += fy;
            }
        }

        // Attraction along edges
        this.edges.forEach(edge => {
            const a = nodeMap[edge.source];
            const b = nodeMap[edge.target];
            if (!a || !b) return;
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = (dist - 100) * 0.005;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            a.vx += fx;
            a.vy += fy;
            b.vx -= fx;
            b.vy -= fy;
        });

        // Center gravity
        this.nodes.forEach(node => {
            node.vx += (this.centerX - node.x) * 0.001;
            node.vy += (this.centerY - node.y) * 0.001;
        });

        // Apply velocity with damping
        this.nodes.forEach(node => {
            if (node === this.draggingNode) return;
            node.vx *= 0.85;
            node.vy *= 0.85;
            node.x += node.vx;
            node.y += node.vy;

            // Keep in bounds
            node.x = Math.max(20, Math.min(this.canvas.width - 20, node.x));
            node.y = Math.max(20, Math.min(this.canvas.height - 20, node.y));
        });
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const nodeMap = {};
        this.nodes.forEach(n => nodeMap[n.id] = n);

        // Draw edges
        this.edges.forEach(edge => {
            const a = nodeMap[edge.source];
            const b = nodeMap[edge.target];
            if (!a || !b) return;

            const isHighlighted = this.hoveredNode &&
                (this.hoveredNode.id === edge.source || this.hoveredNode.id === edge.target);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isHighlighted ? 'rgba(203,166,247,0.5)' : 'rgba(69,71,90,0.4)';
            ctx.lineWidth = isHighlighted ? 1.5 : 0.5;
            ctx.stroke();
        });

        // Draw nodes
        this.nodes.forEach(node => {
            const isHovered = this.hoveredNode === node;
            const isConnected = this.hoveredNode && NOTES[this.hoveredNode.id]?.links.includes(node.id);
            const isActive = isHovered || isConnected;

            // Glow
            if (isActive) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
                ctx.fillStyle = node.color + '20';
                ctx.fill();
            }

            // Node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, isHovered ? node.radius + 2 : node.radius, 0, Math.PI * 2);
            ctx.fillStyle = isActive ? node.color : node.color + '80';
            ctx.fill();

            // Label
            if (isActive || node.connections > 3) {
                ctx.font = `${isHovered ? '12px' : '10px'} Inter, sans-serif`;
                ctx.fillStyle = isActive ? '#cdd6f4' : '#6c7086';
                ctx.textAlign = 'center';
                ctx.fillText(node.label, node.x, node.y + node.radius + 14);
            }
        });
    }

    bindEvents() {
        this.canvas.addEventListener('mousemove', e => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;

            if (this.draggingNode) {
                this.draggingNode.x = this.mouse.x;
                this.draggingNode.y = this.mouse.y;
                this.draggingNode.vx = 0;
                this.draggingNode.vy = 0;
                return;
            }

            this.hoveredNode = null;
            for (const node of this.nodes) {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                if (Math.sqrt(dx * dx + dy * dy) < node.radius + 8) {
                    this.hoveredNode = node;
                    this.canvas.style.cursor = 'pointer';
                    return;
                }
            }
            this.canvas.style.cursor = 'default';
        });

        this.canvas.addEventListener('mousedown', e => {
            if (this.hoveredNode) {
                this.draggingNode = this.hoveredNode;
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.draggingNode = null;
        });

        this.canvas.addEventListener('click', () => {
            if (this.hoveredNode && !this.draggingNode) {
                openNote(this.hoveredNode.id);
            }
        });

        window.addEventListener('resize', () => this.resize());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

let graphInstance = null;
