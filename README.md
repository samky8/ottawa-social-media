# LOCAL / SOCIAL — local website preview

A six-page, dependency-free static website for an Ottawa social media management, SEO/AEO and digital presence service. LOCAL / SOCIAL is a provisional identity, not a confirmed agency name. No public deployment is configured.

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
- `ASSET-SOURCES.md`: image sources and usage context.

The form validates locally, has a honeypot, and allows downloading an inquiry. It never claims delivery. No server submission or storage is implemented. `formEndpoint` is a reserved setting, not an automatic integration. A production integration must include server validation, spam/rate protection, delivery/error states and an appropriate privacy notice.

## Before launch

- Confirm agency name, logo, founder name/biography and substantiated qualifications; supply an approved portrait if desired.
- Provide public contact details, social links, production domain and optional real booking URL.
- Approve package prices and scope; confirm initial commitment, content approval workflow, revision allowances, filming/travel coverage, engagement hours, Google Business Profile frequency, inbox responsibilities and outreach practices.
- Supply approved project assets and permission to use each name, logo, screenshot and link. Distinguish owned projects, website management and social media work. Current public Work page contains only fictional samples.
- Connect and test inquiry delivery end to end. Confirm privacy and retention wording; never put secret keys in this static site.
- Set `brand.url`, generate an absolute production sitemap, add canonical URLs, replace the SVG social preview with a 1200×630 PNG/JPEG for broad crawler support, and remove preview/noindex restrictions only after approval. The current sitemap intentionally uses example.invalid, not an invented domain.
- Replace provisional-brand and founder-pending notices when verified details are available. Perform final live-domain QA and verify all outbound contact links.

No private source brief, user filesystem paths, project relationship notes, credentials or personal contact details are included in the site. `.private/`, `.env*` and `qa/` are excluded from Git. No analytics, advertising pixels or cookies are installed.

## Verification

Build and static checks cover six pages, local links and assets, unique primary headings, metadata, package counts and exclusion of unapproved project claims. Calendar checks verify all monthly quantities, package switching, list/grid modes, event details and service selection. These interaction checks exercise handlers with a lightweight DOM stub; they do not replace browser QA. Responsive CSS includes mobile navigation, stacked packages and forms, visible focus styles and reduced-motion support.

Desktop/mobile visual inspection, browser interaction tests and console inspection remain unverified: the connected browser surface was unavailable and native Chrome selection repeatedly failed with a window-binding error. Complete those checks before launch. A local Git repository is initialized; no remote repository or public deployment has been created.

## Editorial redesign

The latest revision simplifies the homepage and headings, removes repetitive homepage sections, moves the complete package details and FAQs to Pricing, and keeps service scope and process on Services. The numbered service index, asymmetric creative gallery, service selector and four-week sample calendar provide a distinct editorial layout. The calendar is illustrative, not a booking system or an agreed publishing schedule. Full package details and the default Growth calendar render without JavaScript.

SEO/AEO is owner-confirmed as a service area; no credentials, years of experience or results are invented. Confirm its final deliverables and quoting process before launch. The explanatory copy follows Google's guidance: https://developers.google.com/search/docs/appearance/ai-features and https://developers.google.com/search/docs/fundamentals/seo-starter-guide. The competitor reference sociallymade.ca could not be retrieved through the browsing tool; no claim of a completed competitor design review is made.
