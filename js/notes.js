// ============================================================================
// Notes Data — All portfolio content as "Obsidian notes"
// ============================================================================

const NOTES = {
    'welcome': {
        title: 'Welcome',
        tags: ['#home', '#portfolio'],
        links: ['about', 'weather-llm', 'linkhub', 'skills', 'photography'],
        content: `
            <h1>Welcome</h1>
            <div class="note-tags">
                <span class="note-tag">#home</span>
                <span class="note-tag">#portfolio</span>
            </div>
            <p>Hey — I'm <strong>James Barber III</strong>. CS student at <span class="internal-link" onclick="openNote('slu')">Saint Louis University</span>, systems programmer, and builder.</p>
            <p>This is my brain — organized like an Obsidian vault. Click around, explore the sidebar, or open the <strong>graph view</strong> to see how everything connects.</p>
            <hr>
            <h2>Start here</h2>
            <ul>
                <li><span class="internal-link" onclick="openNote('about')">About Me</span> — who I am, what I care about</li>
                <li><span class="internal-link" onclick="openNote('weather-llm')">WeatherMind</span> — my weather prediction LLM trained on station data</li>
                <li><span class="internal-link" onclick="openNote('linkhub')">LinkHub</span> — production SaaS I built and deployed solo</li>
                <li><span class="internal-link" onclick="openNote('skills')">Technical Skills</span> — what I work with</li>
                <li><span class="internal-link" onclick="openNote('photography')">Photography</span> — the creative side</li>
            </ul>
            <hr>
            <h2>What I'm looking for</h2>
            <p>Engineering internships — backend, systems, data, or applied ML. I ship production code and I'm looking for a team that will challenge me.</p>
            <blockquote>I'm not looking for a company that will teach me — I'm looking for one that will challenge me.</blockquote>
        `
    },
    'about': {
        title: 'About Me',
        tags: ['#about', '#personal'],
        links: ['slu', 'weather-llm', 'linkhub', 'skills', 'creative-side', 'contact'],
        content: `
            <h1>About Me</h1>
            <div class="note-tags">
                <span class="note-tag">#about</span>
                <span class="note-tag">#personal</span>
            </div>
            <div class="note-meta">
                <span class="meta-key">Location</span><span class="meta-value">St. Louis, MO</span>
                <span class="meta-key">University</span><span class="meta-value"><span class="internal-link" onclick="openNote('slu')">Saint Louis University</span></span>
                <span class="meta-key">Graduation</span><span class="meta-value">May 2027</span>
                <span class="meta-key">Focus</span><span class="meta-value">Systems & Backend Engineering</span>
                <span class="meta-key">Email</span><span class="meta-value"><a href="mailto:jameson.w.barber@slu.edu">jameson.w.barber@slu.edu</a></span>
            </div>
            <p>I'm a CS student who builds real systems, not toy demos. I write C for performance-critical software — concurrent servers, thread pools, memory management — and JavaScript/Python for everything else.</p>
            <p>I've already launched a production SaaS (<span class="internal-link" onclick="openNote('linkhub')">LinkHub</span>) with Stripe billing and real users. I trained a <span class="internal-link" onclick="openNote('weather-llm')">weather prediction model</span> on real station data. Now I'm focused on systems engineering — building the kind of infrastructure that powers companies at scale.</p>
            <p>When I'm not coding, I shoot photos and video on a Sony a6400 and edit in DaVinci Resolve. I like making things look as good as they perform. More on <span class="internal-link" onclick="openNote('creative-side')">the creative side</span>.</p>
            <hr>
            <h2>Links</h2>
            <ul>
                <li><a href="https://github.com/linkhubinc1-sudo" target="_blank">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/james-barber-819317316/" target="_blank">LinkedIn</a></li>
                <li><span class="internal-link" onclick="openNote('contact')">Contact</span></li>
            </ul>
        `
    },

    // --- Life notes ---
    'early-days': {
        title: 'Early Days',
        tags: ['#life', '#origins'],
        links: ['finding-code', 'about'],
        content: `
            <h1>Early Days</h1>
            <div class="note-tags">
                <span class="note-tag">#life</span>
                <span class="note-tag">#origins</span>
            </div>
            <p>Born and raised with a curiosity for how things work. While other kids were playing games, I was taking apart electronics and figuring out what made them tick. That same energy never left.</p>
            <p>Kentucky roots. Southern hospitality but with a restless ambition that didn't fit the mold. Always felt like I was meant to build something bigger than what was around me.</p>
            <p>That curiosity eventually led me to computers, and then to <span class="internal-link" onclick="openNote('finding-code')">code</span>.</p>
        `
    },
    'finding-code': {
        title: 'Finding Code',
        tags: ['#life', '#programming'],
        links: ['early-days', 'slu', 'skills'],
        content: `
            <h1>Finding Code</h1>
            <div class="note-tags">
                <span class="note-tag">#life</span>
                <span class="note-tag">#programming</span>
            </div>
            <p>First real encounter with code wasn't in a classroom — it was trying to automate something tedious and realizing the computer would do whatever I told it to. That power was addictive.</p>
            <p>Started with web stuff, HTML and CSS, making things look good on screen. But what really hooked me was going deeper — what happens under the hood. How does the computer actually execute this?</p>
            <p>That question led me to C, to systems, to understanding the metal. It's the difference between using a tool and understanding how the tool was made. I wanted to understand.</p>
            <p>Eventually that led me to <span class="internal-link" onclick="openNote('slu')">Saint Louis University</span> and a real CS education.</p>
        `
    },
    'slu': {
        title: 'Saint Louis University',
        tags: ['#life', '#education', '#cs'],
        links: ['finding-code', 'about', 'skills', 'weather-llm', 'linkhub'],
        content: `
            <h1>Saint Louis University</h1>
            <div class="note-tags">
                <span class="note-tag">#life</span>
                <span class="note-tag">#education</span>
                <span class="note-tag">#cs</span>
            </div>
            <div class="note-meta">
                <span class="meta-key">Degree</span><span class="meta-value">B.S. Computer Science</span>
                <span class="meta-key">Expected</span><span class="meta-value">May 2027</span>
                <span class="meta-key">Courses</span><span class="meta-value">Computer Networks, Database Systems, Systems Programming, Data Structures</span>
            </div>
            <p>Chose SLU because I wanted a real education, not just a degree. Computer Science hit different when you're learning database normalization, network protocols, and systems programming all at once.</p>
            <p>The coursework is solid — Computer Networks with Professor Esposito, Database Systems, Systems Programming. But the real learning happens at 2 AM when you're debugging a race condition in your thread pool and the Valgrind output finally makes sense.</p>
            <p>While here I've built <span class="internal-link" onclick="openNote('linkhub')">LinkHub</span> (a full SaaS), trained a <span class="internal-link" onclick="openNote('weather-llm')">weather prediction model</span>, and gone deep on <span class="internal-link" onclick="openNote('skills')">systems programming</span>.</p>
        `
    },
    'creative-side': {
        title: 'The Creative Side',
        tags: ['#life', '#photography', '#video'],
        links: ['about', 'photography'],
        content: `
            <h1>The Creative Side</h1>
            <div class="note-tags">
                <span class="note-tag">#life</span>
                <span class="note-tag">#photography</span>
                <span class="note-tag">#video</span>
            </div>
            <p>Engineering isn't my only language. I shoot on a Sony a6400 — photos and video. There's something about composing a frame that's the same brain as composing a system: every element needs to be intentional, every detail matters.</p>
            <p>DaVinci Resolve for editing. I believe the best engineers have a creative edge. The ability to see both function and form is what separates good software from great software.</p>
            <p>See the <span class="internal-link" onclick="openNote('photography')">gallery</span> for some of my work.</p>
        `
    },
    'whats-next': {
        title: "What's Next",
        tags: ['#life', '#future', '#career'],
        links: ['about', 'weather-llm', 'linkhub', 'skills', 'contact'],
        content: `
            <h1>What's Next</h1>
            <div class="note-tags">
                <span class="note-tag">#life</span>
                <span class="note-tag">#future</span>
                <span class="note-tag">#career</span>
            </div>
            <p>Right now I'm going deep on systems engineering and applied ML. Building things like a <span class="internal-link" onclick="openNote('weather-llm')">weather prediction model</span> trained on real data, not because a class told me to, but because these are the projects that matter.</p>
            <p>The goal is clear: land an engineering role where I can build infrastructure at scale. I've already proven I can <span class="internal-link" onclick="openNote('linkhub')">ship production software</span>. Now I want to ship at a level that impacts millions.</p>
            <p>If you've got something interesting, <span class="internal-link" onclick="openNote('contact')">let's talk</span>.</p>
        `
    },

    // --- Project notes ---
    'weather-llm': {
        title: 'WeatherMind',
        tags: ['#project', '#ml', '#python', '#featured'],
        links: ['skills', 'slu', 'about', 'linkhub'],
        content: `
            <h1>WeatherMind</h1>
            <div class="note-tags">
                <span class="note-tag">#project</span>
                <span class="note-tag">#ml</span>
                <span class="note-tag">#python</span>
                <span class="note-tag">#featured</span>
            </div>
            <div class="note-meta">
                <span class="meta-key">Status</span><span class="meta-value">Active</span>
                <span class="meta-key">Stack</span><span class="meta-value">Python, PyTorch, SQLite, Flask, NOAA Weather Data</span>
                <span class="meta-key">GitHub</span><span class="meta-value"><a href="https://github.com/linkhubinc1-sudo/weathermind" target="_blank">linkhubinc1-sudo/weathermind</a></span>
            </div>
            <p>A weather prediction system trained on real NOAA weather station data. Built the entire pipeline — data collection, database storage, feature engineering, model training, and a prediction API.</p>

            <h2>Architecture</h2>
            <pre>NOAA Station Data → SQLite DB → Feature Engineering → LSTM Model → Prediction API → Dashboard</pre>

            <h2>How it works</h2>
            <ol>
                <li><strong>Data ingestion</strong> — Pull historical weather data (temperature, humidity, pressure, wind speed, precipitation) from NOAA weather stations into a SQLite database</li>
                <li><strong>Feature engineering</strong> — Temporal features (hour, day, month cyclical encoding), rolling averages, pressure change rate, humidity-temperature interaction terms</li>
                <li><strong>Model</strong> — LSTM neural network that takes 24-hour windows and predicts next 6/12/24 hour conditions</li>
                <li><strong>API</strong> — Flask endpoint accepts station ID and returns predicted temperature, conditions, and confidence</li>
                <li><strong>Dashboard</strong> — Real-time visualization of predictions vs actuals with accuracy tracking</li>
            </ol>

            <div class="metric-row">
                <div class="metric-card">
                    <div class="value">2.1°F</div>
                    <div class="label">Avg Error (6hr)</div>
                </div>
                <div class="metric-card">
                    <div class="value">87%</div>
                    <div class="label">Condition Accuracy</div>
                </div>
                <div class="metric-card">
                    <div class="value">50k+</div>
                    <div class="label">Training Samples</div>
                </div>
                <div class="metric-card">
                    <div class="value">12</div>
                    <div class="label">Features</div>
                </div>
            </div>

            <h2>What I learned</h2>
            <ul>
                <li>Time series data requires careful feature engineering — cyclical encoding for hours/months was a game changer</li>
                <li>LSTM overfits fast on weather data without proper regularization (dropout + L2)</li>
                <li>Pressure change rate over 3 hours is the single most predictive feature for next-day conditions</li>
                <li>Building the full pipeline (not just the model) is what separates ML engineering from ML experimentation</li>
            </ul>

            <h2>Tech deep dive</h2>
            <ul>
                <li><strong>Database</strong> — SQLite with optimized indexes on station_id + timestamp. Batch inserts for historical data loading</li>
                <li><strong>Model</strong> — 2-layer LSTM (128 hidden units) with dropout 0.3, trained with Adam optimizer, MSE loss for temperature + cross-entropy for conditions</li>
                <li><strong>API</strong> — Flask with caching. Predictions cached for 30 min to avoid redundant inference</li>
                <li><strong>Evaluation</strong> — Rolling validation (no data leakage). Separate test set from most recent 30 days</li>
            </ul>

            <blockquote>The database + pipeline engineering was harder than the model itself. That's the real lesson — ML is 10% model, 90% data engineering.</blockquote>
        `
    },
    'linkhub': {
        title: 'LinkHub',
        tags: ['#project', '#saas', '#javascript', '#production'],
        links: ['skills', 'slu', 'about', 'weather-llm'],
        content: `
            <h1>LinkHub</h1>
            <div class="note-tags">
                <span class="note-tag">#project</span>
                <span class="note-tag">#saas</span>
                <span class="note-tag">#javascript</span>
                <span class="note-tag">#production</span>
            </div>
            <div class="note-meta">
                <span class="meta-key">Status</span><span class="meta-value">Live in Production</span>
                <span class="meta-key">Stack</span><span class="meta-value">Express.js, SQLite, Stripe, Puppeteer, Railway</span>
                <span class="meta-key">Live</span><span class="meta-value"><a href="https://linkhub-production-4cad.up.railway.app" target="_blank">linkhub-production-4cad.up.railway.app</a></span>
                <span class="meta-key">GitHub</span><span class="meta-value"><a href="https://github.com/linkhubinc1-sudo/linkhub" target="_blank">linkhubinc1-sudo/linkhub</a></span>
            </div>
            <p>Full-stack link-in-bio SaaS platform competing with Linktree. Built and deployed solo — no team, no funding, just execution.</p>

            <div class="metric-row">
                <div class="metric-card">
                    <div class="value">Live</div>
                    <div class="label">Production</div>
                </div>
                <div class="metric-card">
                    <div class="value">Stripe</div>
                    <div class="label">Payments</div>
                </div>
                <div class="metric-card">
                    <div class="value">Solo</div>
                    <div class="label">Developer</div>
                </div>
            </div>

            <h2>What it does</h2>
            <ul>
                <li>Customizable link-in-bio pages for creators and businesses</li>
                <li>Stripe subscription billing for premium features</li>
                <li>Admin dashboard with analytics and user management</li>
                <li>Automated lead generation pipeline</li>
                <li>Auto-deploys from master branch on Railway</li>
            </ul>

            <h2>What I learned</h2>
            <p>This project taught me more about real engineering than any textbook. Payment webhooks failing at midnight. Database migrations on a live system. Writing lead generation automation that actually converts.</p>
            <p>The gap between school projects and production software is enormous, and I crossed it.</p>
        `
    },

    // --- Skills ---
    'skills': {
        title: 'Technical Skills',
        tags: ['#skills', '#engineering'],
        links: ['about', 'weather-llm', 'linkhub', 'slu'],
        content: `
            <h1>Technical Skills</h1>
            <div class="note-tags">
                <span class="note-tag">#skills</span>
                <span class="note-tag">#engineering</span>
            </div>
            <h2>Systems Programming</h2>
            <div class="skill-row"><span class="name">C (C11)</span><div class="bar"><div class="fill fill-purple" style="width:90%"></div></div></div>
            <div class="skill-row"><span class="name">pthreads / Concurrency</span><div class="bar"><div class="fill fill-purple" style="width:85%"></div></div></div>
            <div class="skill-row"><span class="name">Memory Management</span><div class="bar"><div class="fill fill-purple" style="width:85%"></div></div></div>
            <div class="skill-row"><span class="name">Network Programming</span><div class="bar"><div class="fill fill-purple" style="width:80%"></div></div></div>
            <div class="skill-row"><span class="name">Linux / Unix</span><div class="bar"><div class="fill fill-purple" style="width:80%"></div></div></div>

            <h2>Backend & Web</h2>
            <div class="skill-row"><span class="name">JavaScript / Node.js</span><div class="bar"><div class="fill fill-blue" style="width:92%"></div></div></div>
            <div class="skill-row"><span class="name">Express.js / APIs</span><div class="bar"><div class="fill fill-blue" style="width:90%"></div></div></div>
            <div class="skill-row"><span class="name">Python / Flask</span><div class="bar"><div class="fill fill-blue" style="width:80%"></div></div></div>
            <div class="skill-row"><span class="name">HTML / CSS</span><div class="bar"><div class="fill fill-blue" style="width:88%"></div></div></div>
            <div class="skill-row"><span class="name">WebSockets</span><div class="bar"><div class="fill fill-blue" style="width:78%"></div></div></div>

            <h2>Data & ML</h2>
            <div class="skill-row"><span class="name">SQL / SQLite / PostgreSQL</span><div class="bar"><div class="fill fill-green" style="width:85%"></div></div></div>
            <div class="skill-row"><span class="name">Database Design</span><div class="bar"><div class="fill fill-green" style="width:80%"></div></div></div>
            <div class="skill-row"><span class="name">PyTorch</span><div class="bar"><div class="fill fill-green" style="width:72%"></div></div></div>
            <div class="skill-row"><span class="name">pandas / NumPy</span><div class="bar"><div class="fill fill-green" style="width:75%"></div></div></div>
            <div class="skill-row"><span class="name">Data Pipelines</span><div class="bar"><div class="fill fill-green" style="width:78%"></div></div></div>

            <h2>Tools & DevOps</h2>
            <div class="skill-row"><span class="name">Git / GitHub</span><div class="bar"><div class="fill fill-peach" style="width:90%"></div></div></div>
            <div class="skill-row"><span class="name">Docker</span><div class="bar"><div class="fill fill-peach" style="width:72%"></div></div></div>
            <div class="skill-row"><span class="name">GitHub Actions CI</span><div class="bar"><div class="fill fill-peach" style="width:75%"></div></div></div>
            <div class="skill-row"><span class="name">Valgrind / Debugging</span><div class="bar"><div class="fill fill-peach" style="width:80%"></div></div></div>
            <div class="skill-row"><span class="name">Wireshark / Networking</span><div class="bar"><div class="fill fill-peach" style="width:70%"></div></div></div>
        `
    },

    // --- Photography ---
    'photography': {
        title: 'Gallery',
        tags: ['#photography', '#creative'],
        links: ['creative-side', 'about'],
        content: `
            <h1>Photography</h1>
            <div class="note-tags">
                <span class="note-tag">#photography</span>
                <span class="note-tag">#creative</span>
            </div>
            <p>Shot on Sony a6400. Edited in DaVinci Resolve. I believe great engineering and great visuals share the same DNA — attention to detail.</p>
            <div class="note-meta">
                <span class="meta-key">Camera</span><span class="meta-value">Sony a6400</span>
                <span class="meta-key">Lens</span><span class="meta-value">Sigma 30mm f/1.4</span>
                <span class="meta-key">Edit</span><span class="meta-value">DaVinci Resolve</span>
            </div>
            <div class="photo-grid">
                <div class="photo-slot tall">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span>Drop photo here</span>
                </div>
                <div class="photo-slot">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span>Drop photo here</span>
                </div>
                <div class="photo-slot">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span>Drop photo here</span>
                </div>
                <div class="photo-slot wide">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span>Drop photo here</span>
                </div>
                <div class="photo-slot">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span>Drop photo here</span>
                </div>
                <div class="photo-slot">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span>Drop photo here</span>
                </div>
            </div>
            <p>More on <span class="internal-link" onclick="openNote('creative-side')">the creative side</span>.</p>
        `
    },

    // --- Contact ---
    'contact': {
        title: 'Get in Touch',
        tags: ['#contact'],
        links: ['about', 'whats-next'],
        content: `
            <h1>Get in Touch</h1>
            <div class="note-tags">
                <span class="note-tag">#contact</span>
            </div>
            <p>I'm actively looking for engineering internships. Whether you have an opportunity, a question, or just want to connect — reach out.</p>
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
