<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
</script>

<svelte:head>
  <title>CS Honor Society | SLHS CS Club</title>
  <meta name="description" content="Computer Science Honor Society &mdash; requirements, induction, and point-based volunteering." />
</svelte:head>

<Shell activePage="">
  <div class="cshs-root">
    <div class="cshs-banner">
      <div class="cshs-crest">
        <i class="fa-solid fa-award"></i>
      </div>
      <span class="cshs-tag">CSHS</span>
      <h1>Computer Science<br />Honor Society</h1>
      <p>Distinguish yourself. Lead. Serve.</p>
    </div>

    <div class="cshs-requirements">
      <div class="cshs-req">
        <div class="cshs-req-num">I</div>
        <div class="cshs-req-body">
          <h3>Academic Standing</h3>
          <p>Be enrolled in a computer science course each semester and maintain a grade of <em>B or higher</em>.</p>
        </div>
      </div>

      <div class="cshs-req">
        <div class="cshs-req-num">II</div>
        <div class="cshs-req-body">
          <h3>Membership Fee</h3>
          <p>Pay the annual dues through <em>Pay n Go</em> under Computer Science Club.</p>
        </div>
      </div>

      <div class="cshs-req">
        <div class="cshs-req-num">III</div>
        <div class="cshs-req-body">
          <h3>Registration</h3>
          <p>Complete the official Google Form with accurate information.</p>
        </div>
      </div>

      <div class="cshs-req">
        <div class="cshs-req-num">IV</div>
        <div class="cshs-req-body">
          <h3>Volunteering Points</h3>
          <p>Earn points across <em>service</em>, <em>leadership</em>, and <em>participation</em> categories throughout the year.</p>
          <div class="cshs-req-note">Point breakdown and tracking coming soon &mdash; ask an officer for details.</div>
        </div>
      </div>
    </div>

    <div class="cshs-motto">
      <div class="cshs-motto-line"></div>
      <span>Induction is a mark of dedication recognized by colleges and scholarship committees nationwide.</span>
      <div class="cshs-motto-line"></div>
    </div>
  </div>

  <CTACard title="Apply for Induction" lead="Ready to join the Honor Society? Fill out the form and get started.">
    <a class="btn btn-primary" href="/join"><i class="fa-solid fa-file-lines"></i> Register for CSHS</a>
    <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Ask on Discord</a>
  </CTACard>
</Shell>

<style>
  :global(html) { background: #16100e; }
  :global(body) { background: #16100e; }

  .cshs-root {
    max-width: 780px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 2rem;
  }

  .cshs-banner {
    text-align: center;
    padding: 0 0 3rem;
    border-bottom: 2px solid rgba(196, 162, 72, 0.18);
    margin-bottom: 2.5rem;
  }

  .cshs-crest {
    width: 90px;
    height: 90px;
    margin: 0 auto 1.2rem;
    border: 3px solid #b8943a;
    display: grid;
    place-items: center;
    background: linear-gradient(145deg, rgba(184, 148, 58, 0.2), rgba(184, 148, 58, 0.05));
  }

  .cshs-crest i {
    font-size: 2.4rem;
    color: #d4af37;
  }

  .cshs-tag {
    display: inline-block;
    padding: 0.2rem 0.7rem;
    border: 1px solid rgba(196, 162, 72, 0.35);
    color: #c4a248;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    margin-bottom: 1rem;
  }

  .cshs-banner h1 {
    margin: 0 0 0.5rem;
    font-family: 'IBM Plex Mono', 'SF Mono', monospace;
    font-size: clamp(2.2rem, 4vw, 3.4rem);
    line-height: 1.1;
    color: #e8d8b0;
    letter-spacing: 0.01em;
  }

  .cshs-banner p {
    margin: 0;
    color: #b8943a;
    font-size: 0.85rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .cshs-requirements {
    display: grid;
    gap: 0.8rem;
  }

  .cshs-req {
    display: grid;
    grid-template-columns: 3.5rem 1fr;
    gap: 1.2rem;
    padding: 1.5rem 1.6rem;
    background: #1c1511;
    border: 1px solid rgba(184, 148, 58, 0.14);
    border-left: 4px solid #b8943a;
    align-items: start;
  }

  .cshs-req-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.5rem;
    color: #b8943a;
    font-weight: 700;
    line-height: 1;
    padding-top: 0.1rem;
  }

  .cshs-req-body h3 {
    margin: 0 0 0.3rem;
    font-size: 1.1rem;
    color: #d9cfa6;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.02em;
  }

  .cshs-req-body p {
    margin: 0;
    color: #a69572;
    line-height: 1.5;
    font-size: 0.88rem;
  }

  .cshs-req-body em {
    color: #d4af37;
    font-style: normal;
    font-weight: 600;
  }

  .cshs-req-note {
    margin-top: 0.8rem;
    padding: 0.5rem 0.8rem;
    background: rgba(184, 148, 58, 0.07);
    border-left: 2px solid #b8943a;
    color: #b8943a;
    font-size: 0.76rem;
    line-height: 1.4;
  }

  .cshs-motto {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 2rem 0;
    margin-top: 1rem;
    color: #6b5f47;
    font-style: italic;
    font-size: 0.88rem;
    text-align: center;
    line-height: 1.5;
  }

  .cshs-motto-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(184, 148, 58, 0.2), transparent);
  }

  @media (max-width: 500px) {
    .cshs-req { grid-template-columns: 1fr; gap: 0.4rem; }
    .cshs-req-num { font-size: 1rem; }
  }
</style>
