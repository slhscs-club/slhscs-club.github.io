<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
</script>

<svelte:head>
  <title>Join | SLHS CS Club</title>
  <meta name="description" content="Join the Seven Lakes High School Computer Science Club - no experience required." />
</svelte:head>

<Shell activePage="join">
  <section class="section join-hero">
    <div class="container">
      <h1 class="page-title">Join the Club</h1>
      <p class="page-subtitle">Anyone can join. No sign-ups, fees, or experience necessary.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">General Membership</h2>
      <p>
        Our club is open to <b>anyone</b> (seven lakes student) who wants to attend our meetings. No sign up is required and we don't keep a list of members.
      </p>
      <p>Here's what you get as a general member:</p>
      <div class="benefits-grid">
        <div class="benefit-card color-orange">
          <i class="fa-solid fa-chalkboard"></i>
          <h3>Weekly Presentations</h3>
          <p>Learn about algorithms, web dev, game dev, and more from fellow students.</p>
        </div>
        <div class="benefit-card color-orange">
          <i class="fa-solid fa-code"></i>
          <h3>CP Practice</h3>
          <p>Weekly competitive programming sessions to sharpen your problem-solving skills.</p>
        </div>
        <div class="benefit-card color-orange">
          <i class="fa-solid fa-trophy"></i>
          <h3>Contests</h3>
          <p>Participate in local and national programming competitions throughout the year.</p>
        </div>
        <div class="benefit-card color-orange">
          <i class="fa-solid fa-users"></i>
          <h3>Community</h3>
          <p>Connect with other students who share your interest in computer science.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section cshs-band">
    <div class="container">
      <h2 class="section-title">Computer Science Honor Society (CSHS)</h2>
      <p>
        Getting inducted into an Honor Society is a great way to distinguish yourself in the CS community and show your dedication to your college.
      </p>

      <div class="requirements-card">
        <h3>Requirements for Induction</h3>
        <ul>
          <li><i class="fa-solid fa-check"></i> Volunteer 8 hours towards our club</li>
          <li><i class="fa-solid fa-check"></i> Pay a fee to support the club on Pay n Go under Computer Science Club</li>
          <li><i class="fa-solid fa-check"></i> Fill out the registration Google Form</li>
        </ul>
      </div>

      <div class="signup-card">
        <div class="signup-form-box" onclick={() => window.open('https://docs.google.com/forms/d/1nAdEFvx7bZLTwxFghEFViQXVbj23Wuxx6M3MFcdE9Yg/viewform?pli=1&pli=1&edit_requested=true', '_blank')} onkeydown={(e) => e.key === 'Enter' && window.open('...', '_blank')} role="button" tabindex="0">
          <i class="fa-solid fa-file-lines"></i>
          <h3>Register for CSHS</h3>
          <p>Click to open the Google Form</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container cta-card color-orange">
      <h2 class="section-title">Ready to join?</h2>
      <p class="section-lead">Come to Room 1001 on Monday at 2:45 PM or join our Discord to stay connected.</p>
      <div class="cta-actions">
        <a class="btn btn-primary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a>
        <a class="btn btn-secondary" href="/"><i class="fa-solid fa-house"></i> Back Home</a>
      </div>
    </div>
  </section>
</Shell>

<style>
  .join-hero {
    text-align: center;
    padding: 6rem 0 2rem;
  }

  .join-hero .page-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 2rem;
  }

  .benefit-card {
    padding: 1.5rem;
    border: 3px solid var(--accent, var(--color-orange));
    background: var(--accent, var(--color-surface));
    color: var(--accent-text, var(--color-white));
    text-align: center;
  }

  .benefit-card i {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .benefit-card h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }

  .benefit-card p {
    margin: 0;
    opacity: 0.9;
    font-size: 0.9rem;
  }

  .cshs-band {
    border-top: 3px solid var(--color-orange);
    border-bottom: 3px solid var(--color-orange);
    background: rgba(255, 255, 255, 0.02);
  }

  .requirements-card {
    padding: 1.5rem;
    margin-top: 1.5rem;
    border: 3px solid var(--color-orange);
    background: var(--color-orange);
    color: var(--color-black);
  }

  .requirements-card h3 {
    margin: 0 0 1rem;
  }

  .requirements-card ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.75rem;
  }

  .requirements-card li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
  }

  .requirements-card i {
    color: var(--color-black);
  }

  .signup-card {
    margin-top: 2rem;
    text-align: center;
  }

  .signup-form-box {
    display: grid;
    place-items: center;
    gap: 0.75rem;
    padding: 2.5rem;
    border: 3px solid var(--color-orange);
    background: var(--color-surface);
    box-shadow: var(--orange-shadow);
    cursor: pointer;
    transition: transform 0.15s var(--ease-hover), box-shadow 0.15s var(--ease-hover);
    max-width: 400px;
    margin: 0 auto;
  }

  .signup-form-box:hover {
    transform: translate(-4px, -4px);
    box-shadow: var(--orange-shadow-hover);
  }

  .signup-form-box i {
    font-size: 4rem;
    color: var(--color-orange);
  }

  .signup-form-box h3 {
    margin: 0;
  }

  .signup-form-box p {
    margin: 0;
    color: var(--color-text-muted);
  }

  .cta-card {
    padding: 2.4rem;
    text-align: center;
    background: var(--color-surface);
  }

  .cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .cta-card .section-title,
  .cta-card .section-lead {
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 1024px) {
    .benefits-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .benefits-grid {
      grid-template-columns: 1fr;
    }
  }
</style>