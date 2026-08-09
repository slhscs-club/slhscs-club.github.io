<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import CTACard from '$lib/components/CTACard.svelte';

  const opportunities = [
    {
      title: 'Build your portfolio',
      description: 'Work with other students on club projects, contribute to the site, and turn your ideas into something you can share.'
    },
    {
      title: 'Lead and volunteer',
      description: 'Help organize meetings, mentor newer members, support events, and build the service hours needed for Honor Society.'
    },
    {
      title: 'Compete and create',
      description: 'Try competitive programming, write problems for our annual contest, or start a subclub around an area you care about.'
    }
  ];
</script>

<svelte:head>
  <title>Opportunities | SLHS CS Club</title>
  <meta name="description" content="Ways to build, lead, volunteer, and compete with the Seven Lakes High School Computer Science Club." />
</svelte:head>

<Shell activePage="opportunities">
  <PageHero title="Opportunities" subtitle="Find a way to build skills, contribute to the club, and make the experience your own." />

  <section class="section">
    <div class="container opportunities-grid">
      {#each opportunities as opportunity, index}
        <article class="opportunity-card">
          <span class="opportunity-number">0{index + 1}</span>
          <h2>{opportunity.title}</h2>
          <p>{opportunity.description}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="section details-band">
    <div class="container details-grid">
      <div>
        <h2 class="section-title">Start something new</h2>
        <p class="section-lead">Have an idea for a workshop, social, project, or subclub? Bring it to a meeting. The club is designed to grow with its members.</p>
      </div>
      <a class="btn btn-primary" href="/join"><i class="fa-solid fa-user-plus"></i> Get involved</a>
    </div>
  </section>

  <CTACard title="Ready to participate?" lead="Come by on Monday, join the Discord, or talk to an officer about where to begin.">
    <a class="btn btn-primary" href="/join"><i class="fa-solid fa-user-plus"></i> Join the Club</a>
    <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a>
  </CTACard>
</Shell>

<style>
  .opportunities-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .opportunity-card {
    min-height: 260px;
    padding: 1.75rem;
    border: 3px solid var(--color-orange);
    background: var(--color-surface);
    box-shadow: var(--orange-shadow);
  }

  .opportunity-number {
    display: inline-block;
    margin-bottom: 2rem;
    color: var(--color-orange);
    font-family: var(--font-mono);
    font-weight: 800;
  }

  .opportunity-card h2 {
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
  }

  .opportunity-card p {
    margin: 0;
    color: var(--color-text-muted);
  }

  .details-band {
    border-block: 3px solid var(--color-orange);
    background: var(--color-surface);
  }

  .details-grid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .details-grid .section-lead {
    margin: 0;
  }

  @media (max-width: 800px) {
    .opportunities-grid { grid-template-columns: 1fr; }
    .details-grid { align-items: flex-start; flex-direction: column; }
  }
</style>
