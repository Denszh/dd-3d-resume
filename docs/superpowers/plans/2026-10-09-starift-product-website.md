# Starift Product Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual Starift product site at `/starift/app` with Apple-inspired visuals, while keeping the 3D résumé and both old and new support/privacy paths working.

**Architecture:** Keep one Vite/React application and extend the existing pathname dispatch. Put the product landing page, locale copy/hook, and localized public assets in focused Starift modules; make the résumé entry lazy so product routes do not load the 3D scene. Reuse the existing support/privacy pages with route-aware link prefixes, and generate root-based production asset URLs for the custom-domain deployment while retaining the current relative-path option for subdirectory deployments.

**Tech Stack:** React 18, TypeScript, Vite 5, existing CSS and browser APIs. No new dependencies and no automated test framework (the repository has no test suite).

**Spec:** `docs/superpowers/specs/2026-10-09-starift-website-design.md`

## Global Constraints

- Keep the product site inside the existing `web/` project and deployment.
- Preserve both the 3D résumé and all existing Starift routes.
- Treat the English marketing assets and content as the canonical feature scope. Chinese is a localized counterpart with matching page structure.
- The EN/中文 control changes copy and localized visuals without changing the current route.
- Product-site links point to `/starift/support` and `/starift/privacy`; the existing `/support` and `/privacy` URLs remain directly accessible.
- Do not change App Store metadata or remove legacy URLs as part of this website work.
- App Store CTA opens the localized product page directly (`/us/app/starift/id6812587855` in English and `/cn/app/星拾/id6812587855` in Simplified Chinese).
- Keep the current project free of new dependencies and automated test infrastructure.

## Review Focus

- Direct nested route `/starift/app` with and without a trailing slash must not resolve built assets relative to the route; owned by Tasks 1 and 4, inspect built asset URLs and open/reload the route in the deployed preview.
- Old `/support` and `/privacy` routes must keep their existing content; owned by Task 3, inspect both old and new paths.
- Support/privacy cross-links must use the appropriate product-scoped or legacy path based on the active route; owned by Task 3, follow each footer link from both route variants.
- First-visit locale detection, remembered explicit locale, and unavailable/invalid local storage must not prevent page rendering; owned by Task 2, inspect both locales and the fallback path.
- The 3D résumé at `/` must remain the only route that loads the 3D experience; owned by Task 4, inspect the route split and root page behavior.

---

### Task 1: Prepare localized product assets and configure deployment base

**Files:**
- Create: `web/public/starift/en/` with the five English website visuals from `/Users/dd/Documents/starift/产品官网-英文/1125x2436/en/`.
- Create: `web/public/starift/zh-Hans/` with the five matching Chinese visuals from `/Users/dd/Documents/starift/产品官网-中文/1125x2436/zh-Hans/`.

**Interfaces:**
- Produces the stable asset URLs `${import.meta.env.BASE_URL}starift/{en|zh-Hans}/{asset-file}` for Task 2.

- [x] Copy the mapped source assets into the language-specific public folders, mapping progress by subject (`English 04-hero` ↔ `Chinese 05-device-bottom`) and widgets by subject (`English 05-device-bottom` ↔ `Chinese 04-hero`). Do not include Chinese-only 06/07 in the initial shared page.
- [x] Keep the source filenames unchanged under the language-specific folders; do not alter the source images in Documents.

### Task 2: Add shared Starift locale state and bilingual landing content

**Files:**
- Create: `web/src/ui/starift/useStariftLanguage.ts`
- Create: `web/src/content/stariftSite.ts`
- Create: `web/src/ui/StariftLandingPage.tsx`
- Create: `web/src/ui/starift-landing.css`

**Interfaces:**
- `type StariftLanguage = 'en' | 'zh-Hans'`.
- `useStariftLanguage(): { language: StariftLanguage; setLanguage: (language: StariftLanguage) => void }`.
- `stariftSite` provides localized page metadata, navigation, section headings/copy, and CTA labels for both locales.
- `StariftLandingPage` consumes the shared hook and copy; its language control never changes the URL.

- [x] Add the shared locale hook. Initial locale follows `navigator.language` (`zh*` → `zh-Hans`, otherwise `en`); persist a deliberate choice under the key `starift-language`; guard storage reads/writes so storage failures fall back to the browser locale without breaking render.
- [x] Add English-first copy and Simplified Chinese localization for the agreed sections: hero, capture/revisit, AI summary, progress, widgets, closing CTA, and footer.
- [x] Build the responsive landing page in the approved story order: Hero → Capture/revisit → AI summary → Progress → Widgets → closing CTA/footer.
- [x] Use the localized App Store product page from Global Constraints for both hero and closing CTA.
- [x] Use the localized asset map from Task 1; include semantic alt text and keep feature explanations in HTML text rather than relying only on text baked into images.
- [x] Style with system typography, generous whitespace, selective pale-blue gradients, dark navy copy, blue CTAs, and restrained surfaces. Add reduced-motion handling; avoid heavy blur/glass and forced parallax.

### Task 3: Add product-scoped routes and preserve support/privacy aliases

**Files:**
- Modify: `web/src/main.tsx`
- Modify: `web/src/ui/SupportPage.tsx`
- Modify: `web/src/ui/PrivacyPolicyPage.tsx`
- Modify: `web/src/ui/starift/useStariftLanguage.ts`

**Interfaces:**
- `SupportPage` and `PrivacyPolicyPage` accept an optional `productPrefix?: '/starift' | ''`; default `''` preserves current legacy behavior.
- `/starift/support` renders `SupportPage` with `productPrefix='/starift'`.
- `/starift/privacy` renders `PrivacyPolicyPage` with `productPrefix='/starift'`.
- `/support` and `/privacy` render the same existing page content with `productPrefix=''`.

- [x] Add explicit path matching for `/starift/app`, `/starift/support`, `/starift/privacy`, `/support`, and `/privacy`, normalizing trailing slashes without changing the visible URL.
- [x] Keep `/` mapped to the existing résumé and preserve the current fallback behavior for unrecognized paths.
- [x] Update support/privacy pages to use the shared language hook and choose cross-links/back-links from `productPrefix`, so old paths keep old link targets and product-scoped pages stay inside the Starift route group.
- [x] Add a link back to `/starift/app` from new support/privacy views without removing or replacing legacy content.
- [x] Set page title and document language for each route and selected locale; set a localized description for the landing page.

### Task 4: Keep route bundles and nested assets deployment-safe

**Files:**
- Modify: `web/src/main.tsx`
- Modify: `web/vite.config.ts`
- Modify: `web/package.json`
- Inspect: `web/index.html` and production output paths

**Interfaces:**
- The root route imports the 3D résumé dynamically; product and legal routes do not statically import `App`/Three.js scene modules.
- Route-specific public assets use `import.meta.env.BASE_URL`, not paths relative to the current nested URL.
- The Cloudflare production build uses root base `/`; the default relative base remains available for arbitrary subdirectory deployments.

- [x] Replace the eager résumé import with a lazy route import and show a simple fallback only while that route chunk loads.
- [x] Change `web/vite.config.ts` to read `VITE_BASE_PATH` and fall back to the current `'./'` value; update the `deploy:cf` build invocation in `web/package.json` to set `VITE_BASE_PATH=/` while leaving its deploy behavior intact.
- [x] Ensure the Cloudflare base `/` makes initial JS/CSS references and nested public assets resolve from the site origin when `/starift/app` is opened directly.
- [x] Preserve `./` as the fallback Vite base for users deploying the project under an arbitrary subdirectory; ensure existing public assets continue to use the configured base.
- [x] Confirm Cloudflare Pages continues serving the SPA entry for the new paths under the project's existing Pages setup; do not add a competing 404/redirect rule that would break its fallback behavior.

### Task 5: Review the implementation and preserve unrelated work

**Files:**
- Inspect: all files changed in Tasks 1–4
- Preserve: pre-existing modifications in `blender/sen.blend`, `web/src/content/works/starift.md`, `web/src/data/works.ts`, and `web/src/ui/Resume.tsx`

**Interfaces:**
- No change to existing résumé content, Blender scene, App Store metadata, or legacy route behavior.

- [x] Review the final diff for accidental edits to the pre-existing dirty files; no files staged.
- [x] Inspect the implementation against each acceptance criterion in the design spec; do not create or run automated tests unless explicitly requested.
- [ ] If changes are approved for commit, commit only the scoped website files with a descriptive message.
