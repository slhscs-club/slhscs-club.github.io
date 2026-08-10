<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
  import Masonry from '$lib/components/Masonry.svelte';
  import Lightbox from '$lib/components/Lightbox.svelte';
  import ParticleLogo from '$lib/components/ParticleLogo.svelte';
  import SegmentDisplay from '$lib/components/SegmentDisplay.svelte';
  import StoryCarousel from '$lib/components/StoryCarousel.svelte';
  import type { PageData } from './$types';
  import { formatEventDate } from '$lib/ics';
  import { openLightbox, closeLightbox, type LightboxImage } from '$lib/lightbox';
  import { onMount } from 'svelte';

  let { data }: { data: PageData } = $props();
  const { highlights, events: serverEvents } = data;

  let selectedImage: LightboxImage | null = null;

  function onOpenLightbox(img: LightboxImage) { selectedImage = openLightbox(img); }
  function onCloseLightbox() { selectedImage = closeLightbox(); }

  const achievements = [
    { prefix: '', num: 4, suffix: 'x', label: 'UIL State Championships' },
    { prefix: '', num: 20, suffix: '+', label: 'Individual UIL State Attendees' },
    { prefix: '~', num: 15, suffix: '', label: 'Years Running' },
    { prefix: '', num: 50, suffix: '+', label: 'Honor Society Members' }
  ];

  let events = serverEvents.map((e: any) => ({ ...e, start: new Date(e.start) }));
  let loadingEvents = false;

  const homeImages = import.meta.glob('$lib/assets/home/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
  const orderedHomeImages = Object.entries(homeImages).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));

  const subclubs = [
    { icon: 'fa-code', title: 'Competitive Programming', description: 'Contests & practice', link: '/comp' },
    { icon: 'fa-robot', title: 'AI', description: 'Machine learning topics' },
    { icon: 'fa-people-group', title: 'Girls Who Code', description: 'Women-only chapter' },
    { icon: 'fa-award', title: 'Honor Society', description: 'Academic excellence', link: '/cshs' },
    { icon: 'fa-mobile-screen', title: 'App Development', description: 'Front-end & back-end' },
    { icon: 'fa-plus', title: 'And More', description: 'Start your own subclub' }
  ];

  let chargeIn = $state(false);
  onMount(() => { setTimeout(() => (chargeIn = true), 400); });
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
        <h1 class="page-title"><SegmentDisplay text="SLHS Computer Science Club" /></h1>
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
          <ParticleLogo />
        </div>
        <div class="hero-stat-grid" class:charged={chargeIn}>
          <div class="hero-stat"><strong>Mondays</strong><p>at 2:45 PM</p></div>
          <div class="hero-stat"><strong>Room 1001</strong><p>after school</p></div>
          <div class="hero-stat"><strong>Free to join</strong><p>for every Seven Lakes student</p></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="events">
    <div class="container">
      <h2 class="section-title">Upcoming Events</h2>
      <p class="section-lead">Here's a snapshot of what's coming up.</p>
    </div>
    <div class="events-bleed">
      {#if loadingEvents}
        <div class="event-card"><span class="event-date">Loading...</span><h3>Upcoming Events</h3><p>Fetching from calendar...</p></div>
      {:else if events.length === 0}
        <div class="event-card"><span class="event-date">Soon</span><h3>Weekly Meetings</h3><p>Mondays at 2:45 PM in Room 1001</p></div>
      {:else}
        <StoryCarousel ariaLabel="Upcoming events" items={events.map((event) => ({ image: orderedHomeImages[0]?.[1] ?? '/assets/logos/logo.png', eyebrow: formatEventDate(event.start), title: event.summary, description: event.description ?? 'Join us for the next club event.' }))} />
      {/if}
    </div>
    <div class="container events-cta">
      <a class="btn btn-secondary" href="/calendar"><i class="fa-solid fa-calendar"></i> View Full Calendar</a>
    </div>
  </section>

  <section class="section overview-band" id="overview">
    <div class="container overview-grid">
      <div class="overview-text">
        <h2 class="section-title">How the Club Works</h2>
        <p>Seven Lakes Computer Science Club holds weekly presentations on CS topics delivered by our own members, creating an environment for all Seven Lakes students interested in CS.</p>
        <p>We have several <b>subclubs</b> with their own focus areas, created by our own club members and officers.</p>
        <div class="overview-actions">
          <a class="btn btn-primary" href="/about"><i class="fa-solid fa-arrow-right"></i> Read More About Us</a>
          <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a>
        </div>
      </div>
      <div class="overview-cards">
        <div class="cs-club-card"><i class="fa-solid fa-laptop-code"></i><div><strong>Computer Science Club</strong><p>Weekly presentations & community</p></div></div>
        <div class="subclubs-grid">
          {#each subclubs as sub}
            {#if sub.link}
              <a href={sub.link} class="subclub-card"><i class="fa-solid {sub.icon}"></i><strong>{sub.title}</strong><p>{sub.description}</p></a>
            {:else}
              <div class="subclub-card"><i class="fa-solid {sub.icon}"></i><strong>{sub.title}</strong><p>{sub.description}</p></div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </section>

  {#if highlights && highlights.length > 0}
    <section class="section highlights-hero" id="gallery"><div class="container"><h2 class="section-title">Photo Highlights</h2><p class="section-lead">A glimpse into what we do: presentations, contests, socials, and more.</p></div></section>
    <section class="section highlights-section"><div class="container"><Masonry images={highlights} onOpen={onOpenLightbox} colorShiftOnHover /><div class="highlights-cta"><a class="btn btn-secondary" href="/gallery"><i class="fa-solid fa-images"></i> View Full Gallery</a></div></div></section>
  {/if}

  <CTACard title="Anyone Can Join" lead="No sign-ups, fees, or experience necessary. If you show up to meetings, you're a part of the club.">
    <a class="btn btn-primary" href="/join"><i class="fa-solid fa-user-plus"></i> Learn How to Join</a>
    <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a>
  </CTACard>
</Shell>

<Lightbox image={selectedImage} onClose={onCloseLightbox} />

<style>
  .hero-section { padding: 3rem 0; }
  .hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 2rem; align-items: center; }
  .hero-copy { display: grid; gap: 1.2rem; }
  .hero-copy .page-subtitle { max-width: 40ch; }
  .hero-actions, .overview-actions, .events-cta, .highlights-cta { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 0.5rem; }

  .hero-card { padding: 1.5rem; background: var(--color-surface); }
  .hero-logo-wrap { position: relative; width: 100%; min-height: 420px; display: grid; place-items: center; overflow: hidden; }
  .hero-logo-wrap :global(.particle-logo) { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 1; }

  .hero-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-top: 1rem; }
  .hero-stat-grid.charged .hero-stat { transform: translateX(0); opacity: 1; }
  .hero-stat { padding: 0.75rem 0.5rem; text-align: center; border: 1px solid var(--color-navy); border-top: 3px solid var(--color-orange); background: var(--color-surface); color: var(--color-text); transform: translateX(60px); opacity: 0; transition: transform 0.6s cubic-bezier(.175,.885,.32,1.275), opacity 0.5s ease; }
  .hero-stat:nth-child(1) { transition-delay: 0s; }
  .hero-stat:nth-child(2) { transition-delay: 0.1s; }
  .hero-stat:nth-child(3) { transition-delay: 0.2s; }
  .hero-stat strong { display: block; margin-bottom: 0.15rem; font-size: 1.05rem; }
  .hero-stat p { margin: 0; text-transform: uppercase; letter-spacing: 0.04em; font-size: 0.72rem; opacity: 0.8; color: var(--color-text-muted); }

  .events-bleed { position: relative; width: 100vw; left: 50%; margin-left: -50vw; }
  .event-card { max-width: 420px; margin: 0 auto; padding: 1.2rem; border: 3px solid var(--color-orange); background: var(--color-orange); color: var(--color-black); }
  .event-date { display: inline-block; padding: 0.25rem 0.5rem; margin-bottom: 0.75rem; border: 2px solid currentColor; font-size: 0.8rem; font-weight: 800; }
  .event-card h3 { margin: 0 0 0.4rem; font-size: 1.1rem; }
  .event-card p { margin: 0; opacity: 0.85; font-size: 0.9rem; }

  .overview-band { border-top: 3px solid var(--color-orange); border-bottom: 3px solid var(--color-orange); background: rgba(255,255,255,0.02); }
  .overview-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 2.5rem; align-items: start; }
  .overview-text p { margin: 0 0 1rem; font-size: 1.05rem; color: var(--color-text-muted); }
  .overview-actions { margin-top: 1.5rem; }
  .overview-cards { display: flex; flex-direction: column; gap: 0.75rem; }

  .cs-club-card { display: flex; align-items: center; gap: 1rem; padding: 1.1rem; border: 3px solid var(--color-orange); background: var(--color-orange); color: var(--color-black); box-shadow: var(--orange-shadow); }
  .cs-club-card i { font-size: 1.8rem; flex: 0 0 auto; }
  .cs-club-card strong { display: block; font-size: 1.05rem; margin-bottom: 0.25rem; }
  .cs-club-card p { margin: 0; font-size: 0.85rem; opacity: 0.9; }

  .subclubs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
  .subclub-card { display: flex; flex-direction: column; gap: 0.3rem; padding: 0.85rem 0.95rem; border: 1px solid var(--color-navy); border-top: 3px solid var(--color-orange); background: var(--color-surface); color: var(--color-text); transition: transform .4s cubic-bezier(.175,.885,.32,1.275), box-shadow .4s ease; }
  .subclub-card:hover { transform: translateY(-3px); box-shadow: 4px 4px 0 var(--color-orange); }
  .subclub-card i { color: var(--color-orange); font-size: 1.1rem; }
  .subclub-card strong { font-size: 0.95rem; }
  .subclub-card p { margin: 0; font-size: 0.78rem; opacity: 0.8; color: var(--color-text-muted); }
  a.subclub-card { text-decoration: none; color: inherit; cursor: pointer; }

  .highlights-hero { padding: 4rem 0 1rem; }
  .highlights-section { padding-top: 0; }

  @media (max-width: 1024px) { .hero-grid { grid-template-columns: 1fr; } }
  @media (max-width: 768px) {
    .hero-section { padding: 2rem 0; }
    .hero-logo-wrap { min-height: 280px; }
    .hero-stat-grid { grid-template-columns: 1fr; }
    .overview-grid { grid-template-columns: 1fr; }
    .subclubs-grid { grid-template-columns: 1fr; }
  }
</style>
