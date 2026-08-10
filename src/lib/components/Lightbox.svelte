<script lang="ts">
  import { onMount } from 'svelte';
  import { handleLightboxKeydown, type LightboxImage } from '$lib/lightbox';

  let {
    image,
    onClose
  }: {
    image: LightboxImage | null;
    onClose: () => void;
  } = $props();

  let open = $state(false);
  $effect(() => { open = !!image; });

  onMount(() => {
    return () => { document.body.style.overflow = ''; };
  });

  $effect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  });
</script>

<svelte:window on:keydown={(e) => handleLightboxKeydown(e, onClose)} />

{#if image}
  <div class="lightbox-backdrop" onclick={onClose} onkeydown={(e) => (e.key === 'Escape') && onClose()}>
    <div class="lightbox-content" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <button class="lightbox-close" onclick={onClose} aria-label="Close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <img src="{image.src}" alt="{image.alt}" class="lightbox-image" />
      <p class="lightbox-caption">{image.alt}</p>
    </div>
  </div>
{/if}

<style>
  .lightbox-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 2rem;
    cursor: pointer;
  }

  .lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
  }

  .lightbox-close {
    position: absolute;
    top: -3rem;
    right: 0;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: 3px solid var(--color-white);
    background: transparent;
    color: var(--color-white);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    z-index: 10001;
  }

  .lightbox-close:hover {
    background: var(--color-white);
    color: var(--color-black);
  }

  .lightbox-image {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    display: block;
  }

  .lightbox-caption {
    margin-top: 1rem;
    text-align: center;
    color: var(--color-text-muted);
    font-size: 1rem;
  }
</style>
