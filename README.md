<<<<<<< HEAD
# The Dubai Mall — Interactive Sales Deck

A **Digideck-style**, nonlinear, video-first sales tool for The Dubai Mall. Built for high-stakes pitches to retail tenants, sponsors, and event partners—screen-share on live calls or send as a standalone link.

**Live demo:** Deploy to Vercel (see [Deploy](#deploy))  
**Local:** http://localhost:5173

---

## Interview brief alignment

| Requirement | Implementation |
|-------------|----------------|
| Nonlinear navigation | Chapter nav + interactive hub map |
| Video-first | `ManifestVideo`, ambient layers, cinematic intro |
| Luxury UI | Dark/gold design system, editorial typography |
| Phase 1 story beats | Intro, Why Dubai, Scale, Attractions, Luxury, Retail, Dining, Events |
| Phase 2 expandability | **Events Module** at `/events/module` (venues, tiers, booking CTAs) |
| Business CTAs | Leasing paths, sponsorship, event booking via `inquiry.json` |
| Manifest-driven assets | **No hardcoded media paths** in components |
| Deployable | Vercel-ready (`vercel.json`) |
| Performance | Route lazy-loading, manual chunks, async fonts, lazy images |

---

## Tech stack

- **React 18** + **TypeScript** + **Vite**
- **React Router** — nonlinear chapters
- **Framer Motion** — transitions, cards, hub
- **GSAP + ScrollTrigger** — intro + stat counters
- **CSS Modules** + design tokens

---

## Quick start

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

Regenerate SVG placeholders:

```bash
npm run generate:placeholders
```

---

## Architecture

```
public/data/
  asset-manifest.json   ← all media URLs (single source of truth)
  deck.json             ← chapters, routes, preload
  why.json | luxury.json | events-platform.json | events.json
  attractions.json | dining.json | retail.json | stats.json | map.json
  inquiry.json          ← mailto intents & contact

src/lib/asset-resolver.ts   ← resolve AssetRef → URL
src/context/ManifestContext.tsx
src/components/media/       ← ManifestImage, ManifestVideo
src/pages/                  ← one page per chapter
```

**Rule:** Components use `imageRef="luxury.hero.image"` keys, never `/images/...` strings.

See **`ASSET-FOLDER-MAP.md`** for the full path ↔ key table.

---

## Routes

| Route | Content |
|-------|---------|
| `/` | Interactive hub + map |
| `/intro` | Cinematic opening |
| `/why` | Location, tourism, demographics |
| `/scale` | Destination metrics |
| `/attractions` | Aquarium, Fountain, VR Park, etc. |
| `/luxury` | Fashion Avenue & luxury leasing |
| `/retail` | Retail mix |
| `/dining` | Dining Boulevard |
| `/events` | Events & platform story |
| `/events/module` | **Phase 2** — venues, highlights, tiers, book CTA |
| `/partner` | Leasing paths + sponsorship + events inquiry |

---

## Replace placeholders with real media

Drop files into paths defined in `asset-manifest.json` (same filenames). Priority:

1. `public/videos/hero/intro.mp4`
2. `public/images/hero/hero-main.jpg`
3. `public/images/map/floor-map-overview.png`
4. Chapter videos under `public/videos/attractions/`, `luxury/`, `events/`

Official sources: [thedubaimall.com](https://www.thedubaimall.com/), press materials, official YouTube.

---

## Deploy

### Vercel (recommended)

1. Push repo to GitHub  
2. Import project at [vercel.com](https://vercel.com)  
3. Framework preset: **Vite** — build `npm run build`, output `dist`  
4. Deploy — SPA rewrites included in `vercel.json`

```bash
npx vercel --prod
```

### Netlify

Build: `npm run build` · Publish: `dist` · Add redirect: `/* /index.html 200`

---

## Design decisions

- **Digideck pacing:** Full-viewport hero moments, chapter-based nav, minimal chrome  
- **Luxury palette:** `#0A0A0B` + gold `#C9A962` + ivory type — references Apple / fashion maisons  
- **Hub-first:** Map as home base for nonlinear exploration (not forced linear slides)  
- **CTA strategy:** Every major chapter ends with leasing / sponsorship / events actions  
- **Fallback chain:** Missing video → poster → SVG placeholder (deck never breaks)

---

## AI tools used

| Tool | Use |
|------|-----|
| **Cursor / Claude** | Architecture, components, manifest system, copy structure |
| **Generative AI (recommended)** | Hero stills, venue renderings where official assets are limited |
| **Placeholder script** | Consistent branded SVG stand-ins until real media is dropped in |

---

## Lighthouse / performance notes

- Lazy-loaded route chunks (except hub)  
- `manualChunks` for React, Framer Motion, GSAP  
- Async Google Fonts loading  
- Images: `loading="lazy"` + manifest fallbacks  
- Videos: `preload="metadata"` on ambient; poster fallback when `.mp4` missing  

Run audit after adding real video (compress to &lt;10MB per clip, 1080p H.264).

---

## Optional write-up

See **`SUBMISSION.md`** for a 1-page design rationale you can attach to your email.

---

## License

Portfolio / interview submission. Dubai Mall branding and assets belong to their respective owners.
=======
# Mall-sales-deck
>>>>>>> 45f2772765abc5ae97e85b0c73e98eb27f12de60
