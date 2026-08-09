<script lang="ts">
  type Story = { image: string; eyebrow: string; title: string; description: string };
  let { items, ariaLabel = 'Carousel' }: { items: Story[]; ariaLabel?: string } = $props();
  let track: HTMLDivElement;
  let dragging = $state(false);
  let startX = 0;
  let startScroll = 0;

  function scrollByCard(direction: number) {
    track?.scrollBy({ left: direction * Math.max(280, track.clientWidth * 0.72), behavior: 'smooth' });
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
  <button class="story-arrow story-arrow-left" onclick={() => scrollByCard(-1)} aria-label="Previous slide">←</button>
  <div class:dragging bind:this={track} class="story-track" role="listbox" aria-label={ariaLabel} tabindex="0" onpointerdown={onPointerDown} onpointermove={onPointerMove} onpointerup={onPointerUp} onpointercancel={onPointerUp}>
    {#each items as item}
      <article class="story-card">
        <div class="story-image" style={`background-image: url('${item.image}')`}></div>
        <div class="story-content">
          <span>{item.eyebrow}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </article>
    {/each}
  </div>
  <button class="story-arrow story-arrow-right" onclick={() => scrollByCard(1)} aria-label="Next slide">→</button>
</div>

<style>
  .story-carousel { position: relative; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 1rem; }
  .story-track { display: flex; gap: 1.25rem; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; padding: 1rem 4vw 1.5rem; margin: 0 -4vw; mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent); cursor: grab; }
  .story-track::-webkit-scrollbar { display: none; }
  .story-track.dragging { cursor: grabbing; scroll-snap-type: none; }
  .story-card { flex: 0 0 min(420px, 30vw); scroll-snap-align: center; overflow: hidden; border: 2px solid #15233f; border-top-color: var(--color-orange); background: var(--color-surface); box-shadow: 0 20px 45px rgba(0,0,0,.3); }
  .story-image { height: 210px; background-size: cover; background-position: center; filter: saturate(.84); }
  .story-content { padding: 1.25rem 1.35rem 1.5rem; }
  .story-content span { color: var(--color-orange); font: 700 .72rem var(--font-mono); text-transform: uppercase; letter-spacing: .12em; }
  .story-content h3 { margin: .55rem 0 .35rem; font-size: 1.35rem; }
  .story-content p { margin: 0; color: var(--color-text-muted); }
  .story-arrow { width: 44px; height: 44px; border: 1px solid rgba(255,255,255,.4); background: #15233f; color: white; font-size: 1.4rem; cursor: pointer; z-index: 1; }
  .story-arrow:hover { background: var(--color-orange); color: #080b12; }
  @media (max-width: 700px) { .story-carousel { grid-template-columns: 1fr 1fr; } .story-track { grid-column: 1 / -1; grid-row: 1; } .story-card { flex-basis: 78vw; } .story-arrow { grid-row: 2; } .story-arrow-left { grid-column: 1; } .story-arrow-right { grid-column: 2; justify-self: end; } }
</style>
