# SLHS CS Club site maintenance guide

This guide explains the site architecture, the visual system, the content workflows, and the safest way to run and modify the site.

## Run the site

Install dependencies with `npm install`.

Use `npm run dev` for the live development server. It provides hot module replacement and is the normal mode for editing. Use `npm run build` to create the production bundle and `npm run preview` to serve that bundle locally. Preview does not rebuild when files change, so run a new build after edits.

Before handing off changes, run `npm run check` and `npm run build`. The check command validates Svelte and TypeScript; the build command catches SSR and production bundling problems.

## Architecture

The app is a SvelteKit site. Routes live in `src/routes`. Each route owns its page markup and local styling. Shared layout, global tokens, and global interaction behavior live in `src/routes/+layout.svelte` and `src/app.css`.

Reusable components live in `src/lib/components`: `Header`, `Footer`, `Shell`, `PageHero`, `Carousel`, `StoryCarousel`, `Masonry`, `Lightbox`, `ParticleLogo`, `CTACard`, and `CountUp`. Keep page-specific content in the route unless it is reused in two or more places.

Static public files belong in `static/assets`. Build-imported image collections belong in `src/lib/assets`, where Vite can fingerprint and optimize them.

## Navigation and branding

Edit the `navLinks` array in `src/lib/components/Header.svelte` to add, remove, or reorder navigation links. The Join action is intentionally separate as `.join-btn`; keep it as a persistent action rather than turning it into an ordinary tab.

The color tokens are at the top of `src/app.css`. Orange is the primary action color. Navy is the secondary border/accent color. Change the tokens there rather than scattering new hex values through route files. The global `a:visited` rule keeps navigation from changing color after a page has been visited.

## Homepage

The homepage is `src/routes/+page.svelte`. The hero facts are the three `.hero-fact` blocks. The particle logo is `src/lib/components/ParticleLogo.svelte`; it samples `static/assets/logos/logo.png`, tracks the pointer, and expands its distortion radius on click.

Homepage story images are loaded from `src/lib/assets/home`. Add files named `1.jpg`, `2.png`, `3.webp`, and so on. The numeric sort in `+page.svelte` determines their order. Replace or reorder filenames to change the sequence without changing component code.

Upcoming events are mapped into `StoryCarousel`. That component provides scroll snapping, drag inertia-like movement, arrow controls, image panels, and fading masks at the edges. Keep the input shape `{ image, eyebrow, title, description }`.

The How the Club Works section intentionally uses the compact legacy card layout. Edit its cards directly in `+page.svelte` when changing subclubs or descriptions.

## Calendar

Calendar data is normalized in `src/routes/calendar/+page.svelte` and helper functions are in `src/lib/calendar.ts` and `src/lib/ics.ts`. `getUpcomingEvents` controls how many events appear. The upcoming list is a compact horizontal rail: each event is a small snap card with a date, title, type, and clamped description. This keeps the calendar page focused on the month grid instead of spending most of the page on repetitive rows.

To change event categorization, edit `getEventType` in `src/lib/ics.ts`. Event colors are intentionally normalized to orange; navy is used for borders and structure instead of large low-contrast fills.

## About and officers

About content is in `src/routes/about/+page.svelte`. Achievements now live there, alongside history, structure, FAQ, and officers. The officer carousel consumes the `officers` array and image lookup in that file. Add an officer to the array and place a matching image in `src/lib/assets/officers` using the lowercase hyphenated name.

The shared `Carousel` is cyclic: previous from the first item wraps to the end, and next from the end wraps to the first. Its viewport fades at both sides so cards feel like a continuous wheel rather than a hard-edged strip. `visibleSlides` controls density.

## Competitions

Competition content is data-first in `src/routes/competitions/+page.svelte`. Add attended competitions to `attended` and hosted competitions to `hosted`. Each entry is `[title, short description]`. The page renders both groups automatically, so content updates do not require copying card markup.

## Animation system

The layout installs a cursor spotlight using CSS variables `--cursor-x` and `--cursor-y`, plus an IntersectionObserver that adds `.is-visible` to sections and interactive elements. Section reveals are controlled in `src/app.css`.

Use the existing interaction vocabulary before introducing a library: buttons lift on hover, carousels drag and snap, the particle logo reacts to pointer movement and clicks, image masonry has hover color shifts, counters animate when mounted, and carousels have side fading. For new animations, respect `prefers-reduced-motion` and keep transforms GPU-friendly (`transform` and `opacity`).

For a magnetic button, add a small pointer-distance transform to the button component rather than changing every page. For text reveals, observe the heading and add a class that transitions child words. For parallax, use a CSS custom property updated by a passive scroll listener and clamp the distance. Avoid adding scroll handlers to every card.

## Adding and removing content

Add a route by creating `src/routes/name/+page.svelte`, wrapping content in `<Shell activePage="name">`, and adding a Header link if it should be navigable. Remove a route by removing its directory and its navigation entry, then run `npm run check` to catch stale imports.

Add images to the relevant `src/lib/assets` folder and use `import.meta.glob` when a whole folder should be content-managed. Use `static/assets` only for stable public URLs such as the logo or Open Graph image.

## Testing workflow

Use the Playwright smoke scripts in the repository after starting a production preview. Wait for `networkidle`, keep the page open long enough for images and animations to settle, scroll through the page, and inspect both desktop and mobile layouts. Check that gallery loading states disappear, carousels have visible cards, links return 200, and the mobile burger opens the navigation.

When a visual change is substantial, capture a full-page screenshot and inspect the hero, event rail, overview cards, photo highlights, About density, calendar rail, and officer carousel. Do not treat a fast initial screenshot as proof that a dynamic section rendered correctly.

## Troubleshooting

If Vite reports `Cannot use import statement outside a module` from GSAP, keep the SSR-safe `gsap/dist/gsap` import used by `Masonry.svelte`. If a carousel reports effect update depth errors, avoid a reactive effect that writes the same state it reads; use bounded event handlers instead. If preview returns stale or 404 content, stop the existing listener on port 4173, rebuild, and start preview again.
