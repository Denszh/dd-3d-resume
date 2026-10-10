# Starift Product Website Design

## Goal

Add a bilingual Starift product website to the existing `dengzh.site` personal portfolio site, served at `/starift/app`. Keep the 3D résumé at `/`, and make the existing Starift support and privacy pages reachable under both their current paths and new product-scoped paths. The website should explain the product clearly and lead visitors to the App Store.

## Approved direction

- Keep the product site inside the existing `web/` project and deployment.
- Use the approved A direction: a story-led, single-page product landing page.
- Use the approved Apple-inspired light visual direction: white space, selective pale-blue gradients, dark navy typography, system fonts, clear blue calls to action, rounded but restrained surfaces, and subtle motion. Avoid heavy glass effects, decorative parallax, and overly busy layouts.
- Preserve both the 3D résumé and all existing Starift routes.
- Treat the English marketing assets and content as the canonical feature scope. Chinese is a localized counterpart with matching page structure. Do not add Chinese-only sections 06 and 07 to the initial shared structure; their key ideas may inform shared HTML copy where appropriate.

## Routes

| Page | New path | Existing path |
| --- | --- | --- |
| Personal 3D résumé | `/` | `/` |
| Starift product website | `/starift/app` | — |
| Starift support | `/starift/support` | `/support` remains available |
| Starift privacy policy | `/starift/privacy` | `/privacy` remains available |

The old paths are aliases, not redirects, so existing App Store metadata and external links continue to work until the owner updates them. The repository currently implements `/privacy`; `/private` is not an existing route and is not part of this design.

## Landing page structure

1. **Navigation:** Starift wordmark, in-page feature navigation, Support, Privacy, and an `EN / 中文` language control.
2. **Hero:** “Capture the spark. Keep the idea.” / localized equivalent, short value statement, prominent localized App Store product-page CTA, and the Idea Vault visual.
3. **Capture and revisit:** Explain capturing and finding ideas again, illustrated by the Today screen.
4. **AI summary:** Explain turning a spoken idea into key points and next steps, illustrated by the AI Summary screen.
5. **Visible progress:** Show idea history and progress, illustrated by the progress/statistics screen.
6. **Widgets:** Show quick capture and at-a-glance progress, illustrated by the widget screen.
7. **Closing CTA and footer:** Repeat the localized App Store product-page CTA and link to the new support and privacy paths. Include a link back to the personal site if it fits without competing with the product CTA.

The agreed story order is independent of the source filenames' numeric order: capture/revisit precedes AI summary on the website.

## Asset mapping

Use the English set as the reference for page content. Map localized images by subject, not filename number:

| Website section | English source | Chinese source |
| --- | --- | --- |
| Hero / Idea Vault | `01-hero.png` | `01-hero.png` |
| Capture and revisit / Today | `03-device-top.png` | `03-device-top.png` |
| AI Summary | `02-device-bottom.png` | `02-device-bottom.png` |
| Progress / statistics | `04-hero.png` | `05-device-bottom.png` |
| Widgets | `05-device-bottom.png` | `04-hero.png` |

English assets are under `/Users/dd/Documents/starift/产品官网-英文/1125x2436/en/`. Chinese assets are under `/Users/dd/Documents/starift/产品官网-中文/1125x2436/zh-Hans/`, with the same seven designs also exported at 1206x2622, 1284x2778, and 1320x2868. The Chinese-only `06-device-top.png` (preferences) and `07-no-device.png` (feature recap) are not separate sections in the initial shared page. Assets must be copied into the web app's public asset tree before implementation/deployment; do not reference the developer's Documents path at runtime.

## Language behavior

- The EN/中文 control changes copy and localized visuals without changing the current route.
- Keep the page structure and feature order aligned between locales.
- On first visit, use the browser language in the same spirit as the existing support/privacy pages; remember an explicit user choice for later visits.
- Use English as the source of truth for the initial feature scope. Translate the shared sections into Simplified Chinese.
- Keep headings, CTA labels, footer links, page title, description, and document `lang` in sync with the selected locale.

## Navigation and accessibility

- Product-site links point to `/starift/support` and `/starift/privacy`; the existing `/support` and `/privacy` URLs remain directly accessible.
- Support/privacy pages should offer a path back to the Starift product site and link to each other using product-scoped URLs when reached from the new paths, while preserving working legacy URLs.
- Provide meaningful alt text for product imagery. Do not rely on embedded image text as the only explanation of a feature.
- Use visible keyboard focus, sufficient text contrast, mobile-friendly controls, and reduced-motion alternatives.
- Motion is limited to gentle opacity/short movement reveals and immediate interaction feedback; no forced scroll effects.

## Implementation boundaries

- Keep the root 3D résumé isolated from the Starift routes. Load the 3D experience only for `/` so product pages do not pay its initial loading cost.
- Extend the existing route dispatch or introduce only the smallest route mechanism needed; do not create a separate app or deployment.
- Preserve Vite's current deployment setup while ensuring direct visits and refreshes on nested Starift paths load the app bundle and images correctly. The current `base: './'` makes nested-path asset resolution a specific implementation concern.
- Do not change App Store metadata or remove legacy URLs as part of this website work.

## Acceptance criteria

- `/` continues to show the existing 3D résumé.
- `/starift/app`, `/starift/support`, and `/starift/privacy` render the intended pages on direct load and refresh.
- `/support` and `/privacy` continue to render their current bilingual content.
- The Starift landing page has the approved story order, responsive layout, localized copy/images, and working App Store/support/privacy links.
- Language switching preserves the current page and the selection is remembered.
- Nested routes load their CSS, JavaScript, and image assets from a fresh browser session.
