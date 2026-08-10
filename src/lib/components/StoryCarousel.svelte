<script lang="ts">
  type Story = { image: string; eyebrow: string; title: string; description: string };
  let { items, ariaLabel = 'Carousel' }: { items: Story[]; ariaLabel?: string } = $props();
  let track: HTMLDivElement;
  let dragging = $state(false);
  let startX = 0;
  let startScroll = 0;

  function scrollByCard(direction: number) {
    track?.scrollBy({ left: direction * Math.max(300, track.clientWidth * 0.72), behavior: 'smooth' });
  }

  function onPointerDown(event: PointerEvent) {
    dragging = true;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent) {
    if (dragging) track.scrollLeft = startScroll - (event.clientX - startX);
  }

  function onPointerUp() { dragging = false; }
</script>

<div class="story-carousel" role="region" aria-label={ariaLabel}>
  <button class="story-arrow story-arrow-left" onclick={() => scrollByCard(-1)} aria-label="Previous slide"><i class="fa-solid fa-chevron-left"></i></button>
  <div class:dragging bind:this={track} class="story-track" role="listbox" aria-label={ariaLabel} tabindex="0" onpointerdown={onPointerDown} onpointermove={onPointerMove} onpointerup={onPointerUp} onpointercancel={onPointerUp}>
    {#each items as item}
      <article class="story-card">
        {#if item.image}
        <div class="story-image" style={`background-image: url('${item.image}')`}>
          <span class="story-eyebrow">{item.eyebrow}</span>
        </div>
        {/if}
        <div class="story-content">
          {#if !item.image}<span>{item.eyebrow}</span>{/if}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </article>
    {/each}
  </div>
  <button class="story-arrow story-arrow-right" onclick={() => scrollByCard(1)} aria-label="Next slide"><i class="fa-solid fa-chevron-right"></i></button>
</div>

<style>
  .story-carousel { position: relative; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 1rem; }
  .story-track { display: flex; gap: 1.5rem; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; padding: 1rem 0 1.5rem; mask-image: linear-gradient(to right, #000 0%, #000 94%, transparent 100%); cursor: grab; scroll-behavior: smooth; }
  .story-track::-webkit-scrollbar { display: none; }
  .story-track.dragging { cursor: grabbing; scroll-snap-type: none; }

  .story-card {
    flex: 0 0 min(440px, 34vw);
    scroll-snap-align: center;
    overflow: hidden;
    border: 1px solid var(--color-navy);
    border-top: 3px solid var(--color-orange);
    background: var(--color-surface);
    box-shadow: 0 20px 45px rgba(0, 0, 0, .35);
    transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s ease, border-color .45s ease;
  }

  .story-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 60px -12px rgba(0, 0, 0, .55), 6px 6px 0 var(--color-orange);
    border-top-color: var(--color-orange);
  }

  .story-image {
    position: relative;
    height: 215px;
    background-size: cover;
    background-position: center;
    filter: saturate(.9);
    transition: transform .7s cubic-bezier(.2,.8,.2,1), filter .7s ease;
  }

  .story-card:hover .story-image {
    transform: scale(1.06) skewX(-0.5deg);
    filter: saturate(1.12) brightness(1.06);
  }

  .story-eyebrow {
    position: absolute;
    top: .9rem;
    left: .9rem;
    padding: .3rem .6rem;
    background: rgba(10, 12, 16, .82);
    border-left: 3px solid var(--color-orange);
    color: var(--color-orange);
    font: 700 .72rem var(--font-mono);
    text-transform: uppercase;
    letter-spacing: .1em;
  }

  .story-content { padding: 1.3rem 1.4rem 1.6rem; }
  .story-content h3 { margin: 0 0 .4rem; font-size: 1.4rem; color: var(--color-text); }
  .story-content p { margin: 0; color: var(--color-text-muted); line-height: 1.45; }

  .story-arrow {
    width: 46px;
    height: 46px;
    border: 1px solid var(--color-navy);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1;
    display: grid;
    place-items: center;
    transition: background .2s var(--ease-hover), color .2s var(--ease-hover), transform .2s var(--ease-hover);
  }

  .story-arrow:hover { background: var(--color-orange); color: var(--color-black); transform: translateY(-2px); }

  @media (max-width: 700px) {
    .story-carousel { grid-template-columns: 1fr 1fr; }
    .story-track { grid-column: 1 / -1; grid-row: 1; }
    .story-card { flex-basis: 78vw; }
    .story-arrow { grid-row: 2; }
    .story-arrow-left { grid-column: 1; }
    .story-arrow-right { grid-column: 2; justify-self: end; }
  }
</style>
