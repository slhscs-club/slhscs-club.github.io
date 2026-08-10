<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
</script>

<svelte:head>
  <title>Competitive Programming | SLHS CS Club</title>
  <meta name="description" content="Competitive programming practice and contests at Seven Lakes High School." />
</svelte:head>

<Shell activePage="">
  <div class="ide-root">
    <div class="ide-hero">
      <span class="ide-badge">{'{ comp }'}</span>
      <h1>Competitive<br />Programming</h1>
      <p>Train. Compete. Win.</p>
    </div>

    <div class="ide-grid">
      <div class="ide-panel">
        <div class="ide-panel-hd">
          <span class="ide-dot dot-blue"></span><span class="ide-dot dot-blue"></span><span class="ide-dot dot-blue"></span>
          <span class="ide-panel-lbl">schedule.json</span>
        </div>
        <div class="ide-panel-bd">
          <div class="ide-row"><span class="ide-prop">practices</span><span class="ide-punc">:</span> <span class="ide-str">Weekly problem sets, review, and team drills</span></div>
          <div class="ide-row"><span class="ide-prop">season</span><span class="ide-punc">:</span> <span class="ide-str">August through May</span></div>
          <div class="ide-row"><span class="ide-prop">room</span><span class="ide-punc">:</span> <span class="ide-str">Room 1001 or check Discord</span></div>
        </div>
      </div>

      <div class="ide-panel">
        <div class="ide-panel-hd">
          <span class="ide-dot dot-cyan"></span><span class="ide-dot dot-cyan"></span><span class="ide-dot dot-cyan"></span>
          <span class="ide-panel-lbl">contests.ts</span>
        </div>
        <div class="ide-panel-bd">
          <div class="ide-row ide-indent"><span class="ide-prop">uil</span><span class="ide-punc">:</span> <span class="ide-str">SLHS Invitational, District, Region, State</span></div>
          <div class="ide-row ide-indent"><span class="ide-prop">codewars</span><span class="ide-punc">:</span> <span class="ide-str">HPE CodeWars, annual spring contest</span></div>
          <div class="ide-row ide-indent"><span class="ide-prop">usaco</span><span class="ide-punc">:</span> <span class="ide-str">Year-round online, bronze to platinum</span></div>
          <div class="ide-row ide-indent"><span class="ide-prop">local</span><span class="ide-punc">:</span> <span class="ide-str">Taylor, Clements, Cy Woods, Tompkins</span></div>
        </div>
      </div>

      <div class="ide-panel ide-panel-wide">
        <div class="ide-panel-hd">
          <span class="ide-dot dot-teal"></span><span class="ide-dot dot-teal"></span><span class="ide-dot dot-teal"></span>
          <span class="ide-panel-lbl">format.md</span>
        </div>
        <div class="ide-panel-bd ide-panel-bd-cols">
          <div>
            <div class="ide-row"><span class="ide-h"># Teams</span></div>
            <div class="ide-row"><span class="ide-c">Three students per machine, single computer.</span></div>
            <div class="ide-row"><span class="ide-h"># Languages</span></div>
            <div class="ide-row"><span class="ide-c">Java and C++.</span></div>
          </div>
          <div>
            <div class="ide-row"><span class="ide-h"># Problems</span></div>
            <div class="ide-row"><span class="ide-c">Algorithmic and data structure challenges.</span></div>
            <div class="ide-row"><span class="ide-h"># Scoring</span></div>
            <div class="ide-row"><span class="ide-c">Correctness and speed. Penalties for incorrect solutions.</span></div>
          </div>
        </div>
      </div>

      <div class="ide-panel">
        <div class="ide-panel-hd">
          <span class="ide-dot dot-green"></span><span class="ide-dot dot-green"></span><span class="ide-dot dot-green"></span>
          <span class="ide-panel-lbl">resources.txt</span>
        </div>
        <div class="ide-panel-bd">
          <div class="ide-row"><span class="ide-prop">discord</span><span class="ide-punc">:</span> <span class="ide-str">Join #comp-prog for announcements</span></div>
          <div class="ide-row"><span class="ide-prop">practice</span><span class="ide-punc">:</span> <span class="ide-str">Problem sets, past contests, walkthroughs coming soon</span></div>
        </div>
      </div>
    </div>

    <div class="ide-cta">
      <div class="ide-cta-hd">
        <span class="ide-dot dot-blue"></span><span class="ide-dot dot-yellow"></span><span class="ide-dot dot-green"></span>
        <span class="ide-panel-lbl">get-involved.sh</span>
      </div>
      <div class="ide-cta-bd">
        <div class="ide-row"><span class="ide-c">// No experience required. Show up to a practice, join Discord, or talk to the CP lead.</span></div>
        <div class="ide-cta-acts">
          <a class="btn btn-primary" href="/calendar"><i class="fa-solid fa-calendar-days"></i> Schedule</a>
          <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Discord</a>
        </div>
      </div>
    </div>
  </div>
</Shell>

<style>
  :global(html), :global(body) { background: #0b1016; }
  :global(.sticky-top) { backdrop-filter: none; }
  :global(header) {
    background: rgba(11,16,22,0.94);
    border-bottom: 2px solid #1e2d3d;
  }
  :global(header a), :global(header i), :global(header button),
  :global(header .logo) { color: #c8d6e5 !important; }
  :global(header .join-btn) {
    background: #4da6ff;
    border-color: #4da6ff;
    color: #0b1016 !important;
  }
  :global(header .icon-btn) {
    border-color: #1e2d3d;
    background: #111b26;
  }
  :global(.nav-indicator) { background: #4da6ff; }
  :global(.footer-wrap) {
    background: #0d131c;
    border-top: 2px solid #1e2d3d;
  }
  :global(.footer-wrap::before) { display: none; }
  :global(footer .footer-brand) { color: #c8d6e5; }
  :global(footer .footer-links a) { color: #5a7a9a; }
  :global(footer .footer-links a:hover) { color: #4da6ff; }
  :global(.btn-primary) {
    background: #4da6ff;
    border-color: #4da6ff;
    color: #0b1016 !important;
    box-shadow: 4px 4px 0 rgba(77,166,255,0.3);
  }
  :global(.btn-primary:hover) {
    transform: translate(-3px,-3px);
    box-shadow: 6px 6px 0 rgba(77,166,255,0.4);
  }
  :global(.btn-secondary) {
    border-color: #2d4a6b;
    color: #8bb4d4;
    box-shadow: 4px 4px 0 rgba(45,74,107,0.4);
  }
  :global(.btn-secondary:hover) {
    background: #152232;
    color: #4da6ff;
    border-color: #4da6ff;
    box-shadow: 6px 6px 0 rgba(77,166,255,0.3);
  }

  .ide-root {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;
    font-family: 'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace;
    color: #bcc5d1;
  }

  .ide-hero {
    text-align: center;
    padding: 3rem 0 2rem;
    border-bottom: 2px solid #1b2939;
    margin-bottom: 2rem;
  }
  .ide-badge {
    display: inline-block;
    padding: 0.15rem 0.6rem;
    background: #151f2d;
    border: 1px solid #2d4a6b;
    color: #4da6ff;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    margin-bottom: 1rem;
    border-radius: 3px;
  }
  .ide-hero h1 {
    margin: 0 0 0.5rem;
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    line-height: 1.05;
    color: #e8edf2;
    letter-spacing: -0.02em;
  }
  .ide-hero p {
    margin: 0;
    color: #4da6ff;
    font-size: 0.82rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .ide-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .ide-panel-wide { grid-column: 1 / -1; }

  .ide-panel {
    background: #0f1620;
    border: 1px solid #1b2939;
    border-radius: 4px;
    overflow: hidden;
  }
  .ide-panel-hd {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 12px;
    background: #131c28;
    border-bottom: 1px solid #1b2939;
  }
  .ide-dot { width: 9px; height: 9px; border-radius: 50%; }
  .dot-blue   { background: #4da6ff; }
  .dot-cyan   { background: #32cfff; }
  .dot-teal   { background: #30d5a0; }
  .dot-green  { background: #50fa7b; }
  .dot-yellow { background: #ffbd2e; }

  .ide-panel-lbl {
    margin-left: 6px;
    font-size: 0.68rem;
    color: #506882;
    letter-spacing: 0.04em;
  }
  .ide-panel-bd {
    padding: 1rem 1.1rem;
    display: grid;
    gap: 0.5rem;
    font-size: 0.8rem;
    line-height: 1.6;
  }
  .ide-panel-bd-cols { grid-template-columns: 1fr 1fr; }
  .ide-row { display: flex; flex-wrap: wrap; gap: 2px; }
  .ide-indent { padding-left: 1.2rem; }

  .ide-prop  { color: #82aaff; }
  .ide-str   { color: #c3e88d; }
  .ide-punc  { color: #7986a0; }
  .ide-h     { color: #c792ea; font-weight: 700; }
  .ide-c     { color: #546e7a; font-style: italic; }

  .ide-cta { margin-top: 1.5rem; }
  .ide-cta-hd {
    display: flex; align-items: center; gap: 6px;
    padding: 9px 12px;
    background: #131c28;
    border: 1px solid #1b2939;
    border-radius: 4px 4px 0 0;
    border-bottom: none;
  }
  .ide-cta-bd {
    background: #0f1620;
    border: 1px solid #1b2939;
    border-top: none;
    border-radius: 0 0 4px 4px;
    padding: 1.2rem 1.1rem;
    display: grid;
    gap: 1rem;
  }
  .ide-cta-acts { display: flex; gap: 1rem; flex-wrap: wrap; }

  @media (max-width: 640px) {
    .ide-grid { grid-template-columns: 1fr; }
    .ide-panel-bd-cols { grid-template-columns: 1fr; }
    .ide-hero h1 { font-size: 2rem; }
  }
</style>
