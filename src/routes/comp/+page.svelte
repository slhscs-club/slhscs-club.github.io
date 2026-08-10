<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
</script>

<svelte:head>
  <title>Competitive Programming | SLHS CS Club</title>
  <meta name="description" content="Competitive programming practice and contests at Seven Lakes High School." />
</svelte:head>

<Shell activePage="">
  <div class="comp-root">
    <div class="comp-hero">
      <span class="comp-mono">{"{ comp }"}</span>
      <h1>Competitive<br />Programming</h1>
      <p>Train. Compete. Win.</p>
    </div>

    <div class="comp-panels">
      <div class="comp-panel">
        <div class="comp-panel-head">
          <i class="fa-solid fa-calendar-days"></i> Schedule
        </div>
        <div class="comp-panel-body">
          <div class="comp-row"><span class="comp-label">Practices</span><span class="comp-val">Weekly &mdash; work through problem sets, review solutions</span></div>
          <div class="comp-row"><span class="comp-label">Season</span><span class="comp-val">August through May</span></div>
          <div class="comp-row"><span class="comp-label">Room</span><span class="comp-val">1001 or TBA on Discord</span></div>
        </div>
      </div>

      <div class="comp-panel">
        <div class="comp-panel-head">
          <i class="fa-solid fa-trophy"></i> Contests
        </div>
        <div class="comp-panel-body">
          <div class="comp-row"><span class="comp-label">UIL CS</span><span class="comp-val">Seven Lakes Invitational &middot; District &middot; Region &middot; State</span></div>
          <div class="comp-row"><span class="comp-label">HPE CodeWars</span><span class="comp-val">Annual spring contest hosted by Hewlett Packard Enterprise</span></div>
          <div class="comp-row"><span class="comp-label">USACO</span><span class="comp-val">USA Computing Olympiad &mdash; year-round online</span></div>
          <div class="comp-row"><span class="comp-label">Local Meets</span><span class="comp-val">Taylor &middot; Clements &middot; Cy Woods &middot; Tompkins</span></div>
        </div>
      </div>

      <div class="comp-panel">
        <div class="comp-panel-head">
          <i class="fa-solid fa-laptop-code"></i> Format
        </div>
        <div class="comp-panel-body">
          <div class="comp-row"><span class="comp-label">Teams</span><span class="comp-val">Three students per machine</span></div>
          <div class="comp-row"><span class="comp-label">Problems</span><span class="comp-val">Algorithmic + data structure challenges in Java or C++</span></div>
          <div class="comp-row"><span class="comp-label">Scoring</span><span class="comp-val">Correctness + speed; penalties for incorrect submissions</span></div>
        </div>
      </div>

      <div class="comp-panel">
        <div class="comp-panel-head">
          <i class="fa-solid fa-circle-nodes"></i> Resources
        </div>
        <div class="comp-panel-body">
          <div class="comp-row"><span class="comp-label">Practice</span><span class="comp-val">Problems, past contests, and walkthroughs posted here soon.</span></div>
          <div class="comp-row"><span class="comp-label">Discord</span><span class="comp-val">Join #comp-prog for session announcements and resources.</span></div>
        </div>
      </div>
    </div>
  </div>

  <CTACard title="Jump In" lead="No experience required. Come to a practice, join Discord, or talk to the CP lead.">
    <a class="btn btn-primary" href="/calendar"><i class="fa-solid fa-calendar-days"></i> See Schedule</a>
    <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a>
  </CTACard>
</Shell>

<style>
  :global(html) { background: #0c1117; }
  :global(body) { background: #0c1117; }

  .comp-root {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 1.5rem 2rem;
    font-family: 'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace;
  }

  .comp-hero {
    text-align: center;
    padding: 3rem 0 2.5rem;
    border-bottom: 2px solid #1b2636;
    margin-bottom: 2.5rem;
  }

  .comp-mono {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    background: #17202d;
    border: 1px solid #2d4a6b;
    color: #4da6ff;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    margin-bottom: 1rem;
    border-radius: 3px;
  }

  .comp-hero h1 {
    margin: 0 0 0.6rem;
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.1;
    color: #e8edf2;
    letter-spacing: -0.02em;
  }

  .comp-hero p {
    margin: 0;
    color: #4da6ff;
    font-size: 0.9rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .comp-panels {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .comp-panel {
    background: #111923;
    border: 1px solid #1b2939;
    border-radius: 4px;
    overflow: hidden;
  }

  .comp-panel-head {
    padding: 0.85rem 1.1rem;
    background: #151f2d;
    border-bottom: 1px solid #1b2939;
    font-size: 0.85rem;
    font-weight: 700;
    color: #e0e6ed;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    letter-spacing: 0.02em;
  }

  .comp-panel-head i {
    color: #4da6ff;
    font-size: 0.9rem;
  }

  .comp-panel-body {
    padding: 1rem 1.1rem;
    display: grid;
    gap: 0.85rem;
  }

  .comp-row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 0.75rem;
    align-items: start;
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .comp-label {
    color: #4da6ff;
    font-weight: 600;
  }

  .comp-val {
    color: #bcc5d1;
  }

  @media (max-width: 640px) {
    .comp-panels { grid-template-columns: 1fr; }
    .comp-row { grid-template-columns: 1fr; gap: 0.15rem; }
    .comp-hero h1 { font-size: 2rem; }
  }
</style>
