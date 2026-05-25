# Submission Write-Up — The Dubai Mall Sales Deck

## Design rationale

I treated this assignment as a **product**, not a website: a self-contained sales instrument that replaces fragmented PDFs, YouTube tabs, and verbal narration during tenant and sponsor pitches.

**Subject:** The Dubai Mall — maximum scale, tourism density, and mixed-use storytelling (retail, luxury, F&B, attractions, events).

**Interaction model:** A Digideck-inspired **nonlinear hub** where prospects choose their journey (map pins + chapter nav), while the rep can still drive a linear story on a screen share (Intro → Why → Scale → Luxury → Events → Partner).

**Visual language:** Luxury minimalism—dark canvas, gold accent, editorial serif headlines—so the UI recedes and content (especially video) carries emotion.

## How AI was used

- **Cursor + Claude** for rapid scaffolding: manifest system, typed JSON schema, component library, and interview-aligned chapter structure.
- **AI-generated placeholders** (SVG + recommended stills) where official 4K media wasn’t embedded in-repo; swap-in paths are pre-wired so no code changes are needed when real assets arrive.
- **Copy structure** drafted against public positioning of The Dubai Mall, then editable in JSON for non-engineers.

## Business actions

Every major beat pushes toward:

1. **Retail / luxury leasing** — segmented paths on `/partner`  
2. **Sponsorship** — tiers in Events Module + mailto intents  
3. **Event booking** — venue cards with capacity + “Book” CTA  

## What I’d improve with more time

- Embed compressed official hero footage and Lighthouse-tune to 90+  
- Sponsorship calculator or PDF export from Events Module  
- Analytics on chapter engagement for sales reps  
- Arabic/English toggle for GCC prospects  

## Links

- **Live URL:** _(add after Vercel deploy)_  
- **GitHub:** _(add repo URL)_  

Contact for submission: medi@liat.ai
