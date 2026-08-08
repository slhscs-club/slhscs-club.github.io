<script lang="ts">
  import { handleLightboxKeydown, type LightboxImage } from '$lib/lightbox';

  let {
    image,
    onClose
  }: {
    image: LightboxImage | null;
    onClose: () => void;
  } = $props();
</script>

<svelte:window on:keydown={(e) => handleLightboxKeydown(e, onClose)} />

{#if image}
  <div class="lightbox-backdrop" role="button" tabindex="0" onclick={onClose} onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? onClose() : null}>
    <div class="lightbox-content" role="presentation" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
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
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 2rem;
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