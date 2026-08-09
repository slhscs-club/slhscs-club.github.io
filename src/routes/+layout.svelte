<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';

  onMount(() => {
    let frame = 0;
    let latestEvent: PointerEvent | null = null;
    const cursor = document.createElement('span');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);
    const titles = document.querySelectorAll<HTMLElement>('.page-title, .section-title');
    titles.forEach((title) => {
      const words = title.textContent?.trim().split(/\s+/) ?? [];
      title.innerHTML = words.map((word) => `<span class="word-reveal">${word}</span>`).join(' ');
    });
    const scroll = () => document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    const move = (event: PointerEvent) => {
      latestEvent = event;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        const current = latestEvent;
        if (!current) return;
        document.querySelectorAll<HTMLElement>('.magnetic, .tilt-card').forEach((element) => {
          const rect = element.getBoundingClientRect();
          const dx = current.clientX - (rect.left + rect.width / 2);
          const dy = current.clientY - (rect.top + rect.height / 2);
          const distance = Math.hypot(dx, dy);
          if (element.classList.contains('magnetic') && distance < 140) {
            const pull = Math.max(0, 1 - distance / 140);
            element.style.setProperty('--mag-x', `${dx * pull * 0.12}px`);
            element.style.setProperty('--mag-y', `${dy * pull * 0.12}px`);
          }
          if (element.classList.contains('tilt-card')) {
            element.style.setProperty('--tilt-x', `${Math.max(-5, Math.min(5, -dy / rect.height * 5))}deg`);
            element.style.setProperty('--tilt-y', `${Math.max(-5, Math.min(5, dx / rect.width * 5))}deg`);
          }
        });
      });
    };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 });
    document.querySelectorAll('.section, .btn, .carousel-slide, .event-row, .section-title, .page-title').forEach((element) => observer.observe(element));
    document.querySelectorAll('.btn, .join-btn').forEach((element) => element.classList.add('magnetic'));
    document.querySelectorAll('.story-card, .carousel-card, .event-row, .achievement-card').forEach((element) => element.classList.add('tilt-card'));
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    scroll();
    return () => { observer.disconnect(); window.removeEventListener('pointermove', move); window.removeEventListener('scroll', scroll); cursor.remove(); if (frame) cancelAnimationFrame(frame); };
  });
</script>

<svelte:head>
  <link rel="icon" href="/assets/logos/logo.png" type="image/png" />
  <link rel="apple-touch-icon" href="/assets/logos/logo.png" />
  <meta name="theme-color" content="#0d0d0d" />
</svelte:head>

<slot />
