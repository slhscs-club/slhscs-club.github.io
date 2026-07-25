import { a4 as head, a9 as ensure_array_like, aa as attr } from "../../../chunks/index.js";
import { S as Shell } from "../../../chunks/Shell.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const { galleryImages } = data;
    head("16h6p05", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Gallery | SLHS CS Club</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Photo gallery from the Seven Lakes High School Computer Science Club."/>`);
    });
    Shell($$renderer2, {
      activePage: "gallery",
      children: ($$renderer3) => {
        $$renderer3.push(`<section class="section gallery-hero svelte-16h6p05"><div class="container"><h1 class="page-title">Gallery</h1> <p class="page-subtitle svelte-16h6p05">Photos from our meetings, contests, socials, and events throughout the year.</p></div></section> <section class="section"><div class="container">`);
        if (galleryImages.length > 0) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div class="gallery-grid svelte-16h6p05"><!--[-->`);
          const each_array = ensure_array_like(galleryImages);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let img = each_array[$$index];
            $$renderer3.push(`<div class="gallery-card svelte-16h6p05"><img${attr("src", img.src)}${attr("alt", img.alt)} loading="lazy" class="svelte-16h6p05"/></div>`);
          }
          $$renderer3.push(`<!--]--></div>`);
        } else {
          $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<div class="gallery-grid svelte-16h6p05"><div class="gallery-card svelte-16h6p05"><div class="gallery-placeholder svelte-16h6p05"><i class="fa-solid fa-image svelte-16h6p05"></i> <span>No photos yet - check back soon!</span></div></div></div>`);
        }
        $$renderer3.push(`<!--]--></div></section> <section class="section"><div class="container cta-card color-orange svelte-16h6p05"><h2 class="section-title svelte-16h6p05">Have photos to share?</h2> <p class="section-lead svelte-16h6p05">Send us your photos from club events and we'll add them to the gallery.</p> <div class="cta-actions svelte-16h6p05"><a class="btn btn-primary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Share on Discord</a> <a class="btn btn-secondary" href="/"><i class="fa-solid fa-house"></i> Back Home</a></div></div></section>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
