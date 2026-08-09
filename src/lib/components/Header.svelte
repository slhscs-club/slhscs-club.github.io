<script lang="ts">
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
    { href: '/opportunities', label: 'Opportunities' },
    { href: '/resources', label: 'Resources' },
    { href: '/gallery', label: 'Gallery' }
  ];
</script>

<div class="sticky-top">
  <header class:nav-open={navOpen}>
    <a class="logo" href="/">
      <img class="logo-img" src="/assets/logos/logo.png" alt="SLHS CS Club" />
      SLHS CS Club
    </a>
    <nav>
      {#each navLinks as link}
        <a href={link.href} aria-current={link.href === '/' + activePage || (link.href === '/' && activePage === 'home') ? 'page' : undefined}>{link.label}</a>
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
