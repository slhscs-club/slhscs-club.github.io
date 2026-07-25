import { a4 as head, a8 as bind_props, a9 as ensure_array_like, aa as attr, ac as stringify, e as escape_html } from "../../../chunks/index.js";
import { S as Shell } from "../../../chunks/Shell.js";
function _page($$renderer, $$props) {
  let data = $$props["data"];
  const { resources } = data;
  head("gczoum", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Resources | SLHS CS Club</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Guides, slides, and resources from the Seven Lakes High School Computer Science Club."/>`);
  });
  Shell($$renderer, {
    activePage: "resources",
    children: ($$renderer2) => {
      $$renderer2.push(`<section class="section res-hero svelte-gczoum"><div class="container"><h1 class="page-title">Resources</h1> <p class="page-subtitle svelte-gczoum">Guides, slideshows, and learning materials from our club presentations.</p></div></section> <section class="section"><div class="container"><h2 class="section-title">Available Resources</h2> `);
      if (resources.length > 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="resources-grid svelte-gczoum"><!--[-->`);
        const each_array = ensure_array_like(resources);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let resource = each_array[$$index];
          $$renderer2.push(`<a${attr("href", `/resources/${stringify(resource.slug)}`)} class="resource-card color-orange svelte-gczoum"><span class="resource-type svelte-gczoum">${escape_html(resource.type)}</span> <h3 class="svelte-gczoum">${escape_html(resource.title)}</h3> <p class="svelte-gczoum">Click to view resource.</p></a>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="resources-grid svelte-gczoum"><div class="resource-card color-orange svelte-gczoum"><span class="resource-type svelte-gczoum">Info</span> <h3 class="svelte-gczoum">No Resources Yet</h3> <p class="svelte-gczoum">Check back soon for learning materials!</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></section> <section class="section"><div class="container cta-card color-orange svelte-gczoum"><h2 class="section-title svelte-gczoum">Have a resource to share?</h2> <p class="section-lead svelte-gczoum">If you've created a presentation or guide, we'd love to include it here. Let us know on Discord.</p> <div class="cta-actions svelte-gczoum"><a class="btn btn-primary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a> <a class="btn btn-secondary" href="/"><i class="fa-solid fa-house"></i> Back Home</a></div></div></section>`);
    },
    $$slots: { default: true }
  });
  bind_props($$props, { data });
}
export {
  _page as default
};
