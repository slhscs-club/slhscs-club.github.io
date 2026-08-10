<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

{#if children}
  <div class="fullscreen-overlay" role="dialog" aria-modal="true" onclick={(e) => {}} onkeydown={(e) => e.key === 'Escape'}>
    <div class="fullscreen-panel" onclick={(e) => e.stopPropagation()}>
      {@render children()}
    </div>
  </div>
{/if}

<style>
  .fullscreen-overlay {
    position: fixed;
    inset: 0;
    z-index: 5000;
    background: rgba(0, 0, 0, 0.82);
    display: grid;
    place-items: center;
    padding: 1rem;
    backdrop-filter: blur(6px);
  }
  .fullscreen-panel {
    width: min(960px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    background: var(--color-surface);
    border: 1px solid var(--color-navy);
    border-top: 3px solid var(--color-orange);
    padding: 2rem;
    color: var(--color-text);
    border-radius: 4px;
  }
</style>
