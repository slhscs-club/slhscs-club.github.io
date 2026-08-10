<script lang="ts">
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  let {
    activePage = 'home'
  }: {
    activePage?: string;
  } = $props();

  let navOpen = $state(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/competitions', label: 'Competitions' },
    { href: '/resources', label: 'Resources' },
    { href: '/gallery', label: 'Gallery' }
  ];

  let navEl: HTMLElement;
  let indicator: HTMLElement;

  function isActive(link: { href: string }): boolean {
    return link.href === '/' + activePage || (link.href === '/' && activePage === 'home');
  }

  function placeIndicator(el: HTMLElement | null) {
    if (!indicator || !navEl) return;
    if (!el) el = navEl.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!el) {
      indicator.style.opacity = '0';
      return;
    }
    const navRect = navEl.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    indicator.style.left = `${rect.left - navRect.left}px`;
    indicator.style.width = `${rect.width}px`;
    indicator.dataset.active = 'true';
    indicator.style.opacity = '1';
  }

  onMount(() => placeIndicator(null));
  afterNavigate(() => placeIndicator(null));
</script>

<div class="sticky-top">
  <header class:nav-open={navOpen}>
    <a class="logo" href="/">
      <img class="logo-img" src="/assets/logos/logo.png" alt="SLHS CS Club" />
      SLHS CS Club
    </a>
    <nav bind:this={navEl} onpointerleave={() => placeIndicator(null)}>
      <span class="nav-indicator" bind:this={indicator}></span>
      {#each navLinks as link}
        <a
          href={link.href}
          aria-current={isActive(link) ? 'page' : undefined}
          onpointerenter={(e) => placeIndicator(e.currentTarget)}
        >{link.label}</a>
      {/each}
    </nav>
    <div class="header-icons">
      <a class="icon-btn" href="https://discord.com/invite/eCRC3TCs" aria-label="Discord"><i class="fa-brands fa-discord"></i></a>
      <a class="icon-btn" href="https://www.instagram.com/slhscs/" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
      <a class="join-btn" href="/join"><i class="fa-solid fa-user-plus"></i> Join</a>
      <button class="burger-btn" aria-label="Menu" type="button" onclick={() => (navOpen = !navOpen)}>
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </header>
</div>
