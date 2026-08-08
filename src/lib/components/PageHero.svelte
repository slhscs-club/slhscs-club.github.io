<script lang="ts">
  let {
    title,
    subtitle,
    class: className = ''
  }: {
    title: string;
    subtitle?: string;
    class?: string;
  } = $props();
</script>

<section class="section page-hero {className}">
  <div class="container">
    <h1 class="page-title">{title}</h1>
    {#if subtitle}
      <p class="page-subtitle">{subtitle}</p>
    {/if}
  </div>
</section>

<style>
  .page-hero {
    text-align: center;
    padding: 6rem 0 2rem;
  }

  .page-hero .page-subtitle {
    margin-left: auto;
    margin-right: auto;
  }
</style>