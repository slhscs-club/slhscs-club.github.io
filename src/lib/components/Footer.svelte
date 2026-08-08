<script lang="ts">
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