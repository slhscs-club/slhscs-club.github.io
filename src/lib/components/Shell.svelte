<script lang="ts">
  export let activePage: string = 'home';

  let navOpen = false;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/competitions', label: 'Competitions' },
    { href: '/resources', label: 'Resources' },
    { href: '/gallery', label: 'Gallery' }
  ];

  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/join', label: 'Join' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/competitions', label: 'Competitions' },
    { href: '/resources', label: 'Resources' },
    { href: '/gallery', label: 'Gallery' },
    { href: 'https://discord.com/invite/eCRC3TCs', label: 'Discord' },
    { href: 'https://www.instagram.com/slhscs/', label: 'Instagram' },
    { href: 'https://github.com/slhscs', label: 'GitHub' }
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

<main class="main-shell">
  <slot />
</main>

<div class="footer-wrap">
  <footer class="container">
    <div class="footer-main">
      <a class="footer-brand" href="/">
        <img class="logo-img" src="/assets/logos/logo.png" alt="SLHS CS Club" />
        SLHS CS Club
      </a>
      <div class="footer-links">
        {#each footerLinks as link}
          <a href={link.href}>{link.label}</a>
        {/each}
      </div>
    </div>
    <div class="footer-bottom">Seven Lakes High School Computer Science Club ~ Made with ❤️ by our members</div>
  </footer>
</div>