import { a4 as head, a8 as bind_props, e as escape_html, aa as attr } from "../../../../chunks/index.js";
import { S as Shell } from "../../../../chunks/Shell.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function _page($$renderer, $$props) {
  let data = $$props["data"];
  const { resource } = data;
  head("11r77t0", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>${escape_html(resource.title)} | SLHS CS Club</title>`);
    });
    $$renderer2.push(`<meta name="description" content="View resource from Seven Lakes High School Computer Science Club."/>`);
  });
  Shell($$renderer, {
    activePage: "resources",
    children: ($$renderer2) => {
      $$renderer2.push(`<section class="section res-hero svelte-11r77t0"><div class="container"><h1 class="page-title">${escape_html(resource.title)}</h1> <p class="page-subtitle svelte-11r77t0">${escape_html(resource.type)}</p></div></section> <section class="section"><div class="container">`);
      if (!resource.isBinary && resource.rendered) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="article-body svelte-11r77t0"><div class="markdown-content svelte-11r77t0">${html(resource.rendered)}</div></div> <div class="resource-actions svelte-11r77t0"><a class="btn btn-secondary" href="/resources"><i class="fa-solid fa-arrow-left"></i> Back to Resources</a></div>`);
      } else if (resource.filename.endsWith(".pdf") || resource.filename.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`<div class="resource-viewer svelte-11r77t0">`);
        if (resource.filename.endsWith(".pdf")) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<iframe${attr("src", resource.url)} class="pdf-viewer svelte-11r77t0"${attr("title", resource.title)}></iframe> <div class="resource-actions svelte-11r77t0"><a class="btn btn-primary"${attr("href", resource.url)} target="_blank" rel="noopener"><i class="fa-solid fa-external-link"></i> Open in New Tab</a></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<div class="image-viewer svelte-11r77t0"><img${attr("src", resource.url)}${attr("alt", resource.title)} class="svelte-11r77t0"/></div> <div class="resource-actions svelte-11r77t0"><a class="btn btn-primary"${attr("href", resource.url)} target="_blank" rel="noopener"><i class="fa-solid fa-download"></i> Download Image</a></div>`);
        }
        $$renderer2.push(`<!--]--> <div class="resource-actions svelte-11r77t0"><a class="btn btn-secondary" href="/resources"><i class="fa-solid fa-arrow-left"></i> Back to Resources</a></div></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="resource-viewer svelte-11r77t0"><div class="resource-placeholder svelte-11r77t0"><i class="fa-solid fa-file svelte-11r77t0"></i> <p>This file type cannot be previewed directly. Click below to download.</p> <div class="resource-actions svelte-11r77t0" style="margin-top: 2rem;"><a class="btn btn-primary"${attr("href", resource.url)} download=""><i class="fa-solid fa-download svelte-11r77t0"></i> Download File</a> <a class="btn btn-secondary" href="/resources"><i class="fa-solid fa-arrow-left svelte-11r77t0"></i> Back to Resources</a></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></section>`);
    },
    $$slots: { default: true }
  });
  bind_props($$props, { data });
}
export {
  _page as default
};
