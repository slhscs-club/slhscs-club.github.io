<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import CountUp from '$lib/components/CountUp.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
  import Masonry from '$lib/components/Masonry.svelte';
  import Lightbox from '$lib/components/Lightbox.svelte';
  import type { PageData } from './$types';
  import { formatEventDate } from '$lib/ics';
  import { openLightbox, closeLightbox, type LightboxImage } from '$lib/lightbox';

  export let data: PageData;
  const { highlights, events: serverEvents } = data;

  let selectedImage: LightboxImage | null = null;

  function onOpenLightbox(img: LightboxImage) {
    selectedImage = openLightbox(img);
  }

  function onCloseLightbox() {
    selectedImage = closeLightbox();
  }

  const achievements = [
    { prefix: '', num: 4, suffix: 'x', label: 'UIL State Championships' },
    { prefix: '', num: 20, suffix: '+', label: 'Individual UIL State Attendees' },
    { prefix: '≈', num: 15, suffix: '', label: 'Years Running' },
    { prefix: '', num: 50, suffix: '+', label: 'Honor Society Members' }
  ];

  let events = serverEvents.map((e: any) => ({
    ...e,
    start: new Date(e.start)
  }));
  let loadingEvents = false;
</script>

<svelte:head>
  <title>SLHS Computer Science Club</title>
  <meta name="description" content="Seven Lakes High School Computer Science Club - Connect, develop skills, and serve our school." />
  <meta property="og:title" content="SLHS Computer Science Club" />
  <meta property="og:description" content="Seven Lakes High School Computer Science Club - Connect, develop skills, and serve our school." />
  <meta property="og:image" content="/assets/logos/logo.png" />
</svelte:head>

<Shell activePage="home">
  <section class="section hero-section">
    <div class="container hero-grid">
      <div class="hero-copy">
        <h1 class="page-title">SLHS Computer Science Club</h1>
        <p class="page-subtitle">
          Welcome to the <b>Seven Lakes High School Computer Science Club!</b> Join us to meet passionate students, grow your interest and knowledge in the field of computer science, and compete and create in a fun and welcoming community.
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-large" href="/join"><i class="fa-solid fa-user-plus"></i> Join the Club</a>
          <a class="btn btn-secondary btn-large" href="/about"><i class="fa-solid fa-circle-info"></i> Learn More</a>
        </div>
      </div>
      <div class="hero-card">
        <div class="hero-logo-wrap">
          <img src="/assets/logos/logo.png" alt="SLHS Computer Science Club logo" class="hero-logo" />
        </div>
        <div class="hero-stat-grid">
          <div class="hero-stat">
            <strong>Mondays</strong>
            <p>at 2:45 PM</p>
          </div>
          <div class="hero-stat">
            <strong>Room</strong>
            <p>1001</p>
          </div>
          <div class="hero-stat">
            <strong>Free</strong>
            <p>for everyone</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-tight achievements-strip">
    <div class="container">
      <div class="achievements-grid">
        {#each achievements as ach}
          <div class="achievement-card">
            <strong>{ach.prefix}<CountUp from={0} to={ach.num} separator="" direction="up" duration={0.8} />{ach.suffix}</strong>
            <p>{ach.label}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="section" id="events">
    <div class="container">
      <h2 class="section-title">Upcoming Events</h2>
      <p class="section-lead">Here's a snapshot of what's coming up.</p>
      <div class="events-grid">
        {#if loadingEvents}
          <div class="event-card">
            <span class="event-date">Loading...</span>
            <h3>Upcoming Events</h3>
            <p>Fetching from calendar...</p>
          </div>
        {:else if events.length === 0}
          <div class="event-card">
            <span class="event-date">Soon</span>
            <h3>Weekly Meetings</h3>
            <p>Mondays at 2:45 PM in Room 1001</p>
          </div>
        {:else}
          {#each events as event}
            <div class="event-card">
              <span class="event-date">{formatEventDate(event.start)}</span>
              <h3>{event.summary}</h3>
              {#if event.description}<p>{event.description}</p>{/if}
            </div>
          {/each}
        {/if}
      </div>
      <div class="events-cta">
        <a class="btn btn-secondary" href="/calendar"><i class="fa-solid fa-calendar"></i> View Full Calendar</a>
      </div>
    </div>
  </section>

  <section class="section overview-band" id="overview">
    <div class="container overview-grid">
      <div class="overview-text">
        <h2 class="section-title">How the Club Works</h2>
        <p>
          Seven Lakes Computer Science Club holds weekly presentations on CS topics delivered by our own members, creating an enviroment for all Seven Lakes students interested in CS.
        </p>
        <p>
          We have several <b>subclubs</b> with their own focus areas, created by our own club members and officers.
        </p>
        <div class="overview-actions">
          <a class="btn btn-primary" href="/about"><i class="fa-solid fa-arrow-right"></i> Read More About Us</a>
          <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a>
        </div>
      </div>
      <div class="overview-cards">
        <div class="stat-card cs-club-card">
          <strong>Computer Science Club</strong>
          <p>Weekly presentations</p>
        </div>
        <div class="subclubs-row">
          <div class="subclub-card">
            <strong>Competitive Programming</strong>
            <p>Contests & practice</p>
          </div>
          <div class="subclub-card">
            <strong>AI</strong>
            <p>Machine learning topics</p>
          </div>
        </div>
        <div class="subclubs-row">
          <div class="subclub-card">
            <strong>Girls Who Code</strong>
            <p>Women-only chapter of Girls Who Code nonprofit</p>
          </div>
          <div class="subclub-card">
            <strong>Honor Society</strong>
            <p>Academic excellence</p>
          </div>
        </div>
        <div class="subclubs-row">
          <div class="subclub-card">
            <strong>App Development</strong>
            <p>Front-end & back-end app development</p>
          </div>
          <div class="subclub-card">
            <strong>And More???</strong>
            <p>Talk to us to start your own!</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {#if highlights && highlights.length > 0}
    <section class="section highlights-hero" id="gallery">
      <div class="container">
        <h2 class="section-title">Photo Highlights</h2>
        <p class="section-lead">A glimpse into what we do: presentations, contests, socials, and more.</p>
      </div>
    </section>

    <section class="section highlights-section">
      <div class="container">
        <Masonry images={highlights} onOpen={onOpenLightbox} colorShiftOnHover />
        <div class="highlights-cta">
          <a class="btn btn-secondary" href="/gallery"><i class="fa-solid fa-images"></i> View Full Gallery</a>
        </div>
      </div>
    </section>
  {/if}

  <CTACard title="Anyone Can Join" lead="No sign-ups, fees, or experience necessary. If you show up to meetings, you're a part of the club.">
    <a class="btn btn-primary" href="/join"><i class="fa-solid fa-user-plus"></i> Learn How to Join</a>
    <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a>
  </CTACard>
</Shell>

<Lightbox image={selectedImage} onClose={onCloseLightbox} />

<style>
  .hero-section {
    padding: 3rem 0;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2rem;
    align-items: center;
  }

  .hero-copy {
    display: grid;
    gap: 1.2rem;
  }

  .hero-actions,
  .overview-actions,
  .events-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .hero-card {
    padding: 1.5rem;
    background: var(--color-surface);
  }

  .hero-logo-wrap {
    display: grid;
    place-items: center;
    min-height: 240px;
  }

  .hero-logo {
    width: min(80%, 420px);
    aspect-ratio: 1;
    object-fit: contain;
    padding: 1.5rem;
  }

  .hero-stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.9rem;
    margin-top: 1rem;
  }

  .hero-stat {
    padding: 1rem;
    background: var(--color-orange);
    color: var(--color-black);
    border: 3px solid var(--color-orange);
  }

  .hero-stat strong {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 1.2rem;
  }

  .hero-stat p {
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.75rem;
    opacity: 0.92;
  }

  .achievements-strip {
    padding: 2rem 0;
  }

  .achievements-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .achievement-card {
    padding: 1.5rem;
    text-align: center;
    background: var(--color-orange);
    color: var(--color-black);
    border: 3px solid var(--color-orange);
  }

  .achievement-card strong {
    display: block;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .achievement-card p {
    margin: 0;
    font-size: 0.85rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .event-card {
    padding: 1.2rem;
    border: 3px solid var(--color-orange);
    background: var(--color-orange);
    color: var(--color-black);
  }

  .event-date {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.75rem;
    border: 2px solid currentColor;
    font-size: 0.8rem;
    font-weight: 800;
  }

  .event-card h3 {
    margin: 0 0 0.4rem;
    font-size: 1.1rem;
  }

  .event-card p {
    margin: 0;
    opacity: 0.85;
    font-size: 0.9rem;
  }

  .overview-band {
    border-top: 3px solid var(--color-orange);
    border-bottom: 3px solid var(--color-orange);
    background: rgba(255, 255, 255, 0.02);
  }

  .overview-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 2rem;
    align-items: start;
  }

  .overview-text p {
    margin: 0 0 1rem;
    font-size: 1.05rem;
    color: var(--color-text-muted);
  }

  .overview-actions {
    margin-top: 1.5rem;
  }

  .overview-cards {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .cs-club-card {
    padding: 1rem;
    border: 3px solid var(--color-orange);
    background: var(--color-orange);
    color: var(--color-black);
  }

  .cs-club-card strong {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .cs-club-card p {
    margin: 0;
    font-size: 0.85rem;
    opacity: 0.9;
  }

  .subclub-card {
    padding: 0.75rem 1rem;
    border: 3px solid var(--color-white);
    background: var(--color-surface);
    color: var(--color-text);
  }

  .subclub-card strong {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .subclub-card p {
    margin: 0;
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .subclubs-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .highlights-hero { padding: 4rem 0 1rem; }
  .highlights-section { padding-top: 0; }
  .highlights-cta { margin-top: 2rem; }

  .events-cta {
    margin-top: 2rem;
  }

  @media (max-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }
    .achievements-grid,
    .events-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .hero-stat-grid {
      grid-template-columns: 1fr;
    }
    .achievements-grid,
    .events-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
