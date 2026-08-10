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
      <div class="cshs-shield">
        <i class="fa-solid fa-award"></i>
      </div>
      <h1>Computer Science Honor Society</h1>
      <p>Distinguish yourself. Lead. Serve.</p>
    </div>

    <div class="cshs-grid">
      <div class="cshs-card card-course">
        <span class="cshs-num">I</span>
        <h2>Academic Standing</h2>
        <p>Be enrolled in a computer science course each semester and maintain a grade of <strong>B or higher</strong>.</p>
      </div>

      <div class="cshs-card card-fee">
        <span class="cshs-num">II</span>
        <h2>Membership Fee</h2>
        <p>Pay the annual fee through <strong>Pay n Go</strong> under Computer Science Club.</p>
      </div>

      <div class="cshs-card card-form">
        <span class="cshs-num">III</span>
        <h2>Registration</h2>
        <p>Complete the official registration form with accurate information.</p>
      </div>

      <div class="cshs-card card-vol">
        <span class="cshs-num">IV</span>
        <h2>Point-Based Volunteering</h2>
        <p>Earn points across <strong>service</strong>, <strong>leadership</strong>, and <strong>participation</strong> categories.</p>
        <div class="cshs-stub">Full breakdown coming soon &mdash; check with an officer.</div>
      </div>
    </div>

    <div class="cshs-quote">
      <i class="fa-solid fa-quote-left"></i>
      <span>Induction into an Honor Society is a mark of dedication that colleges and scholarship committees recognize.</span>
    </div>
  </div>

  <CTACard title="Apply for Induction" lead="Ready to join the Honor Society? Fill out the form and get started.">
    <a class="btn btn-primary" href="/join"><i class="fa-solid fa-file-lines"></i> Register for CSHS</a>
    <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Ask on Discord</a>
  </CTACard>
</Shell>

<style>
  :global(body) { background: #0d0b0a; }

  .cshs-root {
    padding: 3rem 1rem 1rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .cshs-banner {
    text-align: center;
    padding: 3rem 0 2rem;
    border-bottom: 1px solid rgba(255, 180, 40, 0.2);
    margin-bottom: 2.5rem;
  }

  .cshs-shield {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.2rem;
    border: 2px solid #c9a84c;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, rgba(201, 168, 76, 0.15), rgba(201, 168, 76, 0.04));
  }

  .cshs-shield i {
    font-size: 2.2rem;
    color: #c9a84c;
  }

  .cshs-banner h1 {
    margin: 0;
    font-family: 'IBM Plex Mono', 'SF Mono', monospace;
    font-size: clamp(2rem, 4vw, 3rem);
    color: #f5e6c8;
    letter-spacing: 0.02em;
  }

  .cshs-banner p {
    margin: 0.5rem 0 0;
    color: #c9a84c;
    font-size: 0.9rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 600;
  }

  .cshs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }

  .cshs-card {
    padding: 1.8rem;
    background: #161310;
    border: 1px solid rgba(201, 168, 76, 0.18);
    border-top: 3px solid #c9a84c;
    position: relative;
  }

  .cshs-num {
    position: absolute;
    top: 1.2rem;
    right: 1.4rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    color: rgba(201, 168, 76, 0.5);
    letter-spacing: 0.1em;
  }

  .cshs-card h2 {
    margin: 0 0 0.6rem;
    font-size: 1.15rem;
    font-family: 'IBM Plex Mono', monospace;
    color: #e8d5a3;
    letter-spacing: 0.02em;
  }

  .cshs-card p {
    margin: 0;
    color: #9d9488;
    line-height: 1.5;
    font-size: 0.9rem;
  }

  .cshs-card strong {
    color: #c9a84c;
  }

  .cshs-stub {
    margin-top: 1rem;
    padding: 0.5rem 0.7rem;
    background: rgba(201, 168, 76, 0.08);
    border-left: 2px solid #c9a84c;
    color: #c9a84c;
    font-size: 0.78rem;
    font-style: italic;
  }

  .cshs-quote {
    display: flex;
    gap: 1rem;
    padding: 2rem 1.5rem;
    margin-top: 2rem;
    background: linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(201, 168, 76, 0.02));
    border: 1px solid rgba(201, 168, 76, 0.15);
    color: #a3916a;
    font-style: italic;
    line-height: 1.6;
  }

  .cshs-quote i {
    font-size: 1.5rem;
    color: #c9a84c;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    .cshs-grid { grid-template-columns: 1fr; }
  }
</style>
