import { a6 as attr_class, a7 as clsx, a4 as head, a8 as bind_props, a9 as ensure_array_like, e as escape_html, aa as attr } from "../../chunks/index.js";
import { S as Shell } from "../../chunks/Shell.js";
import { f as formatEventDate } from "../../chunks/ics.js";
function CountUp($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      class: className = ""
    } = $$props;
    $$renderer2.push(`<span${attr_class(clsx(className))}></span>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    const { highlights, events: serverEvents } = data;
    const achievements = [
      {
        prefix: "",
        num: 4,
        suffix: "x",
        label: "UIL State Championships"
      },
      {
        prefix: "",
        num: 20,
        suffix: "+",
        label: "Individual UIL State Attendees"
      },
      { prefix: "≈", num: 15, suffix: "", label: "Years Running" },
      {
        prefix: "",
        num: 50,
        suffix: "+",
        label: "Honor Society Members"
      }
    ];
    let events = serverEvents.map((e) => ({ ...e, start: new Date(e.start) }));
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>SLHS Computer Science Club</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Seven Lakes High School Computer Science Club - Connect, develop skills, and serve our school."/> <meta property="og:title" content="SLHS Computer Science Club"/> <meta property="og:description" content="Seven Lakes High School Computer Science Club - Connect, develop skills, and serve our school."/> <meta property="og:image" content="/assets/logos/logo.png"/>`);
    });
    Shell($$renderer2, {
      activePage: "home",
      children: ($$renderer3) => {
        $$renderer3.push(`<section class="section hero-section svelte-1uha8ag"><div class="container hero-grid svelte-1uha8ag"><div class="hero-copy svelte-1uha8ag"><h1 class="page-title">SLHS Computer Science Club</h1> <p class="page-subtitle">We're the <b>Seven Lakes High School Computer Science Club</b>, a place for students interested in CS to connect, develop their skills, and serve their school.</p> <div class="hero-actions svelte-1uha8ag"><a class="btn btn-primary btn-large" href="/join"><i class="fa-solid fa-user-plus"></i> Join the Club</a> <a class="btn btn-secondary btn-large" href="/about"><i class="fa-solid fa-circle-info"></i> Learn More</a></div></div> <div class="hero-card svelte-1uha8ag"><div class="hero-logo-wrap svelte-1uha8ag"><img class="hero-logo-img svelte-1uha8ag" src="/assets/logos/logo.png" alt="SLHS CS Club"/></div> <div class="hero-stat-grid svelte-1uha8ag"><div class="hero-stat svelte-1uha8ag"><strong class="svelte-1uha8ag">Mondays</strong> <p class="svelte-1uha8ag">at 2:45 PM</p></div> <div class="hero-stat svelte-1uha8ag"><strong class="svelte-1uha8ag">Room</strong> <p class="svelte-1uha8ag">1001</p></div> <div class="hero-stat svelte-1uha8ag"><strong class="svelte-1uha8ag">Free</strong> <p class="svelte-1uha8ag">for everyone</p></div></div></div></div></section> <section class="section section-tight achievements-strip svelte-1uha8ag"><div class="container"><div class="achievements-grid svelte-1uha8ag"><!--[-->`);
        const each_array = ensure_array_like(achievements);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let ach = each_array[$$index];
          $$renderer3.push(`<div class="achievement-card svelte-1uha8ag"><strong class="svelte-1uha8ag">${escape_html(ach.prefix)}`);
          CountUp($$renderer3, {
            to: ach.num
          });
          $$renderer3.push(`<!---->${escape_html(ach.suffix)}</strong> <p class="svelte-1uha8ag">${escape_html(ach.label)}</p></div>`);
        }
        $$renderer3.push(`<!--]--></div></div></section> <section class="section" id="events"><div class="container"><h2 class="section-title">Upcoming Events</h2> <p class="section-lead">Here's a snapshot of what's coming up.</p> <div class="events-grid svelte-1uha8ag">`);
        if (events.length === 0) {
          $$renderer3.push("<!--[1-->");
          $$renderer3.push(`<div class="event-card svelte-1uha8ag"><span class="event-date svelte-1uha8ag">Soon</span> <h3 class="svelte-1uha8ag">Weekly Meetings</h3> <p class="svelte-1uha8ag">Mondays at 2:45 PM in Room 1001</p></div>`);
        } else {
          $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(events);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let event = each_array_1[$$index_1];
            $$renderer3.push(`<div class="event-card svelte-1uha8ag"><span class="event-date svelte-1uha8ag">${escape_html(formatEventDate(event.start))}</span> <h3 class="svelte-1uha8ag">${escape_html(event.summary)}</h3> `);
            if (event.description) {
              $$renderer3.push("<!--[0-->");
              $$renderer3.push(`<p class="svelte-1uha8ag">${escape_html(event.description)}</p>`);
            } else {
              $$renderer3.push("<!--[-1-->");
            }
            $$renderer3.push(`<!--]--></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></div> <div class="events-cta svelte-1uha8ag"><a class="btn btn-secondary" href="/calendar"><i class="fa-solid fa-calendar"></i> View Full Calendar</a></div></div></section> <section class="section overview-band svelte-1uha8ag" id="overview"><div class="container overview-grid svelte-1uha8ag"><div class="overview-text svelte-1uha8ag"><h2 class="section-title">How the Club Works</h2> <p class="svelte-1uha8ag">Seven Lakes Computer Science Club holds weekly presentations on CS topics delivered by our own members, creating an enviroment for all Seven Lakes students interested in CS.</p> <p class="svelte-1uha8ag">We have several <b>subclubs</b> with their own focus areas, created by our own club members and officers.</p> <div class="overview-actions svelte-1uha8ag"><a class="btn btn-primary" href="/about"><i class="fa-solid fa-arrow-right"></i> Read More About Us</a> <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a></div></div> <div class="overview-cards svelte-1uha8ag"><div class="stat-card cs-club-card svelte-1uha8ag"><strong class="svelte-1uha8ag">Computer Science Club</strong> <p class="svelte-1uha8ag">Weekly presentations</p></div> <div class="subclubs-row svelte-1uha8ag"><div class="subclub-card svelte-1uha8ag"><strong class="svelte-1uha8ag">Competitive Programming</strong> <p class="svelte-1uha8ag">Contests &amp; practice</p></div> <div class="subclub-card svelte-1uha8ag"><strong class="svelte-1uha8ag">AI</strong> <p class="svelte-1uha8ag">Machine learning topics</p></div></div> <div class="subclubs-row svelte-1uha8ag"><div class="subclub-card svelte-1uha8ag"><strong class="svelte-1uha8ag">Girls Who Code</strong> <p class="svelte-1uha8ag">Women-only chapter of Girls Who Code nonprofit</p></div> <div class="subclub-card svelte-1uha8ag"><strong class="svelte-1uha8ag">Honor Society</strong> <p class="svelte-1uha8ag">Academic excellence</p></div></div></div></div></section> `);
        if (highlights && highlights.length > 0) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<section class="section highlights-hero svelte-1uha8ag" id="gallery"><div class="container"><h2 class="section-title">Photo Highlights</h2> <p class="section-lead">A glimpse into what we do: presentations, contests, socials, and more.</p></div></section> <section class="section highlights-section svelte-1uha8ag"><div class="container"><div class="highlights-grid svelte-1uha8ag"><!--[-->`);
          const each_array_2 = ensure_array_like(highlights);
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let img = each_array_2[$$index_2];
            $$renderer3.push(`<div class="highlight-card svelte-1uha8ag"><img${attr("src", img.src)}${attr("alt", img.alt)} loading="lazy" class="svelte-1uha8ag"/></div>`);
          }
          $$renderer3.push(`<!--]--></div> <div class="highlights-cta svelte-1uha8ag"><a class="btn btn-secondary" href="/gallery"><i class="fa-solid fa-images"></i> View Full Gallery</a></div></div></section> `);
          {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> <section class="section" id="join"><div class="container join-card svelte-1uha8ag"><h2 class="section-title svelte-1uha8ag">Anyone Can Join</h2> <p class="section-lead svelte-1uha8ag">No sign-ups, fees, or experience necessary. If you show up to meetings, you're part of the club.</p> <div class="join-actions svelte-1uha8ag"><a class="btn btn-primary" href="/join"><i class="fa-solid fa-user-plus"></i> Learn How to Join</a> <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a></div></div></section>`);
      },
      $$slots: { default: true }
    });
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
