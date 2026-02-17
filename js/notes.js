// ============================================================================
// Notes — All content. Clean, tight, job-getting.
// ============================================================================

const NOTES = {

    // ─── Hub ───
    'about': {
        title: 'James Barber III',
        type: 'hub',
        size: 24,
        tags: ['#engineer', '#builder'],
        links: ['weathermind', 'linkhub', 'netstack', 'dataforge', 'skills', 'photography', 'contact'],
        content: `
            <h1>James Barber III</h1>
            <div class="note-tags">
                <span class="note-tag">#engineer</span>
                <span class="note-tag">#builder</span>
            </div>
            <div class="note-meta">
                <span class="meta-key">School</span><span class="meta-value">Saint Louis University — CS, May 2027</span>
                <span class="meta-key">Focus</span><span class="meta-value">Systems, Backend, Applied ML</span>
                <span class="meta-key">Stack</span><span class="meta-value">C, Python, JavaScript, SQL, PyTorch</span>
                <span class="meta-key">Status</span><span class="meta-value">Looking for engineering internships</span>
            </div>
            <p>I build systems that work under pressure. Concurrent servers in C, ML pipelines in Python, production SaaS in Node. I ship code that handles real load, not class assignments.</p>
            <hr>
            <h2>Projects</h2>
            <ul>
                <li><span class="internal-link" onclick="openNote('weathermind')">WeatherMind</span> — LSTM weather prediction trained on 50k+ station records</li>
                <li><span class="internal-link" onclick="openNote('linkhub')">LinkHub</span> — Production SaaS with Stripe billing, live on Railway</li>
                <li><span class="internal-link" onclick="openNote('netstack')">NetStack</span> — Concurrent HTTP server in C with thread pool + epoll</li>
                <li><span class="internal-link" onclick="openNote('dataforge')">DataForge</span> — Real-time event pipeline, 5k events/sec</li>
            </ul>
            <h2>More</h2>
            <ul>
                <li><span class="internal-link" onclick="openNote('skills')">Technical Skills</span></li>
                <li><span class="internal-link" onclick="openNote('photography')">Photography</span></li>
                <li><span class="internal-link" onclick="openNote('contact')">Contact</span></li>
            </ul>
        `
    },

    // ─── Projects ───
    'weathermind': {
        title: 'WeatherMind',
        type: 'project',
        size: 18,
        tags: ['#project', '#ml', '#python', '#pytorch'],
        links: ['about', 'skills', 'dataforge', 'linkhub'],
        content: `
            <h1>WeatherMind</h1>
            <div class="note-tags">
                <span class="note-tag">#project</span>
                <span class="note-tag">#ml</span>
                <span class="note-tag">#python</span>
                <span class="note-tag">#pytorch</span>
            </div>
            <div class="note-meta">
                <span class="meta-key">Stack</span><span class="meta-value">Python, PyTorch, SQLite, Flask</span>
                <span class="meta-key">Data</span><span class="meta-value">NOAA weather station records</span>
                <span class="meta-key">GitHub</span><span class="meta-value"><a href="https://github.com/linkhubinc1-sudo/weathermind" target="_blank">linkhubinc1-sudo/weathermind</a></span>
            </div>
            <p>End-to-end weather prediction system. Ingests station data into SQLite, engineers 12 temporal features, trains an LSTM to predict temperature and conditions 6-24 hours ahead.</p>
            <pre>Station Data → SQLite → Feature Engineering → LSTM → Flask API → Dashboard</pre>
            <div class="metric-row">
                <div class="metric-card"><div class="value">2.1°F</div><div class="label">MAE (6hr)</div></div>
                <div class="metric-card"><div class="value">87%</div><div class="label">Condition Acc</div></div>
                <div class="metric-card"><div class="value">50k+</div><div class="label">Samples</div></div>
                <div class="metric-card"><div class="value">12</div><div class="label">Features</div></div>
            </div>
            <h2>Architecture</h2>
            <ul>
                <li><strong>Database</strong> — SQLite with WAL mode, indexed on (station_id, timestamp), batch inserts</li>
                <li><strong>Features</strong> — Cyclical time encoding, rolling averages (3/6/12hr), pressure change rate, wind chill, temp-humidity interaction</li>
                <li><strong>Model</strong> — 2-layer LSTM (128 hidden), dropout 0.3, dual-head: MSE for temp + CrossEntropy for conditions</li>
                <li><strong>API</strong> — Flask with prediction caching, SQLite prediction logging, monitoring dashboard</li>
            </ul>
            <h2>Key decisions</h2>
            <ul>
                <li>Pressure change rate over 3hr is the single best predictor for next-day conditions</li>
                <li>Cyclical encoding for time features eliminated all seasonal discontinuities</li>
                <li>Combined loss weighting (1.0 MSE + 0.5 CE) prevents the classification head from dominating training</li>
            </ul>
            <blockquote>The pipeline engineering was harder than the model. ML is 10% model, 90% data engineering.</blockquote>
        `
    },

    'linkhub': {
        title: 'LinkHub',
        type: 'project',
        size: 16,
        tags: ['#project', '#saas', '#javascript', '#production'],
        links: ['about', 'skills', 'weathermind', 'netstack'],
        content: `
            <h1>LinkHub</h1>
            <div class="note-tags">
                <span class="note-tag">#project</span>
                <span class="note-tag">#saas</span>
                <span class="note-tag">#javascript</span>
                <span class="note-tag">#production</span>
            </div>
            <div class="note-meta">
                <span class="meta-key">Stack</span><span class="meta-value">Express.js, SQLite, Stripe, Puppeteer</span>
                <span class="meta-key">Deploy</span><span class="meta-value">Railway (auto-deploy from master)</span>
                <span class="meta-key">Live</span><span class="meta-value"><a href="https://linkhub-production-4cad.up.railway.app" target="_blank">linkhub-production-4cad.up.railway.app</a></span>
                <span class="meta-key">GitHub</span><span class="meta-value"><a href="https://github.com/linkhubinc1-sudo/linkhub" target="_blank">linkhubinc1-sudo/linkhub</a></span>
            </div>
            <p>Link-in-bio SaaS built and deployed solo. Customizable pages, Stripe subscriptions, admin dashboard, analytics, automated lead generation.</p>
            <div class="metric-row">
                <div class="metric-card"><div class="value">Live</div><div class="label">Production</div></div>
                <div class="metric-card"><div class="value">Stripe</div><div class="label">Billing</div></div>
                <div class="metric-card"><div class="value">Solo</div><div class="label">Developer</div></div>
            </div>
            <h2>What's in it</h2>
            <ul>
                <li>Stripe subscription billing with webhook handling</li>
                <li>Admin dashboard with user management and analytics</li>
                <li>Automated lead generation pipeline (Puppeteer)</li>
                <li>CI/CD — push to master auto-deploys on Railway</li>
            </ul>
            <h2>What it taught me</h2>
            <p>Payment webhooks failing at midnight. Database migrations on a live system. The gap between school projects and production software is real, and I've been on both sides.</p>
        `
    },

    'netstack': {
        title: 'NetStack',
        type: 'project',
        size: 15,
        tags: ['#project', '#systems', '#c', '#networking'],
        links: ['about', 'skills', 'dataforge', 'linkhub'],
        content: `
            <h1>NetStack</h1>
            <div class="note-tags">
                <span class="note-tag">#project</span>
                <span class="note-tag">#systems</span>
                <span class="note-tag">#c</span>
                <span class="note-tag">#networking</span>
            </div>
            <div class="note-meta">
                <span class="meta-key">Stack</span><span class="meta-value">C (C11), pthreads, epoll, Valgrind</span>
                <span class="meta-key">CI</span><span class="meta-value">GitHub Actions</span>
                <span class="meta-key">GitHub</span><span class="meta-value"><a href="https://github.com/linkhubinc1-sudo/netstack" target="_blank">linkhubinc1-sudo/netstack</a></span>
            </div>
            <p>HTTP/1.1 server built from scratch in C. Pre-forked thread pool, epoll I/O multiplexing, static file serving, JSON API, keep-alive support. Zero memory leaks.</p>
            <pre>Client → epoll accept → Thread Pool → HTTP Parser → Response Builder → Client</pre>
            <div class="metric-row">
                <div class="metric-card"><div class="value">12k+</div><div class="label">req/sec</div></div>
                <div class="metric-card"><div class="value">&lt;2ms</div><div class="label">p95 latency</div></div>
                <div class="metric-card"><div class="value">0</div><div class="label">Memory leaks</div></div>
            </div>
            <h2>Implementation</h2>
            <ul>
                <li><strong>Thread pool</strong> — Configurable worker count, mutex-protected task queue with condition variables</li>
                <li><strong>I/O</strong> — epoll for non-blocking event-driven accept, workers handle individual connections</li>
                <li><strong>HTTP</strong> — Hand-rolled parser for GET requests, proper Content-Type detection, Connection: keep-alive loop</li>
                <li><strong>Safety</strong> — Valgrind clean, SIGINT graceful shutdown, bounds-checked buffers</li>
            </ul>
            <h2>Benchmarks</h2>
            <p>Tested with <code>wrk</code> at 1/10/100/1000 concurrent connections. Holds sub-2ms p95 latency up to 500 concurrent, degrades gracefully beyond.</p>
        `
    },

    'dataforge': {
        title: 'DataForge',
        type: 'project',
        size: 15,
        tags: ['#project', '#data', '#nodejs', '#realtime'],
        links: ['about', 'skills', 'weathermind', 'netstack'],
        content: `
            <h1>DataForge</h1>
            <div class="note-tags">
                <span class="note-tag">#project</span>
                <span class="note-tag">#data</span>
                <span class="note-tag">#nodejs</span>
                <span class="note-tag">#realtime</span>
            </div>
            <div class="note-meta">
                <span class="meta-key">Stack</span><span class="meta-value">Node.js, SQLite, WebSocket, Docker</span>
                <span class="meta-key">GitHub</span><span class="meta-value"><a href="https://github.com/linkhubinc1-sudo/dataforge" target="_blank">linkhubinc1-sudo/dataforge</a></span>
            </div>
            <p>Real-time event ingestion pipeline. REST API accepts JSON events, buffers in a ring buffer, batch-writes to SQLite, pushes analytics to a live WebSocket dashboard.</p>
            <pre>POST /ingest → Ring Buffer → Batch Writer → SQLite → WebSocket → Dashboard</pre>
            <div class="metric-row">
                <div class="metric-card"><div class="value">5k+</div><div class="label">events/sec</div></div>
                <div class="metric-card"><div class="value">&lt;100ms</div><div class="label">E2E latency</div></div>
                <div class="metric-card"><div class="value">85%</div><div class="label">Write reduction</div></div>
            </div>
            <h2>Design</h2>
            <ul>
                <li><strong>Ring buffer</strong> — Fixed-size circular buffer, flushes every 500ms or 100 events (whichever first)</li>
                <li><strong>Batch writes</strong> — SQLite transactions with 100-row batch inserts. 85% fewer writes vs per-event</li>
                <li><strong>Backpressure</strong> — Returns 429 + Retry-After when buffer is full</li>
                <li><strong>Dashboard</strong> — WebSocket push, Chart.js throughput/breakdown charts, auto-reconnect</li>
            </ul>
            <h2>Why batch?</h2>
            <p>Naive per-event inserts hit 200 events/sec. Batch flushing: 5,000+. The bottleneck was SQLite transaction overhead, not I/O. Every production system uses write batching for a reason.</p>
        `
    },

    // ─── Skills ───
    'skills': {
        title: 'Skills',
        type: 'skill',
        size: 16,
        tags: ['#skills'],
        links: ['about', 'weathermind', 'linkhub', 'netstack', 'dataforge'],
        content: `
            <h1>Technical Skills</h1>
            <div class="note-tags"><span class="note-tag">#skills</span></div>
            <h2>Systems</h2>
            <div class="skill-row"><span class="name">C (C11)</span><div class="bar"><div class="fill fill-purple" style="width:90%"></div></div></div>
            <div class="skill-row"><span class="name">pthreads / Concurrency</span><div class="bar"><div class="fill fill-purple" style="width:85%"></div></div></div>
            <div class="skill-row"><span class="name">Memory Management</span><div class="bar"><div class="fill fill-purple" style="width:85%"></div></div></div>
            <div class="skill-row"><span class="name">Network Programming</span><div class="bar"><div class="fill fill-purple" style="width:80%"></div></div></div>
            <div class="skill-row"><span class="name">Linux</span><div class="bar"><div class="fill fill-purple" style="width:80%"></div></div></div>

            <h2>Backend</h2>
            <div class="skill-row"><span class="name">JavaScript / Node.js</span><div class="bar"><div class="fill fill-blue" style="width:92%"></div></div></div>
            <div class="skill-row"><span class="name">Express / REST APIs</span><div class="bar"><div class="fill fill-blue" style="width:90%"></div></div></div>
            <div class="skill-row"><span class="name">Python / Flask</span><div class="bar"><div class="fill fill-blue" style="width:80%"></div></div></div>
            <div class="skill-row"><span class="name">HTML / CSS</span><div class="bar"><div class="fill fill-blue" style="width:88%"></div></div></div>
            <div class="skill-row"><span class="name">WebSockets</span><div class="bar"><div class="fill fill-blue" style="width:78%"></div></div></div>

            <h2>Data & ML</h2>
            <div class="skill-row"><span class="name">SQL / SQLite / Postgres</span><div class="bar"><div class="fill fill-green" style="width:85%"></div></div></div>
            <div class="skill-row"><span class="name">PyTorch</span><div class="bar"><div class="fill fill-green" style="width:72%"></div></div></div>
            <div class="skill-row"><span class="name">pandas / NumPy</span><div class="bar"><div class="fill fill-green" style="width:75%"></div></div></div>
            <div class="skill-row"><span class="name">Database Design</span><div class="bar"><div class="fill fill-green" style="width:80%"></div></div></div>

            <h2>Tools</h2>
            <div class="skill-row"><span class="name">Git / GitHub</span><div class="bar"><div class="fill fill-peach" style="width:90%"></div></div></div>
            <div class="skill-row"><span class="name">Docker</span><div class="bar"><div class="fill fill-peach" style="width:72%"></div></div></div>
            <div class="skill-row"><span class="name">GitHub Actions</span><div class="bar"><div class="fill fill-peach" style="width:75%"></div></div></div>
            <div class="skill-row"><span class="name">Valgrind</span><div class="bar"><div class="fill fill-peach" style="width:80%"></div></div></div>
            <div class="skill-row"><span class="name">Wireshark</span><div class="bar"><div class="fill fill-peach" style="width:70%"></div></div></div>
        `
    },

    // ─── Creative ───
    'photography': {
        title: 'Photography',
        type: 'creative',
        size: 12,
        tags: ['#photography', '#creative'],
        links: ['about', 'contact'],
        content: `
            <h1>Photography</h1>
            <div class="note-tags">
                <span class="note-tag">#photography</span>
                <span class="note-tag">#creative</span>
            </div>
            <div class="note-meta">
                <span class="meta-key">Camera</span><span class="meta-value">Sony a6400</span>
                <span class="meta-key">Lens</span><span class="meta-value">Sigma 30mm f/1.4</span>
                <span class="meta-key">Edit</span><span class="meta-value">DaVinci Resolve</span>
            </div>
            <p>Photo and video. Same attention to detail as engineering — every element intentional.</p>
            <div class="photo-grid">
                <div class="photo-slot"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span>photo</span></div>
                <div class="photo-slot"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span>photo</span></div>
                <div class="photo-slot"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span>photo</span></div>
                <div class="photo-slot wide"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span>photo</span></div>
                <div class="photo-slot"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span>photo</span></div>
            </div>
        `
    },

    // ─── Contact ───
    'contact': {
        title: 'Contact',
        type: 'contact',
        size: 12,
        tags: ['#contact'],
        links: ['about'],
        content: `
            <h1>Get in Touch</h1>
            <div class="note-tags"><span class="note-tag">#contact</span></div>
            <p>Looking for engineering internships — backend, systems, data, applied ML.</p>
            <div class="contact-grid">
                <a href="mailto:jameson.w.barber@slu.edu" class="contact-card">
                    <span class="card-label">Email</span>
                    <span class="card-value">jameson.w.barber@slu.edu</span>
                </a>
                <a href="https://github.com/linkhubinc1-sudo" target="_blank" class="contact-card">
                    <span class="card-label">GitHub</span>
                    <span class="card-value">linkhubinc1-sudo</span>
                </a>
                <a href="https://www.linkedin.com/in/james-barber-819317316/" target="_blank" class="contact-card">
                    <span class="card-label">LinkedIn</span>
                    <span class="card-value">James Barber III</span>
                </a>
                <a href="tel:5027777662" class="contact-card">
                    <span class="card-label">Phone</span>
                    <span class="card-value">(502) 777-7662</span>
                </a>
            </div>
        `
    }
};
