import { a4 as head } from "../../../chunks/index.js";
import { S as Shell } from "../../../chunks/Shell.js";
function _page($$renderer) {
  head("1x05zx6", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Login | SLHS CS Club</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Login to the Seven Lakes High School Computer Science Club web portal."/>`);
  });
  Shell($$renderer, {
    activePage: "login",
    children: ($$renderer2) => {
      $$renderer2.push(`<section class="section login-hero svelte-1x05zx6"><div class="container"><h1 class="page-title">Web Portal</h1> <p class="page-subtitle svelte-1x05zx6">Login to access club resources, manage your profile, and more. This feature is coming soon.</p></div></section> <section class="section"><div class="login-card svelte-1x05zx6"><div class="login-form svelte-1x05zx6"><h2 class="section-title">Sign In</h2> <p>Portal login is not yet available. Check back later!</p> <a class="btn btn-primary" href="/"><i class="fa-solid fa-house"></i> Back Home</a></div></div></section>`);
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
