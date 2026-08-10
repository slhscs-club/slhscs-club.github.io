<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
</script>

<svelte:head>
  <title>CSHS | SLHS CS Club</title>
  <meta name="description" content="Computer Science Honor Society requirements and information." />
</svelte:head>

<Shell activePage="">
  <PageHero title="CS Honor Society" subtitle="Detailed requirements and point-based volunteering information for the Computer Science Honor Society." />

  <section class="section">
    <div class="container cshs-content">
      <div class="stub-card">
        <i class="fa-solid fa-clock"></i>
        <h2>Point-Based Volunteering</h2>
        <p>Detailed point requirements, categories, and tracking information will be posted here. Check back soon or reach out to an officer for the latest details.</p>
      </div>
    </div>
  </section>

  <CTACard title="Ready to join CSHS?" lead="Fill out the registration form and pay the fee to get started.">
    <a class="btn btn-primary" href="/join"><i class="fa-solid fa-arrow-left"></i> Back to Join</a>
    <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Ask on Discord</a>
  </CTACard>
</Shell>

<style>
  .cshs-content { max-width: 700px; }
  .stub-card { padding: 2rem; border: 1px solid var(--color-navy); border-top: 3px solid var(--color-orange); background: var(--color-surface); text-align: center; }
  .stub-card i { font-size: 3rem; color: var(--color-orange); margin-bottom: 1rem; }
  .stub-card h2 { margin: 0 0 0.75rem; }
  .stub-card p { margin: 0; color: var(--color-text-muted); }
</style>
