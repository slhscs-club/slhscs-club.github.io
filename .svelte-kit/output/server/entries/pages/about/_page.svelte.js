import { a4 as head, a9 as ensure_array_like, e as escape_html, aa as attr, a6 as attr_class, ab as attr_style, ac as stringify, a3 as derived } from "../../../chunks/index.js";
import { S as Shell } from "../../../chunks/Shell.js";
const abhayGodavarthy = "/_app/immutable/assets/abhay-godavarthy.4-RCvCux.jpg?url=true";
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: abhayGodavarthy
}, Symbol.toStringTag, { value: "Module" }));
const austinYu = "/_app/immutable/assets/austin-yu.XcIubRCX.jpg?url=true";
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: austinYu
}, Symbol.toStringTag, { value: "Module" }));
const avikaShrivastava = "/_app/immutable/assets/avika-shrivastava.XIViC0bN.jpeg?url=true";
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: avikaShrivastava
}, Symbol.toStringTag, { value: "Module" }));
const erenTor = "/_app/immutable/assets/eren-tor.CasUbD0x.png?url=true";
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: erenTor
}, Symbol.toStringTag, { value: "Module" }));
const jacksonMacgregor = "/_app/immutable/assets/jackson-macgregor.BT8969zf.jpg?url=true";
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jacksonMacgregor
}, Symbol.toStringTag, { value: "Module" }));
const kushagraNagar = "/_app/immutable/assets/kushagra-nagar.CBxJzqUm.png?url=true";
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kushagraNagar
}, Symbol.toStringTag, { value: "Module" }));
const saanviSaxena = "/_app/immutable/assets/saanvi-saxena._1fb5gRg.jpg?url=true";
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: saanviSaxena
}, Symbol.toStringTag, { value: "Module" }));
const shravniRotithor = "/_app/immutable/assets/shravni-rotithor.BC5PLIJj.jpg?url=true";
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: shravniRotithor
}, Symbol.toStringTag, { value: "Module" }));
function createCarouselState(totalSlides, visibleSlides = 3) {
  return {
    currentIndex: 0,
    totalSlides,
    maxIndex: totalSlides - visibleSlides,
    dragStartX: 0,
    dragDeltaX: 0,
    isDragging: false,
    dragOffset: 0
  };
}
function getTrackTransform(state, visibleSlides = 3) {
  return `translateX(calc(-${state.currentIndex * (100 / visibleSlides)}% + ${state.dragOffset}px))`;
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const officerImages = /* @__PURE__ */ Object.assign({ "/src/lib/assets/officers/abhay-godavarthy.jpg": __vite_glob_0_0, "/src/lib/assets/officers/austin-yu.jpg": __vite_glob_0_1, "/src/lib/assets/officers/avika-shrivastava.jpeg": __vite_glob_0_2, "/src/lib/assets/officers/eren-tor.png": __vite_glob_0_3, "/src/lib/assets/officers/jackson-macgregor.jpg": __vite_glob_0_4, "/src/lib/assets/officers/kushagra-nagar.png": __vite_glob_0_5, "/src/lib/assets/officers/saanvi-saxena.jpg": __vite_glob_0_6, "/src/lib/assets/officers/shravni-rotithor.jpg": __vite_glob_0_7 });
    function getOfficerImage(name) {
      const hyphenated = name.toLowerCase().replace(/\s+/g, "-");
      const match = Object.entries(officerImages).find(([path]) => path.includes(`/${hyphenated}.`));
      return match ? match[1].default : void 0;
    }
    const officers = [
      { name: "Abhay Godavarthy", role: "President" },
      { name: "Shravni Rotithor", role: "Vice President" },
      { name: "Saanvi Saxena", role: "Treasurer + Secretary" },
      { name: "Avika Shrivastava", role: "Historian" },
      { name: "Eren Tor", role: "Competitive Programming Lead" },
      { name: "Austin Yu", role: "Contest Lead" },
      { name: "Kushagra Nagar", role: "Outreach Manager" },
      { name: "Jackson MacGregor", role: "Web Development" }
    ];
    const faqItems = [
      {
        q: "What activities does the club do?",
        a: "We hold presentations on computer science topics every week, practice for contests, host a national contest and UIL invitational, and provide an environment for Seven Lakes students interested in computer science to connect with each other."
      },
      {
        q: "How do I join?",
        a: "Our club is open to anyone who wants to attend our meetings. No sign up is required and we don't keep a list of members."
      },
      {
        q: "Do I have to pay any fees?",
        a: "No! Our club is completely free to everyone. If you meet the requirements and would like to join National CS Honor Society after a year, then we ask for a small fee to cover the cost of the Honor Society."
      },
      {
        q: "Do I need to compete to be in the club?",
        a: "Competitions are not required. We encourage everyone to give contests a try because they're fun and a great way to improve your problem solving skills, but we recognize that there wide range of interests in CS beyond competitions."
      }
    ];
    let carousel = createCarouselState(officers.length, 3);
    let trackTransform = derived(() => getTrackTransform(carousel, 3));
    head("cwls5q", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>About | SLHS CS Club</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Learn about the Seven Lakes High School Computer Science Club - history, how we work, and our officers."/>`);
    });
    Shell($$renderer2, {
      activePage: "about",
      children: ($$renderer3) => {
        $$renderer3.push(`<section class="section about-hero svelte-cwls5q"><div class="container"><h1 class="page-title">About Us</h1> <p class="page-subtitle svelte-cwls5q">Learn about the Seven Lakes High School Computer Science Club</p></div></section> <section class="section"><div class="container"><h2 class="section-title">Our History</h2> <p>The Seven Lakes High School Computer Science Club has been running for around 15 years, growing from a UIL academics team into one of the most active clubs on campus. We've hosted national programming contests with over 350 attendees, won UIL CS State multiple times, and built a community that welcomes students of all skill levels and interests.</p></div></section> <section class="section overview-band svelte-cwls5q"><div class="container"><h2 class="section-title">How the Club Works</h2> <p class="section-lead">We meet every Monday at 2:45 PM in Room 1001. Here's how we're structured.</p> <div class="structure-grid svelte-cwls5q"><div class="structure-card color-orange svelte-cwls5q"><h3 class="svelte-cwls5q">Weekly Meetings</h3> <p class="svelte-cwls5q">Every Monday after school, we hold a general meeting with presentations on CS topics delivered by our own members. Topics range from algorithms and data structures to web development, game dev, and career advice.</p></div> <div class="structure-card color-orange svelte-cwls5q"><h3 class="svelte-cwls5q">Competitive Programming</h3> <p class="svelte-cwls5q">We hold weekly CP practice sessions where members work through programming problems together. We attend several local contests throughout the year hosted by neighboring schools, plus USACO, HP Code Wars, and UIL CS.</p></div> <div class="structure-card color-orange svelte-cwls5q"><h3 class="svelte-cwls5q">National October Contest</h3> <p class="svelte-cwls5q">Every year we host our own national programming contest, produced entirely by the CS Club. We need problem writers, testers, judges, and volunteers to help put the event together.</p></div> <div class="structure-card color-orange svelte-cwls5q"><h3 class="svelte-cwls5q">Social Events</h3> <p class="svelte-cwls5q">We also run social events throughout the year to help members connect and build community outside of coding.</p></div></div></div></section> <section class="section"><div class="container"><h2 class="section-title">Frequently Asked Questions</h2> <div class="faq-list svelte-cwls5q"><!--[-->`);
        const each_array = ensure_array_like(faqItems);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          $$renderer3.push(`<div class="faq-item color-orange svelte-cwls5q"><h3 class="svelte-cwls5q">${escape_html(item.q)}</h3> <p class="svelte-cwls5q">${escape_html(item.a)}</p></div>`);
        }
        $$renderer3.push(`<!--]--></div></div></section> <section class="section"><div class="container"><h2 class="section-title">Our Officers</h2> <p class="section-lead">The students who keep the club running:</p> <div class="carousel svelte-cwls5q"><button class="carousel-btn carousel-btn--prev svelte-cwls5q" aria-label="Previous"${attr("disabled", carousel.currentIndex === 0, true)}><i class="fa-solid fa-chevron-left"></i></button> <div class="carousel-viewport svelte-cwls5q" role="region"><div${attr_class("carousel-track svelte-cwls5q", void 0, { "dragging": carousel.isDragging })}${attr_style(`transform: ${stringify(trackTransform())}`)}><!--[-->`);
        const each_array_1 = ensure_array_like(officers);
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          let officer = each_array_1[i];
          const img = getOfficerImage(officer.name);
          $$renderer3.push(`<div class="carousel-slide svelte-cwls5q"><div class="officer-card svelte-cwls5q"><div class="officer-image svelte-cwls5q"${attr_style(img ? `background-image: url(${img})` : "")}><i class="fa-solid fa-user svelte-cwls5q"${attr_style(img ? "display: none;" : "")}></i></div></div> <div class="officer-info svelte-cwls5q"><h3 class="svelte-cwls5q">${escape_html(officer.name)}</h3> <p class="svelte-cwls5q">${escape_html(officer.role)}</p></div></div>`);
        }
        $$renderer3.push(`<!--]--></div></div> <button class="carousel-btn carousel-btn--next svelte-cwls5q" aria-label="Next"${attr("disabled", carousel.currentIndex >= carousel.maxIndex, true)}><i class="fa-solid fa-chevron-right"></i></button></div> <div class="carousel-dots svelte-cwls5q"><!--[-->`);
        const each_array_2 = ensure_array_like(officers);
        for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
          each_array_2[i];
          if (i <= carousel.maxIndex) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<button${attr_class("carousel-dot svelte-cwls5q", void 0, { "active": i === carousel.currentIndex })}${attr("aria-label", `Go to officers ${stringify(i + 1)}-${stringify(i + 3)}`)}></button>`);
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></div></div></section> <section class="section"><div class="container cta-card color-orange svelte-cwls5q"><h2 class="section-title svelte-cwls5q">Want to get involved?</h2> <p class="section-lead svelte-cwls5q">Come to a meeting or join our Discord to learn more.</p> <div class="cta-actions svelte-cwls5q"><a class="btn btn-primary" href="/join"><i class="fa-solid fa-user-plus"></i> Join the Club</a> <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a></div></div></section>`);
      },
      $$slots: { default: true }
    });
  });
}
export {
  _page as default
};
