<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  const { resources } = data;

  const opps = [
    { title: 'Build your portfolio', description: 'Work with other students on club projects, contribute to the site, and turn your ideas into something you can share.' },
    { title: 'Lead and volunteer', description: 'Help organize meetings, mentor newer members, support events, and build the service hours needed for Honor Society.' },
    { title: 'Compete and create', description: 'Try competitive programming, write problems for our annual contest, or start a subclub around an area you care about.' }
  ];
</script>

<svelte:head>
  <title>Resources & Opportunities | SLHS CS Club</title>
  <meta name="description" content="Guides, learning materials, and ways to get involved with the Seven Lakes High School CS Club." />
</svelte:head>

<Shell activePage="resources">
  <PageHero title="Resources & Opportunities" subtitle="Learning materials from our presentations, plus ways to build skills and contribute to the club." />

  <section class="section">
    <div class="container opps-grid">
      {#each opps as opp, i}
        <article class="opp-card">
          <span class="opp-num">0{i + 1}</span>
          <h2>{opp.title}</h2>
          <p>{opp.description}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="section opps-band">
    <div class="container opps-band-inner">
      <div>
        <h2 class="section-title">Start something new</h2>
        <p class="section-lead">Have an idea for a workshop, social, project, or subclub? Bring it to a meeting.</p>
      </div>
      <a class="btn btn-primary" href="/join"><i class="fa-solid fa-user-plus"></i> Get involved</a>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Available Resources</h2>
      {#if resources.length > 0}
        <div class="resources-grid">
          {#each resources as resource}
            <a href="/resources/{resource.slug}" class="resource-card">
              <span class="resource-type">{resource.type}</span>
              <h3>{resource.title}</h3>
              <p>Click to view.</p>
            </a>
          {/each}
        </div>
      {:else}
        <div class="resources-grid">
          <div class="resource-card">
            <span class="resource-type">Info</span>
            <h3>No Resources Yet</h3>
            <p>Check back soon!</p>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <CTACard title="Have a resource to share?" lead="If you've created a presentation or guide, we'd love to include it here. Let us know on Discord.">
    <a class="btn btn-primary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a>
    <a class="btn btn-secondary" href="/"><i class="fa-solid fa-house"></i> Back Home</a>
  </CTACard>
</Shell>

<style>
  .opps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .opp-card { min-height: 240px; padding: 1.75rem; border: 1px solid var(--color-navy); border-top: 3px solid var(--color-orange); background: var(--color-surface); transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease; }
  .opp-card:hover { transform: translateY(-3px); box-shadow: 4px 4px 0 var(--color-orange); }
  .opp-num { display: inline-block; margin-bottom: 2rem; color: var(--color-orange); font-family: var(--font-mono); font-weight: 800; }
  .opp-card h2 { margin: 0 0 0.75rem; font-size: 1.4rem; }
  .opp-card p { margin: 0; color: var(--color-text-muted); }
  .opps-band { border-block: 3px solid var(--color-orange); border-top-color: var(--color-navy); background: var(--color-surface); }
  .opps-band-inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
  .opps-band-inner .section-lead { margin: 0; }
  .resources-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
  .resource-card { display: block; padding: 1.5rem; border: 1px solid var(--color-navy); border-top: 3px solid var(--color-orange); background: var(--color-surface); color: var(--color-text); text-decoration: none; transition: transform .15s var(--ease-hover), box-shadow .15s var(--ease-hover); }
  .resource-card:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0 var(--color-orange); }
  .resource-type { display: inline-block; padding: 0.2rem 0.45rem; margin-bottom: 0.5rem; border: 2px solid currentColor; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; }
  .resource-card h3 { margin: 0 0 0.4rem; }
  .resource-card p { margin: 0; opacity: 0.85; font-size: 0.9rem; }
  @media (max-width: 800px) { .opps-grid { grid-template-columns: 1fr; } .opps-band-inner { flex-direction: column; align-items: flex-start; } }
</style>
