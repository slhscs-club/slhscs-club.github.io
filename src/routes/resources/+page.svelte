<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  const { resources } = data;
</script>

<svelte:head>
  <title>Resources | SLHS CS Club</title>
  <meta name="description" content="Guides, slides, and resources from the Seven Lakes High School Computer Science Club." />
</svelte:head>

<Shell activePage="resources">
  <PageHero title="Resources" subtitle="Guides, slideshows, and learning materials from our club presentations." />

  <section class="section">
    <div class="container">
      <h2 class="section-title">Available Resources</h2>
      {#if resources.length > 0}
        <div class="resources-grid">
          {#each resources as resource}
            <a href="/resources/{resource.slug}" class="resource-card color-orange">
              <span class="resource-type">{resource.type}</span>
              <h3>{resource.title}</h3>
              <p>Click to view resource.</p>
            </a>
          {/each}
        </div>
      {:else}
        <div class="resources-grid">
          <div class="resource-card color-orange">
            <span class="resource-type">Info</span>
            <h3>No Resources Yet</h3>
            <p>Check back soon for learning materials!</p>
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
  .resources-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }

  .resource-card {
    display: block;
    padding: 1.5rem;
    border: 1px solid var(--color-blue);
    border-top: 3px solid var(--color-orange);
    background: var(--color-surface);
    color: var(--color-text);
    text-decoration: none;
    transition: transform 0.15s var(--ease-hover), box-shadow 0.15s var(--ease-hover);
  }

  .resource-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 var(--accent, var(--color-orange));
  }

  .resource-type {
    display: inline-block; padding: 0.2rem 0.45rem; margin-bottom: 0.5rem;
    border: 2px solid currentColor; font-size: 0.75rem; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .resource-card h3 { margin: 0 0 0.4rem; }
  .resource-card p { margin: 0; opacity: 0.85; font-size: 0.9rem; }
</style>
