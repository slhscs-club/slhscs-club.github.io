<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    lead,
    class: className = '',
    children
  }: {
    title: string;
    lead?: string;
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<section class="section">
  <div class="container cta-card color-orange {className}">
    <h2 class="section-title">{title}</h2>
    {#if lead}
      <p class="section-lead">{lead}</p>
    {/if}
    <div class="cta-actions">
      {@render children?.()}
    </div>
  </div>
</section>

<style>
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
</style>