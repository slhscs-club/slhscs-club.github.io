<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import { createCarouselState, goTo, goNext, goPrev, handleDragStart, handleDragMove, handleDragEnd, getTrackTransform } from '$lib/carousel';

  const officerImages = import.meta.glob(
    '$lib/assets/officers/*.{jpg,jpeg,png,gif,webp,avif}',
    { eager: true, query: { url: true } }
  );

  function getOfficerImage(name: string): string | undefined {
    const hyphenated = name.toLowerCase().replace(/\s+/g, '-');
    const match = Object.entries(officerImages).find(([path]) =>
      path.includes(`/${hyphenated}.`)
    );
    return match ? (match[1] as { default: string }).default : undefined;
  }

  const officers = [
    { name: 'Abhay Godavarthy', role: 'President' },
    { name: 'Shravni Rotithor', role: 'Vice President' },
    { name: 'Saanvi Saxena', role: 'Treasurer + Secretary' },
    { name: 'Avika Shrivastava', role: 'Historian' },
    { name: 'Eren Tor', role: 'Competitive Programming Lead' },
    { name: 'Austin Yu', role: 'Contest Lead' },
    { name: 'Kushagra Nagar', role: 'Outreach Manager' },
    { name: 'Jackson MacGregor', role: 'Web Development' }
  ];

  const faqItems = [
    {
      q: 'What activities does the club do?',
      a: 'We hold presentations on computer science topics every week, practice for contests, host a national contest and UIL invitational, and provide an environment for Seven Lakes students interested in computer science to connect with each other.'
    },
    {
      q: 'How do I join?',
      a: 'Our club is open to anyone who wants to attend our meetings. No sign up is required and we don\'t keep a list of members.'
    },
    {
      q: 'Do I have to pay any fees?',
      a: 'No! Our club is completely free to everyone. If you meet the requirements and would like to join National CS Honor Society after a year, then we ask for a small fee to cover the cost of the Honor Society.'
    },
    {
      q: 'Do I need to compete to be in the club?',
      a: 'Competitions are not required. We encourage everyone to give contests a try because they\'re fun and a great way to improve your problem solving skills, but we recognize that there wide range of interests in CS beyond competitions.'
    }
  ];

  let carousel = $state(createCarouselState(officers.length, 3));
  let trackEl: HTMLDivElement | undefined = $state();

  let trackTransform = $derived(getTrackTransform(carousel, 3));

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
    const slideWidth = trackEl ? trackEl.clientWidth / officers.length : 0;
    carousel = handleDragEnd(carousel, slideWidth);
  }
</script>

<svelte:head>
  <title>About | SLHS CS Club</title>
  <meta name="description" content="Learn about the Seven Lakes High School Computer Science Club - history, how we work, and our officers." />
</svelte:head>

<Shell activePage="about">
  <section class="section about-hero">
    <div class="container">
      <h1 class="page-title">About Us</h1>
      <p class="page-subtitle">Learn about the Seven Lakes High School Computer Science Club</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Our History</h2>
      <p>
        The Seven Lakes High School Computer Science Club has been running for around 15 years, growing from a UIL academics team into one of the most active clubs on campus. We've hosted national programming contests with over 350 attendees, won UIL CS State multiple times, and built a community that welcomes students of all skill levels and interests.
      </p>
    </div>
  </section>

  <section class="section overview-band">
    <div class="container">
      <h2 class="section-title">How the Club Works</h2>
      <p class="section-lead">We meet every Monday at 2:45 PM in Room 1001. Here's how we're structured.</p>

      <div class="structure-grid">
        <div class="structure-card color-orange">
          <h3>Weekly Meetings</h3>
          <p>Every Monday after school, we hold a general meeting with presentations on CS topics delivered by our own members. Topics range from algorithms and data structures to web development, game dev, and career advice.</p>
        </div>
        <div class="structure-card color-orange">
          <h3>Competitive Programming</h3>
          <p>We hold weekly CP practice sessions where members work through programming problems together. We attend several local contests throughout the year hosted by neighboring schools, plus USACO, HP Code Wars, and UIL CS.</p>
        </div>
        <div class="structure-card color-orange">
          <h3>National October Contest</h3>
          <p>Every year we host our own national programming contest, produced entirely by the CS Club. We need problem writers, testers, judges, and volunteers to help put the event together.</p>
        </div>
        <div class="structure-card color-orange">
          <h3>Social Events</h3>
          <p>We also run social events throughout the year to help members connect and build community outside of coding.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <div class="faq-list">
        {#each faqItems as item}
          <div class="faq-item color-orange">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Our Officers</h2>
      <p class="section-lead">The students who keep the club running:</p>

      <div class="carousel">
        <button class="carousel-btn carousel-btn--prev" onclick={onGoPrev} aria-label="Previous" disabled={carousel.currentIndex === 0}>
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div
          class="carousel-viewport"
          role="region"
          onpointerdown={onDragStart}
          onpointermove={onDragMove}
          onpointerup={onDragEnd}
          onpointerleave={onDragEnd}
        >
          <div class="carousel-track" class:dragging={carousel.isDragging} style="transform: {trackTransform}" bind:this={trackEl}>
            {#each officers as officer, i}
              {@const img = getOfficerImage(officer.name)}
              <div class="carousel-slide">
                <div class="officer-card">
                  <div class="officer-image" style={img ? `background-image: url(${img})` : ''}>
                    <i class="fa-solid fa-user" style={img ? 'display: none;' : ''}></i>
                  </div>
                </div>
                <div class="officer-info">
                  <h3>{officer.name}</h3>
                  <p>{officer.role}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <button class="carousel-btn carousel-btn--next" onclick={onGoNext} aria-label="Next" disabled={carousel.currentIndex >= carousel.maxIndex}>
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="carousel-dots">
        {#each officers as _, i}
          {#if i <= carousel.maxIndex}
            <button
              class="carousel-dot"
              class:active={i === carousel.currentIndex}
              onclick={() => onGoTo(i)}
              aria-label="Go to officers {i + 1}-{i + 3}"
            ></button>
          {/if}
        {/each}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container cta-card color-orange">
      <h2 class="section-title">Want to get involved?</h2>
      <p class="section-lead">Come to a meeting or join our Discord to learn more.</p>
      <div class="cta-actions">
        <a class="btn btn-primary" href="/join"><i class="fa-solid fa-user-plus"></i> Join the Club</a>
        <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a>
      </div>
    </div>
  </section>
</Shell>

<style>
  .about-hero {
    text-align: center;
    padding: 6rem 0 2rem;
  }

  .about-hero .page-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .overview-band {
    border-top: 3px solid var(--color-orange);
    border-bottom: 3px solid var(--color-orange);
    background: rgba(255, 255, 255, 0.02);
  }

  .structure-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .structure-card {
    padding: 1.5rem;
    border: 3px solid var(--accent, var(--color-orange));
    background: var(--accent, var(--color-surface));
    color: var(--accent-text, var(--color-white));
  }

  .structure-card h3 {
    margin: 0 0 0.5rem;
  }

  .structure-card p {
    margin: 0;
    opacity: 0.9;
  }

  .faq-list {
    display: grid;
    gap: 1.5rem;
  }

  .faq-item {
    padding: 1.2rem;
    border: 3px solid var(--accent, var(--color-orange));
    background: var(--accent, var(--color-surface));
    color: var(--accent-text, var(--color-white));
    box-shadow: var(--orange-shadow);
  }

  .faq-item h3 {
    margin: 0 0 0.5rem;
    color: var(--color-black);
  }

  .faq-item p {
    margin: 0;
  }

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
    flex: 0 0 calc(100% / 3);
    padding: 0 0.75rem;
    box-sizing: border-box;
  }

  .officer-card {
    aspect-ratio: 3 / 4;
    border: 3px solid var(--color-orange);
    overflow: hidden;
  }

  .officer-image {
    width: 100%;
    height: 100%;
    font-size: 3rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .officer-image i {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
  }

  .officer-info {
    text-align: center;
    margin-top: 0.75rem;
  }

  .officer-info h3 {
    margin: 0 0 0.15rem;
    font-size: 1.15rem;
  }

  .officer-info p {
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

  @media (max-width: 1024px) {
    .structure-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 800px) {
    .carousel {
      max-width: 100%;
    }

    .carousel-slide {
      flex: 0 0 calc(100% / 2);
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
      flex: 0 0 100%;
      padding: 0 0.25rem;
    }
  }
</style>