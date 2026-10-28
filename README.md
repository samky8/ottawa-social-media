# LOCAL / SOCIAL — local website preview

A six-page, dependency-free static website for an Ottawa social media management, SEO/AEO and digital presence service. LOCAL / SOCIAL is the current agency name.

Draft URL: https://samky8.github.io/ottawa-social-media-draft/

Repository: https://github.com/samky8/ottawa-social-media-draft

GitHub Pages serves `docs/` from `main`. To update the draft, run `npm run build:pages`, run `npm run check`, then commit and push the changed source and generated files. The Pages build adds the repository URL prefix to links and assets while keeping `dist/` suitable for local preview. The public draft retains noindex metadata and a download-only inquiry form with email instructions; it is publicly accessible, not access-controlled.

## Run

Requires Node.js 18 or newer. No package installation required.

```sh
npm run build
npm run check
npm start
```

Open http://localhost:4173. Pages: Home, Services, Pricing & Calendar, Work, About, Contact. `dist/` contains the complete generated site. Run the build after editing source files.

## Edit

- `content.mjs`: brand settings, package data, sample entries and FAQs.
- `scripts/build.mjs`: page copy, layouts and SEO generation.
- `styles.css`: colours, typography, responsive styling and motion preferences.
- `editorial.css`: the bolder editorial layout, responsive art direction and interactive component styles.
- `scripts/components.mjs`: package explorer templates, trust cues and sample creative notes.
- `app.js`: navigation, package preselection, inquiry validation and download.
- `content.mjs`: also holds separately scoped SEO/AEO and digital presence offerings.
- `scripts/planner.mjs` and `planner.js`: sample calendar, service selector and their interactions.
- `clarity.css`: service index, pricing calendar and responsive page refinements.
- `motion.js` and `motion.css`: progressive scroll reveals, reading progress, fine-pointer hero tilt, hover treatments and a native-dialog creative viewer. The viewer supports previous/next, arrow keys, Escape and focus restoration. Reduced-motion preferences disable movement, including when changed during the session. Content remains visible without the enhancement script.
- `playful.css` and `hearts.js`: rounded stamp-style buttons and personal hearts beside creative samples. Likes persist in localStorage in the same browser, sync across tabs, can be undone, and send nothing to a server. Storage failures degrade to a page-only reaction. The pop effect respects reduced-motion preferences; no engagement totals are displayed.
- `ASSET-SOURCES.md`: image sources and usage context.

The form validates locally, has a honeypot, and allows downloading an inquiry. It never claims delivery. No server submission or storage is implemented. `formEndpoint` is a reserved setting, not an automatic integration. A production integration must include server validation, spam/rate protection, delivery/error states and an appropriate privacy notice.

## Before launch

- Confirm the final logo and production identity before launch. Samuel Burke is introduced on About without a photograph.
- Confirm the production domain, social links and optional booking URL. The current public contact is contact.ottawaevents@gmail.com.
- Packages are $795 / $1,495 / $2,495 CAD per month including taxes, with an initial three-month commitment followed by month-to-month service. One revision round per deliverable and filming within the agreed Ottawa service area are included. Presence: 3 videos / 4 posts and filming every two months; Growth: 5 videos / 8 posts / 4 Stories; Partner: 8 videos / 12 posts / 8 Stories.
- Supply approved project assets and permission to use each name, logo, screenshot and link. Distinguish owned projects, website management and social media work. Current public Work page contains only fictional samples.
- Connect and test inquiry delivery end to end. Confirm privacy and retention wording; never put secret keys in this static site.
- Set `brand.url`, generate an absolute production sitemap, add canonical URLs, replace the SVG social preview with a 1200×630 PNG/JPEG for broad crawler support, and remove preview/noindex restrictions only after approval. The current sitemap intentionally uses example.invalid, not an invented domain.
- Connect inquiry delivery before launch. Perform final live-domain QA and verify all outbound contact links.

No private source brief, user filesystem paths or credentials are included in the site. The owner-approved biography mentions OttawaEvents, Ottawa.Catering and Ad Mare Seafood. `.private/`, `.env*` and `qa/` are excluded from Git. No analytics, advertising pixels or cookies are installed.

## Verification

Build and static checks cover six pages, local links and assets, unique primary headings, metadata, package counts and exclusion of unsupported performance claims. Calendar checks verify all monthly quantities, package switching, list/grid modes, event details and service selection. These interaction checks exercise handlers with a lightweight DOM stub; they do not replace browser QA. Responsive CSS includes mobile navigation, stacked packages and forms, visible focus styles and reduced-motion support.

Desktop/mobile visual inspection, browser interaction tests and console inspection remain unverified: the connected browser surface was unavailable and native Chrome selection repeatedly failed with a window-binding error. Complete those checks before the final business launch.

## Editorial redesign

The latest revision simplifies the homepage and headings, removes repetitive homepage sections, moves the complete package details and FAQs to Pricing, and keeps service scope and process on Services. The numbered service index, asymmetric creative gallery, service selector and four-week sample calendar provide a distinct editorial layout. The calendar is illustrative, not a booking system or an agreed publishing schedule. Full package details and the default Growth calendar render without JavaScript.

SEO/AEO is owner-confirmed as a service area; no credentials, years of experience or results are invented. Confirm its final deliverables and quoting process before launch. The explanatory copy follows Google's guidance: https://developers.google.com/search/docs/appearance/ai-features and https://developers.google.com/search/docs/fundamentals/seo-starter-guide. The competitor reference sociallymade.ca could not be retrieved through the browsing tool; no claim of a completed competitor design review is made.

## Calendar laptop interaction

The pricing calendar sits inside a MacBook-style frame. `laptop.css` supplies the screen, shell and neon pixel arrow cursor; `laptop.js` opens the lid as the page scrolls on larger displays. Small screens, short viewports and reduced-motion preferences show the calendar open. Keyboard focus opens it immediately, and the calendar remains usable without JavaScript. The screen scrolls independently to keep every event and control accessible. Build both outputs with `npm run build:pages`. `npm run check` covers scroll progress, keyboard opening and preference changes alongside the existing calendar interactions. Visual browser verification remains outstanding because the computer/browser connection was unavailable.

The content-plan cursor uses a regular-size 20 ? 25 px pixel arrow inspired by a classic blue pointer. Separate outline and fill SVG layers in `assets/cursors/pixel-arrow*.svg` keep the navy outline fixed while the shaded fill fades to a new hue every five seconds, with a four-second transition. `plan-cursor.js` handles hover, loading fallback and cleanup. Touch devices retain normal behavior; reduced-motion preferences keep the original blue.
