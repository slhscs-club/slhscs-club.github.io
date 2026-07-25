import { a6 as attr_class, a9 as ensure_array_like, aa as attr, e as escape_html, a5 as slot, a8 as bind_props, ad as fallback } from "./index.js";
function Shell($$renderer, $$props) {
  let activePage = fallback($$props["activePage"], "home");
  let navOpen = false;
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/calendar", label: "Calendar" },
    { href: "/competitions", label: "Competitions" },
    { href: "/resources", label: "Resources" },
    { href: "/gallery", label: "Gallery" }
  ];
  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/join", label: "Join" },
    { href: "/calendar", label: "Calendar" },
    { href: "/competitions", label: "Competitions" },
    { href: "/resources", label: "Resources" },
    { href: "/gallery", label: "Gallery" },
    {
      href: "https://discord.com/invite/eCRC3TCs",
      label: "Discord"
    },
    {
      href: "https://www.instagram.com/slhscs/",
      label: "Instagram"
    },
    { href: "https://github.com/slhscs", label: "GitHub" }
  ];
  $$renderer.push(`<div class="sticky-top"><header${attr_class("", void 0, { "nav-open": navOpen })}><a class="logo" href="/"><img class="logo-img" src="/assets/logos/logo.png" alt="SLHS CS Club"/> SLHS CS Club</a> <nav><!--[-->`);
  const each_array = ensure_array_like(navLinks);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let link = each_array[$$index];
    $$renderer.push(`<a${attr("href", link.href)}${attr("aria-current", link.href === "/" + activePage || link.href === "/" && activePage === "home" ? "page" : void 0)}>${escape_html(link.label)}</a>`);
  }
  $$renderer.push(`<!--]--></nav> <div class="header-icons"><a class="icon-btn" href="https://discord.com/invite/eCRC3TCs" aria-label="Discord"><i class="fa-brands fa-discord"></i></a> <a class="icon-btn" href="https://www.instagram.com/slhscs/" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a> <a class="join-btn" href="/join"><i class="fa-solid fa-user-plus"></i> Join</a> <button class="burger-btn" aria-label="Menu" type="button"><i class="fa-solid fa-bars"></i></button></div></header></div> <main class="main-shell"><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></main> <div class="footer-wrap"><footer class="container"><div class="footer-main"><a class="footer-brand" href="/"><img class="logo-img" src="/assets/logos/logo.png" alt="SLHS CS Club"/> SLHS CS Club</a> <div class="footer-links"><!--[-->`);
  const each_array_1 = ensure_array_like(footerLinks);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let link = each_array_1[$$index_1];
    $$renderer.push(`<a${attr("href", link.href)}>${escape_html(link.label)}</a>`);
  }
  $$renderer.push(`<!--]--></div></div> <div class="footer-bottom">Seven Lakes High School Computer Science Club ~ Made with ❤️ by our members</div></footer></div>`);
  bind_props($$props, { activePage });
}
export {
  Shell as S
};
