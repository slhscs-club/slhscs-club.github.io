<script lang="ts">
  import { onMount } from 'svelte';

  let {
    items,
    visibleSlides = 3,
    ariaLabel = 'Carousel',
    autoplay = true,
    autoplayInterval = 4000
  }: {
    items: { name: string; role: string; image?: string }[];
    visibleSlides?: number;
    ariaLabel?: string;
    autoplay?: boolean;
    autoplayInterval?: number;
  } = $props();

  const N = $derived(items.length);
  // Three copies so the loop wraps seamlessly.
  const trackItems = $derived([...items, ...items, ...items]);

  let visible = $state(visibleSlides);
  // index points into the tripled track; we keep it near the middle copy [N … 2N-1].
  let index = $state(N);
  let noTrans = $state(false);
  let dragOffset = $state(0);
  let isDragging = $state(false);
  let hovered = $state(false);
  let dragStartX = 0;
  let dragIndex = 0;

  let trackEl: HTMLDivElement | undefined = $state();

  const slidePct = $derived(100 / visible);
  const trackTransform = $derived(
    `translateX(calc(${-(index * slidePct)}% + ${dragOffset}px))`
  );
  const activeDot = $derived(((index % N) + N) % N);
  const centerItem = $derived(((activeDot + (visible - 1) / 2) % N + N) % N);

  function computeVisible() {
    const w = window.innerWidth;
    return w >= 900 ? visibleSlides : w >= 600 ? Math.min(2, visibleSlides) : 1;
  }

  // --- wrap helpers ----------------------------------------------------------
  function reflowThenReactivate() {
    if (trackEl) void trackEl.offsetHeight;
    noTrans = false;
  }

  /** Jump `index` near the middle copy without painting a transition. */
  function wrapToMiddle() {
    noTrans = true;
    index = N + ((index % N) + N) % N;
    requestAnimationFrame(reflowThenReactivate);
  }

  // --- navigation ------------------------------------------------------------
  function onGoNext() {
    index += 1;
    if (index >= 3 * N - visible) wrapToMiddle();
  }

  function onGoPrev() {
    index -= 1;
    if (index < visible) wrapToMiddle();
  }

  function onGoTo(slide: number) {
    noTrans = true;
    index = N + slide;
    requestAnimationFrame(reflowThenReactivate);
  }

  // --- pointer drag ----------------------------------------------------------
  function onDragStart(e: PointerEvent) {
    isDragging = true;
    dragStartX = e.clientX;
    dragIndex = index;
    trackEl?.setPointerCapture(e.pointerId);
  }

  function onDragMove(e: PointerEvent) {
    if (!isDragging) return;
    dragOffset = e.clientX - dragStartX;
  }

  function onDragEnd() {
    if (!isDragging) return;
    const trackWidth = trackEl?.clientWidth ?? 0;
    const slideWidth = trackWidth / (3 * N) || 1;
    const delta = Math.round(dragOffset / slideWidth);
    isDragging = false;
    dragOffset = 0;
    index = dragIndex - delta;
    // normalise into [0 … 3N-1]
    index = ((index % (3 * N)) + 3 * N) % (3 * N);
    wrapToMiddle();
  }

  onMount(() => {
    visible = computeVisible();
    const queries = ['(max-width: 899px)', '(max-width: 599px)'];
    const handler = () => (visible = computeVisible());
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener('change', handler));
  });

  $effect(() => {
    if (!autoplay || hovered || isDragging) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(onGoNext, autoplayInterval);
    return () => window.clearInterval(id);
  });
</script>

<div
  class="carousel"
  role="group"
  aria-label={ariaLabel}
  style="--visible-slides: {visible};"
  onpointerenter={() => (hovered = true)}
  onpointerleave={() => (hovered = false)}
>
  <button class="carousel-btn carousel-btn--prev" onclick={onGoPrev} aria-label="Previous">
    <i class="fa-solid fa-chevron-left"></i>
  </button>

  <div
    class="carousel-viewport"
    role="region"
    aria-label={ariaLabel}
    onpointerdown={onDragStart}
    onpointermove={onDragMove}
    onpointerup={onDragEnd}
    onpointercancel={onDragEnd}
  >
    <div
      class="carousel-track"
      class:no-transition={noTrans || isDragging}
      style="transform: {trackTransform}"
      bind:this={trackEl}
    >
      {#each trackItems as item, rawIndex}
        {@const di = rawIndex % N}
        {@const sdist = ((((di - centerItem + N / 2) % N) + N) % N) - N / 2}
        {@const idist = sdist < 0 ? -sdist : sdist}
        {@const peak = Math.max(1, visible / 2)}
        {@const fade = Math.max(0, 1 - Math.pow(idist / peak, 1.6))}
        {@const scale = 1 - Math.max(0, idist - 0.6) * 0.075}
        {@const spin = Math.max(-18, Math.min(18, sdist * 7))}
        <div class="carousel-slide" style="opacity: {fade}; transform: perspective(900px) rotateY({spin}deg) scale({scale});">
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

  <button class="carousel-btn carousel-btn--next" onclick={onGoNext} aria-label="Next">
    <i class="fa-solid fa-chevron-right"></i>
  </button>
</div>

<div class="carousel-dots">
  {#each items as _, i}
    <button class="carousel-dot" class:active={i === activeDot} onclick={() => onGoTo(i)} aria-label="Go to slide {i + 1}"></button>
  {/each}
</div>

<style>
  .carousel { display: flex; align-items: center; gap: 0.75rem; max-width: 1060px; margin: 0 auto; position: relative; }
  .carousel-viewport { flex: 1; overflow: hidden; position: relative; }
  .carousel-track { display: flex; transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1); }
  .carousel-track.no-transition { transition: none; }
  .carousel-slide { flex: 0 0 calc(100% / var(--visible-slides, 3)); padding: 0 0.75rem; box-sizing: border-box; transform-style: preserve-3d; transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1); will-change: transform, opacity; }
  .carousel-card { aspect-ratio: 3 / 4; border: 1px solid var(--color-navy); border-top: 3px solid var(--color-orange); overflow: hidden; box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.7); background: var(--color-surface); }
  .carousel-image { width: 100%; height: 100%; font-size: 3rem; background-size: cover; background-position: center; background-repeat: no-repeat; transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.6s ease; }
  .carousel-slide:hover .carousel-image { transform: scale(1.06); filter: saturate(1.1); }
  .carousel-image i { display: grid; place-items: center; width: 100%; height: 100%; color: var(--color-text-muted); }
  .carousel-info { text-align: center; margin-top: 0.75rem; }
  .carousel-info h3 { margin: 0 0 0.15rem; font-size: 1.15rem; color: var(--color-text); }
  .carousel-info p { margin: 0; opacity: 0.85; font-size: 0.95rem; color: var(--color-text-muted); }
  .carousel-btn { flex-shrink: 0; width: 48px; height: 48px; border: 2px solid var(--color-navy); background: var(--color-surface); color: var(--color-orange); font-size: 1.3rem; cursor: pointer; display: grid; place-items: center; z-index: 2; transition: background 0.2s var(--ease-hover), color 0.2s var(--ease-hover), transform 0.2s var(--ease-hover), border-color 0.2s var(--ease-hover); }
  .carousel-btn:hover { background: var(--color-orange); color: var(--color-black); border-color: var(--color-orange); transform: translateY(-2px); }
  .carousel-dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.2rem; }
  .carousel-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--color-navy); background: transparent; cursor: pointer; padding: 0; transition: background 0.2s var(--ease-hover), transform 0.2s var(--ease-hover), border-color 0.2s var(--ease-hover); }
  .carousel-dot.active { background: var(--color-orange); border-color: var(--color-orange); transform: scale(1.25); }
  @media (max-width: 800px) { .carousel { max-width: 100%; } .carousel-slide { padding: 0 0.5rem; } .carousel-btn { width: 40px; height: 40px; font-size: 1.1rem; } }
</style>
