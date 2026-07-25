# Maintanence guide

The site is built with [SvelteKit](https://kit.svelte.dev/) and statically deployed to GitHub Pages. This should be largely self-supporting, and any changes require no coding knowledge (hopefully).

---

## Table of Contents

- [Adding/Updating Officers](#addingupdating-officers)
- [Adding Officer Photos](#adding-officer-photos)
- [Adding Gallery Photos](#adding-gallery-photos)
- [Adding Resources](#adding-resources)
- [Updating the Calendar](#updating-the-calendar)
- [Updating FAQ Items](#updating-faq-items)
- [Updating Achievements (Home Page Stats)](#updating-achievements-home-page-stats)
- [Updating Navigation / Footer Links](#updating-navigation--footer-links)
- [Building & Deploying](#building--deploying)

---

## Adding/Updating Officers

**File:** `src/routes/about/+page.svelte` (lines 18–27)

To add, remove, or reorder officers, edit the `officers` array:

```ts
const officers = [
  { name: 'Abhay Godavarthy', role: 'President' },
  { name: 'Shravni Rotithor', role: 'Vice President' },
  { name: 'Saanvi Saxena', role: 'Treasurer + Secretary' },
  { name: 'Avika Shrivastava', role: 'Historian' },
  { name: 'Eren Tor', role: 'Competitive Programming Lead' },
  { name: 'Austin Yu', role: 'Contest Lead' },
  { name: 'Kushagra Nagar', role: 'Outreach Manager' },
  { name: 'Jackson MacGregor', role: 'Web Development' }
];
```

Each entry needs a `name` and `role`. The name is displayed and used to look up the officer's photo (see below).

---

## Adding Officer Photos

**Directory:** `src/lib/assets/officers/`

1. Save the officer's photo in this directory.
2. Name the file using the officer's full name in lowercase with hyphens instead of spaces.
   - Example: For `Abhay Godavarthy`, the file should be `abhay-godavarthy.jpg`
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`

It (should) automatically pick up any image in this folder and matches it to the officer by name.

---

## Adding Gallery Photos

**Directory:** `src/lib/assets/gallery/`

1. Save photos into this directory.
2. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`
3. Name files descriptively (e.g., `2024-hp-codewars.jpg`, `meeting-oct-2024.png`).
   - The filename is used to generate the alt text (hyphens/underscores become spaces, words are capitalized).
4. Photos are automatically sorted newest-first by file modification date.
5. The home page randomly selects 4 highlights each day from the gallery.

To force a re-sort: Edit the file, or if on linux/mac (idk ab windows), touch the file (`touch filename.jpg`) to update its modification time.

---

## Adding Resources

**Directory:** `src/lib/assets/resources/`

The resources page supports three file types:

| Type     | Extension | Behavior |
|----------|-----------|----------|
| Guide    | `.md`     | Rendered as HTML on the page |
| PDF      | `.pdf`    | Displayed in an embedded viewer |
| Document | `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg` | Displayed as an image |

1. Save the file into `src/lib/assets/resources/`.
2. Name it descriptively (e.g., `intro-to-python.md`, `contest-schedule.pdf`).
   - The filename (without extension) becomes the resource title and URL slug.
   - Hyphens become spaces, words are capitalized for the title.
3. The resource will automatically appear on the resources list page and be accessible at `/resources/<slug>`.

To remove a resource, delete the file from the directory.

---

## Updating the Calendar

**File:** `src/routes/calendar/+page.server.ts`

The calendar fetches events from a public Google Calendar ICS feed. The URL is defined at the top:

```ts
const ICS_URL = 'https://calendar.google.com/calendar/ical/.../public/basic.ics';
```

To use a different calendar:
1. Open Google Calendar -> Settings -> Settings for my calendars -> [Your Calendar] -> Integrate Calendar
2. Set the calendar to public
3. Copy the **Public iCal URL**
4. Replace the `ICS_URL` value in `src/routes/calendar/+page.server.ts`

The home page also shows upcoming events from the same feed (defined in `src/routes/+page.server.ts`).

---

## Updating FAQ Items

**File:** `src/routes/about/+page.svelte` (lines 29–46)

The FAQ is a static array of `{ q, a }` objects. Edit the `faqItems` array to add, remove, or change questions:

```ts
const faqItems = [
  {
    q: 'What activities does the club do?',
    a: 'We hold presentations on computer science topics...'
  },
  // Add more items here
];
```

---

## Updating Achievements (Home Page Stats)

**File:** `src/routes/+page.svelte` (lines 21–26)

The animated stats on the home page are defined in the `achievements` array:

```ts
const achievements = [
  { prefix: '', num: 4, suffix: 'x', label: 'UIL State Championships' },
  { prefix: '', num: 20, suffix: '+', label: 'Individual UIL State Attendees' },
  { prefix: '≈', num: 15, suffix: '', label: 'Years Running' },
  { prefix: '', num: 50, suffix: '+', label: 'Honor Society Members' }
];
```

- `prefix`: Text before the number (e.g., `'≈'`)
- `num`: The number to count up to
- `suffix`: Text after the number (e.g., `'x'`, `'+'`)
- `label`: Description below the number

---

## Updating Navigation / Footer Links

**File:** `src/lib/components/Shell.svelte`

The navigation links and footer links are defined as arrays in the `<script>` block:

```ts
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  // ...
];

const footerLinks = [
  { href: '/', label: 'Home' },
  // ...
  { href: 'https://discord.com/invite/eCRC3TCs', label: 'Discord' },
];
```

Edit these arrays to add, remove, or reorder links. External URLs work in both sections.

---

## Building & Deploying

The site uses `@sveltejs/adapter-static` and deploys to GitHub Pages automatically.

### Deployment

The site is configured to deploy via GitHub Actions. Pushing to the `main` branch triggers an automatic build and deploy. The built files go to the `build/` directory, which is served by GitHub Pages.

To deploy manually:

```bash
npm run build
```

The output in `build/` is ready to be served by any static file server.

---