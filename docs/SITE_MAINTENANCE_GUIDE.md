# SLHS CS Club — Site Maintenance Guide

This is the complete guide for the Seven Lakes High School Computer Science Club website.
It covers how the site is built, how every part works, and exactly what to touch to add,
remove, update, restyle, or debug anything on the site. It assumes you can run commands in
a terminal and edit files in a text editor. You do **not** need to be a professional
developer to maintain most of this site.

---

## Table of contents

1. [The stack at a glance](#the-stack-at-a-glance)
2. [Running the site](#running-the-site)
3. [The golden rules](#the-golden-rules)
4. [Project layout](#project-layout)
5. [The design system (colors, borders, type, motion)](#the-design-system)
6. [Global behavior & animations](#global-behavior--animations)
7. [Navigation & header](#navigation--header)
8. [Footer](#footer)
9. [Homepage](#homepage)
10. [The particle logo](#the-particle-logo)
11. [Calendar page](#calendar-page)
12. [About page & the officers carousel](#about-page--the-officers-carousel)
13. [Competitions page](#competitions-page)
14. [Join page](#join-page)
15. [Opportunities page](#opportunities-page)
16. [Gallery & Masonry](#gallery--masonry)
17. [Resources](#resources)
18. [Login page](#login-page)
19. [Adding & removing pages (routes)](#adding--removing-pages-routes)
20. [The animation system](#the-animation-system)
21. [Page transitions](#page-transitions)
22. [Event data & the calendar feed](#event-data--the-calendar-feed)
23. [Testing workflow](#testing-workflow)
24. [Deployment](#deployment)
25. [Troubleshooting](#troubleshooting)

---

## The stack at a glance

- **SvelteKit 2** (Svelte 5 with runes) — the framework. Pages are components.
- **Vite** — the build tool. `npm run dev` is the hot-reload dev server.
- **TypeScript** — the language. Svelte files can contain `<script lang="ts">`.
- **Adapter static** — the site is pre-rendered to plain HTML in `build/` and deployed to
  GitHub Pages. There is no server at runtime; everything is static + client-side JS.
- **GSAP** — used only by the photo masonry for entrance animations.
- **date-fns** — used by the calendar/ICS parser.
- **Font Awesome 6** (loaded from CDN) — all the icons (`<i class="fa-solid fa-...">`).
- **Google Fonts** — Bricolage Grotesque (body) and IBM Plex Mono (titles/mono).

The site is a single-page app that is also pre-rendered to HTML. Navigation between pages
happens client-side (SvelteKit), with optional "View Transitions" animations.

---

## Running the site

All commands run from the project root.

```bash
npm install          # first time only — installs everything
npm run dev          # live dev server with hot reload (http://localhost:5173)
npm run check        # type-checks all Svelte + TypeScript (run before finishing work)
npm run build        # production build → writes the site to build/
npm run preview      # serves the built site (http://localhost:4173)
```

Workflow for editing:

1. `npm run dev` and keep it open while you edit — changes appear instantly.
2. When done, run `npm run check` (must be **0 errors**) and `npm run build`.
3. If you want to see the real production bundle, `npm run preview` **after** a build.
   Preview serves whatever is in `build/` and does **not** rebuild. Always rebuild first.

> `npm run preview` binds to `localhost` (IPv6). Use `http://localhost:4173` in your
> browser — `127.0.0.1:4173` will not connect.

---

## The golden rules

1. **Edit design tokens, not hard-coded hex values.** All colors live in `src/app.css`
   under `:root`. If you need a new shade, add a token there, then reference it.
2. **Orange = action/highlight. Navy = structure/border. White = text.** Fills of large
   solid orange should be reserved for buttons and small accents; cards use a navy border
   with an orange top edge instead of big orange blocks.
3. **Never change link colors on `:visited`.** There is a global rule that keeps visited
   links the same color. Don't add visited-link styling.
4. **Keep it animated, but respect `prefers-reduced-motion`.** The site already respects
   reduced motion globally via CSS and in the particle logo. New animations should use
   `transform` and `opacity` only (GPU-friendly) and be disabled for reduced motion.
5. **Run `npm run check` and `npm run build` before handing off.**
6. **Svelte 5 runes.** In `<script>` blocks, state is `$state(...)`, derived values are
   `$derived(...)`, and reactive side effects are `$effect(...)`. Do **not** use legacy
   `export let` or `$: label = ...` in a file that already uses runes.

---

## Project layout

```
src/
  app.css                  ← GLOBAL styles + design tokens. Almost every look change starts here.
  routes/                  ← Pages. One folder per URL.
    +layout.svelte         ← Wraps every page: fonts, cursor, animations, page transitions.
    +layout.ts             ← Loads shared root data.
    +page.svelte           ← Homepage (/)
    +page.server.ts        ← Homepage data (calendar events, gallery highlights).
    about/+page.svelte     ← About, stats, structure, FAQ, officers.
    calendar/+page.svelte  ← Calendar grid + "Next Up" rail.
    competitions/+page.svelte
    join/+page.svelte
    opportunities/+page.svelte
    resources/+page.svelte        ← list of resource cards
    resources/[slug]/+page.svelte ← individual resource viewer
    gallery/+page.svelte
    login/+page.svelte
  lib/
    components/            ← Reusable components (Header, Footer, Shell, Carousel, …).
    carousel.ts            ← (legacy helper, kept for compatibility)
    calendar.ts            ← calendar-grid math + "upcoming events" helpers.
    ics.ts                 ← ICS/calendar-feed parsing + event types + date formatting.
    lightbox.ts            ← shared lightbox state.
    format.ts              ← number formatting helpers.
    assets/                ← build-imported images (officers, gallery, home, resources).
static/
  assets/                  ← files served at stable public URLs (the logo, favicon).
  ...
docs/                      ← this guide.
build/                     ← generated. Do not edit by hand; it is replaced on every build.
```

**Components in `src/lib/components/`:**

| Component | Purpose |
|---|---|
| `Shell.svelte` | Layout wrapper: header + main + footer. Every page renders inside it. |
| `Header.svelte` | Sticky nav bar with the sliding "morphing" indicator. |
| `Footer.svelte` | Footer with link grid. |
| `PageHero.svelte` | The big centered title + subtitle used at the top of inner pages. |
| `CTACard.svelte` | The orange-bordered call-to-action banner near the bottom of pages. |
| `ParticleLogo.svelte` | The dot-based animated logo in the homepage hero. |
| `StoryCarousel.svelte` | The full-width swipeable card rail used for upcoming events. |
| `Carousel.svelte` | The cyclic "spinning wheel" carousel used for officers. |
| `Masonry.svelte` | The animated photo grid used by gallery + homepage highlights. |
| `Lightbox.svelte` | Fullscreen photo viewer opened from the masonry. |
| `CountUp.svelte` | Number counter that animates when scrolled into view. |

---

## The design system

Everything visual is controlled from **`src/app.css`**. Read this section before changing
any look; 90% of "the site looks wrong" is fixed here.

### Color tokens (top of `src/app.css`)

```css
--color-bg: #0a0c10;          /* near-black page background */
--color-surface: #14171f;     /* card background */
--color-surface-2: #1a1e29;   /* slightly lighter surface (stripes, date badges) */
--color-black: #000000;
--color-white: #ffffff;
--color-text: #f1f2f4;        /* main text — near white */
--color-text-muted: #a9b2c2;  /* secondary text */
--color-orange: #ff6b2c;      /* PRIMARY accent / action color */
--color-navy: #263650;        /* SECONDARY border accent */
--color-blue: #263650;        /* legacy alias of navy — keep in sync */
```

Rules of thumb:

- **Too much orange?** Replace a solid `background: var(--color-orange)` block with the
  standard card recipe: `border: 1px solid var(--color-navy); border-top: 3px solid
  var(--color-orange); background: var(--color-surface);`. Orange should remain for
  buttons, badges, dates, icons, and 3px accent borders.
- **Navy is a border accent, never a big fill.** Use `var(--color-navy)` for borders and
  1px frames. If a card currently has a full navy background, convert it to the card
  recipe above.
- **Text should be white/near-white** (`--color-text`) on dark surfaces. Muted text
  (`--color-text-muted`) is for secondary lines only.

### Border / shadow helpers

```css
--orange-border: 3px solid var(--color-orange);
--blue-border: 3px solid var(--color-navy);
--subtle-border: 1px solid var(--color-navy);     /* the standard card frame */
--orange-shadow: 4px 4px 0 var(--color-orange);   /* hard "brutalist" offset shadow */
```

### Typography

```css
--font-base:  "Bricolage Grotesque", …;   /* body */
--font-title: "IBM Plex Mono", …;         /* h1/h2 page titles */
--font-mono:  "IBM Plex Mono", …;         /* dates, labels, numbers, badges */
```

- `.page-title` — the giant hero title (mono).
- `.section-title` — section headings (mono).
- `.section-lead` — the grey intro paragraph under a section title.
- `.page-subtitle` — the grey line under a page hero.

### How to restyle one page vs. the whole site

- **Whole site** → edit tokens / global rules in `src/app.css`.
- **One component** → edit the `<style>` block at the bottom of that component's `.svelte` file.
- **One page** → edit the `<style>` block at the bottom of `src/routes/<page>/+page.svelte`.

Svelte scopes styles: a rule written in a component only applies to elements in that
component. To intentionally style a child component from a page, you need `:global(...)`.

---

## Global behavior & animations

`src/routes/+layout.svelte` runs on every page and is the home of the site-wide motion:

- **Custom cursor** — a small orange ring follows the pointer (desktop only). Hidden on
  touch devices. Styled as `.cursor-dot` in `app.css`.
- **Cursor spotlight** — a soft orange radial glow follows the mouse, via the CSS
  variables `--cursor-x` / `--cursor-y` set on `<html>` and used in the `body`
  `background-image`.
- **Word reveal** — every `.page-title` and `.section-title` is split into
  `<span class="word-reveal">` words that animate in when the heading scrolls into view.
  Done in `revealHeadings()`; the spans only get the fade if `.is-visible` is added by the
  `IntersectionObserver` in `scan()`.
- **Magnetic buttons** — `.btn` and `.join-btn` are given the `magnetic` class, which makes
  them drift toward the cursor within ~140px.
- **Tilt cards** — `.story-card`, `.carousel-card`, `.event-row`, `.achievement-card` get
  the `tilt-card` class → they rotate subtly toward the cursor.
- **Scroll parallax** — the `.hero-copy` and `.particle-logo` shift at slightly different
  speeds while scrolling (driven by `--scroll-y`).
- **Section reveal** — sections fade in when scrolled into view (`scan()` + `.is-visible`).
- **Page transitions** — optional View Transitions (see [Page transitions](#page-transitions)).

The `scan()` function re-runs on every client-side navigation (`afterNavigate`), so the
animations keep working when moving between pages without a full reload.

---

## Navigation & header

**File:** `src/lib/components/Header.svelte`

### Adding / removing / reordering links

Edit the `navLinks` array:

```ts
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/competitions', label: 'Competitions' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/resources', label: 'Resources' },
  { href: '/gallery', label: 'Gallery' }
];
```

- Each entry is `{ href, label }`. `href` can be an internal route (`/about`) or an
  external URL (`https://…`).
- The **Join** button is intentionally separate (`.join-btn`) and should stay a persistent
  action instead of a nav tab.
- The active page gets `aria-current="page"`, which the CSS uses to show the orange
  underline. Active state is computed from the `activePage` prop that each page passes to
  `<Shell activePage="...">`.

### The morphing navigation indicator

Inside `<nav>` there is a `<span class="nav-indicator">`. `placeIndicator(el)` positions
it under whatever link is hovered (or the active page when not hovering), and it **slides**
between links thanks to the `transition: left …, width …` on `.nav-indicator` in
`app.css`. It is hidden on mobile (the mobile menu is a vertical list instead).

### Colors / no visited-link color change

In `app.css`, the global rule `a:visited { color: inherit; }` guarantees visited links
look identical to unvisited ones. `header nav a` and the `.logo` are styled white
(`var(--color-text)`). Do not add `a:visited` overrides.

### Mobile menu

The burger button toggles `navOpen`, adding `nav-open` to `<header>`, which reveals the
vertical nav. The sliding indicator is hidden on mobile (`nav .nav-indicator { display: none }`).

---

## Footer

**File:** `src/lib/components/Footer.svelte`

Edit the `footerLinks` array the same way as nav links. External URLs work. The footer
has an animated gradient-mesh background (`footer-wrap::before` in `app.css`) and an
orange top border. The "Made with ❤️" line is in the `footer-bottom` div.

---

## Homepage

**File:** `src/routes/+page.svelte`
**Data:** `src/routes/+page.server.ts`

Sections, top to bottom:

### 1. Hero (`hero-section`)

- **Particle logo** (`<ParticleLogo />`) — the animated dot glyph on the right. See
  [The particle logo](#the-particle-logo).
- **`hero-copy`** — the title, subtitle, and the two buttons.
- **`hero-facts`** — the three "Mondays / Room 1001 / Free to join" blocks. Edit the
  three `.hero-fact` elements directly.
- The orange blob and gradient mesh behind the hero come from `.hero-section::before` /
  `::after` in `app.css`.

### 2. Upcoming events (full-bleed)

```svelte
<section class="section" id="events">
  <div class="container">…title + lead…</div>
  <div class="events-bleed">            ← breaks out to 100% viewport width
    <StoryCarousel … />                 ← the swipeable card rail
  </div>
  <div class="container events-cta">…</div>
</section>
```

The `.events-bleed` class is the full-width trick:

```css
.events-bleed {
  position: relative;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
}
```

The carousel's edge fade is a `mask-image` on `.story-track` inside `StoryCarousel.svelte`.
Cards show the event date (eyebrow), title, and description. The images come from
`src/lib/assets/home/` — add files named `1.jpg`, `2.png`, `3.webp`, etc.; numeric sort
determines order. Change the input shape in `+page.svelte` if you want a different image
per event.

### 3. How the Club Works (`overview-band`)

Left column: intro text + buttons. Right column (`overview-cards`):

- The orange **CS Club** highlight card (`.cs-club-card`).
- A 2×3 grid of **subclub cards** driven by the `subclubs` array in the script:

```ts
const subclubs = [
  { icon: 'fa-code', title: 'Competitive Programming', description: 'Contests & practice' },
  { icon: 'fa-robot', title: 'AI', description: 'Machine learning topics' },
  // …
];
```

To add/remove/rename a subclub, edit this array. Icons are Font Awesome class names
(`fa-robot`, `fa-code`, …). Keep titles short; keep descriptions short.

### 4. Photo Highlights (`#gallery`)

Two sections: the heading, then a `<Masonry images={highlights} …>`. Highlights are
randomly picked daily from the gallery in `+page.server.ts`. This section only renders if
there are highlights. **This section is considered good — leave it alone.**

### 5. Call-to-action

`<CTACard title="Anyone Can Join" lead="…">` with two buttons. See `CTACard.svelte`.

---

## The particle logo

**File:** `src/lib/components/ParticleLogo.svelte`

This is the dot-based logo in the hero. It was rewritten to match the original site
(`github.com/slhscs-club/club`, `scripts/logo-particles.js`).

### How it works

1. It loads `static/assets/logos/logo.png`.
2. It draws the logo onto an offscreen 512×512 canvas and reads the pixels.
3. It walks a **grid with step 11px** (`.step = 11`). For every sample pixel whose alpha
   is above `150`, it creates a **particle** whose *destination* is that logo position.
4. Particles start scattered and **spring** to their destinations every frame with
   velocity + friction physics (same formula as the original site):

   ```
   accel = (dest - pos) / 90
   vel += accel
   vel *= 0.955
   pos += vel
   ```

5. The **pointer repels** particles within `radius * 80` px. Clicking cycles `radius`
   from 1 → 4 (the burst effect).
6. Dots are drawn as rectangles, batched by color (white vs. grey) to minimize canvas
   state changes.

### Tuning density

- **`step`** (currently `11`) — grid spacing. Smaller = more dots, larger = fewer.
  The original used 12px over a full-screen canvas. `11` over a 512px logo gives a
  comparable dot density.
- **Dot size** — `r: Math.random() * 3.4 + 1.8` (≈1.8–5.2px). Bigger = chunkier glyph.
- **Alpha threshold** — `> 150` (out of 255) decides which pixels count as "logo".
  Lower = more dots (includes anti-aliased edge pixels).
- **Logo size** — `logoSize = Math.min(560, cssH * 0.96, cssW * 0.6)` in `geometry()`.

### Why it's fast now

The old version drew **connection lines between every nearby pair of particles every
frame** — that was the O(n²) loop that made it lag. The new version has **no per-frame
pair loops**: it only moves + draws each dot. Other performance measures:

- `devicePixelRatio` is capped at 2 (no 4k canvas on high-DPI screens).
- The canvas rect is **cached** (refreshed on scroll/resize, never on every `pointermove`),
  so moving the mouse never forces layout.
- The render loop **freezes completely when idle** (`frozen` flag): once the dots settle and
  the pointer leaves the logo, the `requestAnimationFrame` loop stops and the last painted
  frame stays on screen. Idle cost is literally zero. The loop only wakes when the pointer
  approaches, when the user clicks (burst), or on resize. A measured frame while animating
  is ~0.3–0.5 ms for the full ~1,400 dots — far under the 16.7 ms budget for 60 fps.
- The animation **pauses when the tab is hidden** (`visibilitychange`).
- Resize is **debounced** (200 ms) so it doesn't re-sample the logo on every frame.
- `prefers-reduced-motion` draws the static logo image directly instead of animating.

> Typical particle count ≈ 1,000–1,500. That matches the original site's density and
> runs at 60 fps on real (GPU-accelerated) browsers.

---

## Calendar page

**File:** `src/routes/calendar/+page.svelte`
**Helpers:** `src/lib/calendar.ts` (grid math, upcoming list), `src/lib/ics.ts`
(ICS parsing, event types, date formatting).

The page has three pieces:

### 1. "Next up" countdown banner (`.next-strip`)

The next upcoming event with a live countdown (`Xd Yh Zm`). It updates once a minute via
a `$effect` + `setInterval`. Only renders when there is a next event.

### 2. Month grid (`.calendar-section`)

The classic month calendar. Month arrows call `prevMonth` / `nextMonth`. Days come from
`generateCalendarDays()`. Each day shows up to 3 event chips; extra ones collapse into
"+N more". Event chips are small orange pills (`.day-event`).

### 3. "Next Up" rail (`.upcoming-section`)

A dense, compact list of the next 8 events (change the count by editing
`getUpcomingEvents(events, 8)`). Each row is:

- A **date badge** (big day number + month) on the left.
- The **event title** and a one-line meta (`Weekday · Time`).
- A **type chip** (`meeting`, `contest`, `cp`, `social`, `special`).

This rail sits beside the month grid on desktop (2-column layout) and below it on mobile.
It is `position: sticky` on desktop so it follows you as you scroll.

### Changing event categorization

`getEventType(summary, description)` in `src/lib/ics.ts` detects keywords
(`contest|competition`, `cp|competitive|practice|uil`, `social`, `speaker|workshop`).
Edit the regexes there to change how events are tagged. The type chip label comes from
that function. Event colors are intentionally all orange.

### Count of upcoming events

`getUpcomingEvents(events, 8)` in `calendar.ts` — the second argument is how many events
the rail shows.

---

## About page & the officers carousel

**File:** `src/routes/about/+page.svelte`

Sections:

1. **PageHero** ("About Us").
2. **Our History** — left column narrative; right column a 2×2 grid of animated
   **achievement counters** (`.achievement-card` + `<CountUp>`). Edit the `achievements`
   array:

   ```ts
   const achievements = [
     { prefix: '', num: 4, suffix: 'x', label: 'UIL State Championships' },
     // prefix = text before the number, suffix = text after, num = count-to target
   ];
   ```

3. **How the Club Works** — the `structure` array drives 4 cards (icon + title + text).
4. **FAQ** — the `faqItems` array drives a 2-column card grid.
5. **Our Officers** — the carousel (below).
6. **CTACard**.

### The officers carousel (spinning wheel)

The `Carousel.svelte` component was rewritten to feel like a **continuous wheel**:

- The list is rendered **three times** so the track never runs out of slides.
- Navigation wraps seamlessly: going past the last officer brings you back to the first
  without a jump (it teleports between identical copies with the transition disabled).
- The **current index is kept in the middle copy** so forward/back both work forever.
- **Autoplay** advances every 4 s (`autoplayInterval`), pausing on hover/drag/reduced-motion.
- **Edge fading + 3D spin**: each slide gets an opacity and `rotateY` scale based on its
  distance from the center of the viewport — side cards fade and tilt like they're on a
  spinning disc.
- The dots at the bottom map to the real officers; the active dot follows the loop index.
- Drag-to-scroll is supported (`onDragStart`/`onDragMove`/`onDragEnd`).

### Adding an officer

1. Add to the `officers` array: `{ name: 'First Last', role: 'Title' }`.
2. Drop a photo into `src/lib/assets/officers/` named with lowercase-hyphenated name,
   e.g. `first-last.jpg`. Supported: jpg, jpeg, png, gif, webp, avif.
3. The page auto-matches name → file via `getOfficerImage()`.

### Tuning the carousel

- `visibleSlides={3}` on the `<Carousel>` tag — how many officers are shown at once
  (auto-drops to 2 on tablets, 1 on phones).
- `autoplayInterval` — ms between auto-advances.
- The fade curve lives in the `fade` / `scale` / `spin` consts inside
  `Carousel.svelte`'s `#each` block. `peak = visible / 2` controls how quickly slides fade.

---

## Competitions page

**File:** `src/routes/competitions/+page.svelte`

The page is fully data-driven — you never write card markup to add a competition.

### Attended competitions

Edit the `attended` array. Each entry is `[title, short description]`:

```ts
const attended = [
  ['HP Code Wars', 'Annual contest hosted by Hewlett Packard'],
  ['USACO', 'Online contests throughout the year'],
  // …
];
```

### Hosted competitions

Edit the `hosted` array. Each entry is an object with a `title`, a `badge`
(the small mono label), a `description`, and an optional `callout` (the orange volunteer
nudge):

```ts
const hosted = [
  {
    title: 'Annual October Contest',
    badge: 'Flagship National Contest',
    description: 'Every year our annual October contest is hosted online and in-person with over 350 people in attendance. The contest is produced entirely by the CS Club.',
    callout: 'We need problem writers, testers, judges, and volunteers to help put the event together!'
  },
  // …
];
```

The "View our contest schedule" link (`.mono-text`) points to apluscompsci.com — edit it
if the schedule moves.

---

## Join page

**File:** `src/routes/join/+page.svelte`

- **General Membership** — the `benefits-grid` of 4 benefit cards. Edit directly.
- **CSHS band** — requirements card + the "Register for CSHS" form box. The form link is
  the `window.open('https://docs.google.com/forms/…', '_blank')` inside the
  `signup-form-box` click handler — replace that URL to point to a new form.
- **CTACard**.

---

## Opportunities page

**File:** `src/routes/opportunities/+page.svelte`

A three-card grid driven by the `opportunities` array (`{ title, description }`), then a
"Start something new" band and a CTA. Add/remove entries by editing the array.

---

## Gallery & Masonry

**Files:** `src/routes/gallery/+page.svelte`, `src/lib/components/Masonry.svelte`

- Drop photos into `src/lib/assets/gallery/`. They appear automatically, newest-first by
  file modification time.
- The grid is a responsive masonry: 5 columns on very wide screens down to 1 on phones.
- Hover scales + tints the photo and slides a color overlay in (`colorShiftOnHover`).
- Clicking opens the `Lightbox` fullscreen viewer.
- The homepage "Photo Highlights" reuses the same `Masonry` with a subset of images.

To change the entrance animation: the `<Masonry animateFrom="bottom" …>` prop accepts
`bottom | top | left | right | center | random`.

---

## Resources

**Files:** `src/routes/resources/+page.svelte`, `src/routes/resources/[slug]/+page.svelte`

- Drop files into `src/lib/assets/resources/`.
- `.md` → rendered as HTML; `.pdf` → embedded viewer; images → displayed as an image.
- The filename becomes the title + URL slug (`intro-to-python.md` → `/resources/intro-to-python`).
- Delete a file to remove the resource.

---

## Login page

**File:** `src/routes/login/+page.svelte`

A placeholder/legacy page. It is not linked from the header. You can safely delete the
`src/routes/login/` folder if it is no longer wanted (see next section).

---

## Adding & removing pages (routes)

Adding a page:

1. Create a folder: `src/routes/my-page/` with a `+page.svelte`.
2. Wrap the content in `<Shell activePage="my-page">…</Shell>`.
3. If it should appear in navigation, add `{ href: '/my-page', label: 'My Page' }` to
   `navLinks` in `Header.svelte` (and optionally to `footerLinks` in `Footer.svelte`).
4. Run `npm run check`.

Removing a page:

1. Delete the folder `src/routes/my-page/`.
2. Remove its entry from `Header.svelte` (and `Footer.svelte` if present).
3. Run `npm run check` to catch any stale imports/links.

SvelteKit auto-generates routes from folders. `+page.svelte` = the page component;
`+page.server.ts` = server-only data loading (used by home + calendar to fetch the
calendar feed); `[slug]/+page.svelte` = dynamic route.

---

## The animation system

Everything is driven from `src/routes/+layout.svelte` + `src/app.css` + a few components.

**What's already installed and where:**

| Effect | Where |
|---|---|
| Cursor-reactive dot field | `ParticleLogo.svelte` (hero) |
| Magnetic buttons | layout `scan()` adds `.magnetic` to `.btn`/`.join-btn`; CSS handles the transform |
| Text reveal on scroll | `revealHeadings()` splits titles into `.word-reveal`; IntersectionObserver adds `.is-visible` |
| Smooth parallax | `--scroll-y` CSS var + `.hero-copy` / `.particle-logo` transforms |
| Liquid/blob morphing | `.hero-section::after` (`blob-morph` keyframes) |
| Interactive particle network | not used on the logo (it was the cause of the lag); the logo uses the reference's repulsion model instead |
| 3D object / card following cursor | `.tilt-card` (story cards, carousel cards, event rows, achievement cards) |
| Card tilt + depth | same as above; plus the officers carousel's `rotateY` wheel |
| Scroll-driven transformation | hero parallax; footer gradient pan |
| Animated gradient mesh | `.footer-wrap::before` (`gradient-pan`), `.hero-section::before` (`mesh-drift`) |
| Cursor spotlight | `body` background using `--cursor-x` / `--cursor-y` |
| Glassmorphism hover | `.story-eyebrow` uses backdrop blur; cards lift on hover |
| Morphing navigation indicator | `Header.svelte` `.nav-indicator` |
| Number/data counter | `CountUp.svelte` (about stats) |
| Page transitions | View Transitions in `+layout.svelte` (see below) |
| Physics-based UI | particle logo spring physics; carousel drag |
| Horizontal scroll section | `StoryCarousel` (events) |

**How to add a new animation** (per the architecture):

1. Prefer CSS + a small amount of JS in `+layout.svelte` (shared) or in the component
   (local). Keep transforms to `transform` and `opacity`.
2. Respect reduced motion — either via the global media query (which already zeroes all
   animations) or by explicitly checking `prefers-reduced-motion` in JS (as the particle
   logo does).
3. If it needs per-pointer proximity logic, follow the `magnetic`/`tilt-card` pattern:
   a passive `pointermove` listener writes CSS custom properties, CSS applies them.
4. Re-scan anything that needs to be re-attached after navigation inside `scan()` in
   `+layout.svelte`.

---

## Page transitions

`+layout.svelte` opts into the browser **View Transitions API**:

```ts
onNavigate((navigation) => {
  if (prefersReduced() || typeof document.startViewTransition !== 'function') return;
  return new Promise((resolve) => {
    document.startViewTransition(async () => {
      resolve();
      await navigation.complete;
    });
  });
});
```

The animation itself is defined in `app.css`:

```css
::view-transition-old(root) { animation: vt-out .28s ease both; }
::view-transition-new(root) { animation: vt-in .5s cubic-bezier(.2,.8,.2,1) both; }
```

Browsers without support fall back to an instant page change (no error). To disable
entirely, delete the `onNavigate` block.

---

## Event data & the calendar feed

**Files:** `src/routes/+page.server.ts` (home), `src/routes/calendar/+page.server.ts`
(calendar). The ICS URL is defined at the top of each:

```ts
const ICS_URL = 'https://calendar.google.com/calendar/ical/…/public/basic.ics';
```

To point the site at a different calendar:

1. Google Calendar → Settings → your calendar → Integrate Calendar.
2. Make it public, copy the **Public iCal URL**.
3. Replace `ICS_URL` in both `+page.server.ts` files (home + calendar).

`src/lib/ics.ts` parses the ICS text, expands repeating rules (`RRULE`, weekly/monthly),
filters `EXDATE`s, and formats dates. `getEventType()` derives the type chips.

> Because the site is static, the feed is fetched at **build time**, not on every visit.
> After changing the feed or adding events, run a build + deploy to refresh.

---

## Testing workflow

After every meaningful change:

1. `npm run check` → **0 errors**.
2. `npm run build` → succeeds and writes `build/`.
3. Kill any old preview on port 4173, then `npm run preview` and open
   `http://localhost:4173`.
4. Walk every page (`/`, `/about`, `/calendar`, `/competitions`, `/join`,
   `/opportunities`, `/resources`, `/gallery`). Confirm 200 responses and no console errors.
5. On the homepage: particle logo animates (no heavy lag), the events rail spans the full
   viewport and scrolls horizontally, the subclub cards appear, the highlights load.
6. On `/about`: the officers carousel wraps when you click next past the end, side cards
   fade, dots track the active officer.
7. On `/calendar`: the "Next up" countdown shows, the rail is compact, the month grid
   renders events.
8. Shrink to a phone width (≈390px): no horizontal page scroll, burger menu opens the nav,
   layouts stack correctly.
9. If a visual change is substantial, capture full-page screenshots with Playwright and
   inspect the hero, event rail, overview cards, About stats/carousel, calendar layout.

---

## Deployment

The site auto-deploys to GitHub Pages via GitHub Actions (`.github/workflows/main.yml`):
pushing to `main` triggers a build + deploy. The built files live in `build/` and are
served by GitHub Pages.

- The deploy branch/remote is `origin` → `slhscs-club.github.io`.
- To deploy manually: `npm run build` — `build/` is the deployable output.
- If you change the ICS calendar, remember a deploy rebuilds the static pages, so events
  update after the push.

---

## Troubleshooting

**"Nothing changed when I rebuilt."** — Stop the old `npm run preview` (it may be a stale
listener on port 4173), `npm run build` again, and restart preview.

**`Cannot use import statement outside a module` from GSAP** — keep the SSR-safe import
`import { gsap } from 'gsap/dist/gsap'` in `Masonry.svelte`.

**`export let` / `$:` errors in a Svelte file** — that file is in runes mode. Use
`let { … } = $props()`, `$state`, `$derived`, `$effect` instead. See `calendar/+page.svelte`
for a converted example.

**The particle logo is choppy** — check that connection-line code was not reintroduced.
Keep the render loop single-pass (move + draw each dot, batched by color) and respect
`visibilitychange`.

**Carousel "effect update depth exceeded"** — don't write to the same state you read
inside a `$effect`. The carousel uses bounded event handlers (`onGoNext`/`onGoPrev`) plus
a teleport helper instead of an effect that mutates `index`.

**Icons missing / wrong font** — the Font Awesome + Google Fonts `<link>` tags live in
`src/routes/+layout.svelte`. If they were removed, icons and brand fonts disappear.

**Links turn purple after visiting** — don't add visited styling; the global
`a:visited { color: inherit }` in `app.css` prevents it. If it's happening, some rule is
overriding it with a higher specificity — remove that rule.
