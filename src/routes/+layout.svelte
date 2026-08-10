<script lang="ts">
  import { onMount } from 'svelte';
  import { onNavigate, afterNavigate } from '$app/navigation';
  import '../app.css';

  let frame = 0;
  let latestEvent: PointerEvent | null = null;
  let cursor: HTMLElement | null = null;
  let observer: IntersectionObserver | null = null;
  let magTiltEls: HTMLElement[] = [];

  const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealHeadings() {
    document.querySelectorAll<HTMLElement>('.page-title, .section-title').forEach((title) => {
      if (title.querySelector('.word-reveal')) return;
      const words = title.textContent?.trim().split(/\s+/) ?? [];
      if (words.length <= 1) return;
      title.innerHTML = words.map((word) => `<span class="word-reveal">${word}</span>`).join(' ');
    });
  }

  function scan() {
    revealHeadings();
    observer?.disconnect();
    observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.section, .btn, .carousel-slide, .event-row, .section-title, .page-title').forEach((el) => observer?.observe(el));
    document.querySelectorAll('.btn, .join-btn').forEach((el) => el.classList.add('magnetic'));
    document.querySelectorAll('.story-card, .carousel-card, .event-row, .achievement-card').forEach((el) => el.classList.add('tilt-card'));
    magTiltEls = Array.from(document.querySelectorAll<HTMLElement>('.magnetic, .tilt-card'));
  }

  const scroll = () => document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);

  const move = (event: PointerEvent) => {
    latestEvent = event;
    if (cursor) cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    if (!frame) {
      frame = requestAnimationFrame(() => {
        frame = 0;
        const current = latestEvent;
        if (!current) return;
        const els = magTiltEls;
        for (let i = 0; i < els.length; i++) {
          const element = els[i];
          const rect = element.getBoundingClientRect();
          const dx = current.clientX - (rect.left + rect.width / 2);
          const dy = current.clientY - (rect.top + rect.height / 2);
          const distSq = dx * dx + dy * dy;
          if (element.classList.contains('magnetic') && distSq < 19600) {
            const pull = 1 - Math.sqrt(distSq) / 140;
            element.style.setProperty('--mag-x', `${dx * pull * 0.12}px`);
            element.style.setProperty('--mag-y', `${dy * pull * 0.12}px`);
          }
          if (element.classList.contains('tilt-card')) {
            element.style.setProperty('--tilt-x', `${Math.max(-5, Math.min(5, -dy / rect.height * 5))}deg`);
            element.style.setProperty('--tilt-y', `${Math.max(-5, Math.min(5, dx / rect.width * 5))}deg`);
          }
        }
      });
    }
  };

  onMount(() => {
    cursor = document.createElement('span');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);
    const cursorEl = cursor;

    scan();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    scroll();

    return () => {
      observer?.disconnect();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', scroll);
      cursorEl.remove();
      cursor = null;
      if (frame) cancelAnimationFrame(frame);
    };
  });

  afterNavigate(() => {
    scroll();
    requestAnimationFrame(() => scan());
  });

  onNavigate((navigation) => {
    if (prefersReduced() || typeof document.startViewTransition !== 'function') return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <link rel="icon" href="/assets/logos/logo.png" type="image/png" />
  <link rel="apple-touch-icon" href="/assets/logos/logo.png" />
  <meta name="theme-color" content="#0a0c10" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" referrerpolicy="no-referrer" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    @font-face { font-family: 'Seven Segment'; src: url('/fonts/Seven Segment.ttf') format('truetype'); font-display: swap; }
  </style>
</svelte:head>

<slot />
