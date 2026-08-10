<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
</script>

<svelte:head>
  <title>Competitive Programming | SLHS CS Club</title>
  <meta name="description" content="Competitive programming practice and contests at Seven Lakes High School." />
</svelte:head>

<Shell activePage="">
  <div class="cp-root">
    <div class="cp-terminal">
      <div class="cp-bar">
        <span class="cp-dot dot-red"></span>
        <span class="cp-dot dot-yellow"></span>
        <span class="cp-dot dot-green"></span>
        <span class="cp-title">slhscs — cp — bash</span>
      </div>
      <div class="cp-body">
        <div class="cp-line">
          <span class="cp-prompt">~/competitive-programming $ </span>
          <span class="cp-cmd">whoami</span>
        </div>
        <div class="cp-output">SLHS Competitive Programming &mdash; we train, compete, and win.</div>

        <div class="cp-line">
          <span class="cp-prompt">~/competitive-programming $ </span>
          <span class="cp-cmd">cat schedule.txt</span>
        </div>
        <div class="cp-output">
          <div class="cp-block">
            <span class="cp-key">Practices:</span>
            <span class="cp-val">Weekly sessions &mdash; work through problems together, review solutions, and prepare for upcoming contests.</span>
          </div>
          <div class="cp-block">
            <span class="cp-key">Contests:</span>
            <span class="cp-val">UIL CS, HPE CodeWars, USACO, and local invitational meets throughout the year.</span>
          </div>
          <div class="cp-block">
            <span class="cp-key">Format:</span>
            <span class="cp-val">Teams of three program on one machine to solve a packet of problems.</span>
          </div>
        </div>

        <div class="cp-line">
          <span class="cp-prompt">~/competitive-programming $ </span>
          <span class="cp-cmd">cat get-involved.md</span>
        </div>
        <div class="cp-output">
          <div class="cp-block">
            <span class="cp-key">Join:</span>
            <span class="cp-val">Show up to a Monday meeting or hop in the Discord. No experience required &mdash; we teach as we go.</span>
          </div>
          <div class="cp-block">
            <span class="cp-key">Resources:</span>
            <span class="cp-val">Practice problems, past contest archives, and strategy guides will be posted here.</span>
          </div>
        </div>

        <div class="cp-line cp-cursor">
          <span class="cp-prompt">~/competitive-programming $ </span>
          <span class="cp-cmd"></span>
          <span class="cp-blink">&#9608;</span>
        </div>
      </div>
    </div>
  </div>
</Shell>

<style>
  :global(body) { background: #0a0e14; }

  .cp-root {
    min-height: calc(100vh - 12rem);
    display: grid;
    place-items: center;
    padding: 2rem 1rem;
    font-family: 'IBM Plex Mono', 'SF Mono', 'Fira Code', monospace;
  }

  .cp-terminal {
    width: min(780px, 100%);
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 0 40px rgba(0, 200, 100, 0.08);
  }

  .cp-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: #161b22;
    border-bottom: 1px solid #30363d;
  }

  .cp-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .dot-red    { background: #ff5f56; }
  .dot-yellow { background: #ffbd2e; }
  .dot-green  { background: #27c93f; }

  .cp-title {
    margin-left: 8px;
    font-size: 0.75rem;
    color: #8b949e;
    letter-spacing: 0.04em;
  }

  .cp-body {
    padding: 20px 22px 24px;
    display: grid;
    gap: 10px;
  }

  .cp-line { display: flex; flex-wrap: wrap; align-items: center; gap: 2px; }

  .cp-prompt { color: #58a6ff; font-size: 0.82rem; }
  .cp-cmd   { color: #e6edf3; font-size: 0.82rem; }

  .cp-output {
    color: #8b949e;
    font-size: 0.82rem;
    line-height: 1.6;
    padding-left: 4px;
    border-left: 2px solid #21262d;
    margin: 2px 0 8px 8px;
    display: grid;
    gap: 6px;
  }

  .cp-block { display: flex; flex-wrap: wrap; gap: 6px; }
  .cp-key { color: #d2a8ff; font-weight: 600; }
  .cp-val { color: #7ee787; }

  .cp-blink {
    color: #58a6ff;
    animation: cp-blink 1s step-end infinite;
  }

  @keyframes cp-blink {
    50% { opacity: 0; }
  }
</style>
