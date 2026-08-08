<script lang="ts">
  import { createCarouselState, goTo, goNext, goPrev, handleDragStart, handleDragMove, handleDragEnd, getTrackTransform } from '$lib/carousel';

  let {
    items,
    visibleSlides = 3,
    ariaLabel = 'Carousel'
  }: {
    items: { name: string; role: string; image?: string }[];
    visibleSlides?: number;
    ariaLabel?: string;
  } = $props();

  let carousel = $state(createCarouselState(items.length, visibleSlides));
  let trackEl: HTMLDivElement | undefined = $state();

  let trackTransform = $derived(getTrackTransform(carousel, visibleSlides));
  let maxIndex = $derived(Math.max(0, items.length - visibleSlides));

  function onGoTo(index: number) {
    carousel = goTo(carousel, index);
  }

  function onGoNext() {
    carousel = goNext(carousel);
  }

  function onGoPrev() {
    carousel = goPrev(carousel);
  }

  function onDragStart(e: PointerEvent) {
    carousel = handleDragStart(carousel, e.clientX);
  }

  function onDragMove(e: PointerEvent) {
    carousel = handleDragMove(carousel, e.clientX);
  }

  function onDragEnd() {
    const width = trackEl ? trackEl.clientWidth / items.length : 0;
    carousel = handleDragEnd(carousel, width);
  }
</script>

<div class="carousel" style="--visible-slides: {visibleSlides};">
  <button class="carousel-btn carousel-btn--prev" onclick={onGoPrev} aria-label="Previous" disabled={carousel.currentIndex === 0}>
    <i class="fa-solid fa-chevron-left"></i>
  </button>

  <div
    class="carousel-viewport"
    role="region"
    aria-label={ariaLabel}
    onpointerdown={onDragStart}
    onpointermove={onDragMove}
    onpointerup={onDragEnd}
    onpointerleave={onDragEnd}
  >
    <div class="carousel-track" class:dragging={carousel.isDragging} style="transform: {trackTransform}" bind:this={trackEl}>
      {#each items as item, i}
        <div class="carousel-slide">
          <div class="carousel-card">
            <div class="carousel-image" style={item.image ? `background-image: url(${item.image})` : ''}>
              <i class="fa-solid fa-user" style={item.image ? 'display: none;' : ''}></i>
            </div>
          </div>
          <div class="carousel-info">
            <h3>{item.name}</h3>
            <p>{item.role}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <button class="carousel-btn carousel-btn--next" onclick={onGoNext} aria-label="Next" disabled={carousel.currentIndex >= maxIndex}>
    <i class="fa-solid fa-chevron-right"></i>
  </button>
</div>

<div class="carousel-dots">
  {#each items as _, i}
    {#if i <= maxIndex}
      <button
        class="carousel-dot"
        class:active={i === carousel.currentIndex}
        onclick={() => onGoTo(i)}
        aria-label="Go to slide {i + 1}-{i + visibleSlides}"
      ></button>
    {/if}
  {/each}
</div>

<style>
  .carousel {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .carousel-viewport {
    flex: 1;
    overflow: hidden;
  }

  .carousel-track {
    display: flex;
    transition: transform 0.4s var(--ease-hover);
  }

  .carousel-track.dragging {
    transition: none;
  }

  .carousel-slide {
    flex: 0 0 calc(100% / var(--visible-slides, 3));
    padding: 0 0.75rem;
    box-sizing: border-box;
  }

  .carousel-card {
    aspect-ratio: 3 / 4;
    border: 3px solid var(--color-orange);
    overflow: hidden;
  }

  .carousel-image {
    width: 100%;
    height: 100%;
    font-size: 3rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .carousel-image i {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
  }

  .carousel-info {
    text-align: center;
    margin-top: 0.75rem;
  }

  .carousel-info h3 {
    margin: 0 0 0.15rem;
    font-size: 1.15rem;
  }

  .carousel-info p {
    margin: 0;
    opacity: 0.85;
    font-size: 0.95rem;
  }

  .carousel-btn {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border: 2px solid var(--color-orange);
    background: transparent;
    color: var(--color-orange);
    font-size: 1.3rem;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: background 0.2s var(--ease-hover), color 0.2s var(--ease-hover), opacity 0.2s var(--ease-hover);
  }

  .carousel-btn:hover:not(:disabled) {
    background: var(--color-orange);
    color: var(--color-black);
  }

  .carousel-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.2rem;
  }

  .carousel-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid var(--color-orange);
    background: transparent;
    cursor: pointer;
    padding: 0;
    transition: background 0.2s var(--ease-hover);
  }

  .carousel-dot.active {
    background: var(--color-orange);
  }

  @media (max-width: 800px) {
    .carousel {
      max-width: 100%;
    }

    .carousel-slide {
      --visible-slides: 2;
      padding: 0 0.5rem;
    }

    .carousel-btn {
      width: 40px;
      height: 40px;
      font-size: 1.1rem;
    }
  }

  @media (max-width: 500px) {
    .carousel-slide {
      --visible-slides: 1;
      padding: 0 0.25rem;
    }
  }
</style>