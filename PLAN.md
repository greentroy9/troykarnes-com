# PLAN.md — troykarnes.com Build Plan

This is the execution companion to `CLAUDE.md`. `CLAUDE.md` defines *what* we're building. This file defines *how we'll build it*, *in what order*, and *who does what*.

---

## Roles

- **Troy** — provides assets, copy, and account access; clicks "approve" on anything that costs money or affects live systems.
- **Claude** — writes all code, drafts placeholder copy, walks Troy through any setup that requires Troy's hands on a keyboard.

---

## Decisions Locked

| Question | Decision | Notes |
|---|---|---|
| "Book a Call" nav button | Links directly to TidyCal | https://tidycal.com/troydkarnes/discovery |
| Substack subscribe | Embed the official Substack widget | Appears in footer, /writing/, /book/, /about/ |
| Language | JavaScript (not TypeScript) | Already in CLAUDE.md |
| Contact form | **Formspree** (default) | See "Smart defaults" below |
| Image optimization | **next/image with local files** (default) | See "Smart defaults" below |
| Analytics | **Vercel Analytics** (default) | See "Smart defaults" below |
| Linting/formatting | Next.js defaults (ESLint built-in) | No extra config needed |

---

## Smart Defaults (Troy can override any of these)

These are technical decisions Troy doesn't need to know to make. Claude is choosing the path that's simplest, free or near-free, and easiest for a non-technical owner to maintain.

**Contact form → Formspree**
The contact form on `/begin/` needs somewhere to send submissions. Two options:
- *Formspree* (chosen): a third-party service. Troy creates a free account, gets a form URL, and submissions arrive in Troy's email. No code on our side beyond the form HTML. Free tier covers 50 submissions/month.
- *Serverless function*: we write a small piece of code that runs on Vercel and emails Troy. More flexible, more moving parts, more for Troy to maintain.

**Image optimization → next/image**
Next.js has a built-in `<Image>` component that automatically resizes photos for phones, tablets, and laptops. We drop Troy's photos in `/public/images/` and the framework does the rest. Free, no setup.

**Analytics → Vercel Analytics**
Once the site is on Vercel, analytics is one click to enable. It tells you how many visitors, what pages they viewed, and what country they came from — without tracking individuals or needing a cookie banner. Free for hobby projects. If Troy ever wants more (conversions, A/B tests), we can add Plausible or Google Analytics later.

---

## Phase 0 — Setup (Troy's accounts, before any code)

Claude will walk Troy through each of these in order. Each step has a clear "done when…" so Troy knows when to move on.

### 0.1 Install Node.js
- **What it is:** the engine that runs Next.js on Troy's computer for previewing the site locally.
- **Done when:** running `node --version` in PowerShell shows `v18.17.0` or higher.

### 0.2 Create GitHub account + repository
- **What it is:** GitHub stores the code. Vercel watches GitHub and automatically rebuilds the site when code changes.
- **Done when:** Troy has a GitHub account and an empty repo named `troykarnes-com` (or similar).

### 0.3 Create Vercel account, connect to GitHub
- **What it is:** Vercel hosts the site (free tier covers this project).
- **Done when:** Troy has a Vercel account linked to GitHub, with permission to deploy from the new repo.

### 0.4 Create Notion integration + databases
- **What it is:** the content layer for testimonials and the featured Substack post.
- **Done when:**
  - Notion integration created, token saved
  - "Testimonials" database exists with the schema in `CLAUDE.md`
  - "Featured Post" database exists with the schema in `CLAUDE.md`
  - Integration has access to both databases

### 0.5 Create Formspree account
- **Done when:** Formspree account exists, contact form endpoint URL saved.

### 0.6 Domain plan (do NOT touch DNS yet)
- **Current state:** `troykarnes.com` points to a WordPress site on Bluehost. Email (`troy@troykarnes.com`) runs on Google Workspace.
- **Plan:** we build the new site on a temporary Vercel URL (`troykarnes-com.vercel.app`). Troy reviews and approves. *Only then* do we change DNS at Bluehost to point to Vercel.
- **Email preservation (critical):** Google Workspace email is handled by MX DNS records. At cutover, we change ONLY the A/AAAA records (web traffic). MX records stay untouched so email keeps working. Claude will verify the existing MX records before and after.
- **Migration scope:** Troy is not preserving WordPress content. Any copy he wants to reuse, he'll grab from the live site before cutover.

---

## Phase 1 — Scaffolding (Claude does this, ~1 session)

1. Initialize Next.js 14 project with App Router
2. Install and configure Tailwind CSS
3. Wire up Google Fonts (Raleway, Libre Baskerville, Libre Franklin)
4. Build folder structure per `CLAUDE.md`
5. Create `Nav` and `Footer` components
6. Create empty page stubs for all 7 routes
7. Verify the site runs locally on `localhost:3000`

**Definition of done:** Troy can run one command and see all 7 pages in a browser, with nav and footer rendered. No real content yet — just the skeleton.

---

## Phase 2 — Pages (Claude builds, Troy reviews after each)

Built in this order, one at a time, with Troy reviewing each before moving on:

1. Homepage (`/`)
2. The Hero's Draft (`/heros-draft/`)
3. Ghostwriting (`/ghostwriting/`)
4. About (`/about/`)
5. Book (`/book/`)
6. Writing (`/writing/`)
7. Begin (`/begin/`)

For each page:
- Claude builds the structure with placeholder copy where Troy hasn't supplied real copy
- Placeholder copy is clearly marked (e.g., `[PLACEHOLDER: Hero subhead — Troy to write]`)
- Image placeholders use the warm background (#ede8d1) with a label showing what photo goes there and what aspect ratio
- Troy reviews in the browser, requests changes, approves

---

## Phase 3 — Notion integration

1. Build `lib/notion.js` to fetch testimonials and featured post
2. Wire testimonials into the homepage, Hero's Draft, and Ghostwriting pages
3. Wire featured post into the homepage Substack section
4. Add Vercel webhook so Notion edits trigger a rebuild

**Done when:** Troy can edit a testimonial in Notion, wait ~1 minute, refresh the live site, and see the change.

---

## Phase 4 — Substack widget

Embed the official Substack subscribe widget in:
- Footer
- `/writing/`
- `/book/`
- `/about/`

---

## Phase 5 — Deploy to Vercel (preview URL)

1. Push code to GitHub
2. Connect Vercel to the GitHub repo
3. Set environment variables (Notion token, Formspree URL) in Vercel dashboard
4. Deploy → site is live at `troykarnes-com.vercel.app`
5. Troy reviews the full site on the temporary URL

---

## Phase 6 — Final copy and assets pass

By this point, Troy has lived with the site for a few days, and the gaps are obvious. Troy supplies:
- Real copy for any remaining placeholders
- Real photos
- EPIC framework descriptions
- Final testimonials in Notion
- Final featured Substack post

---

## Phase 7 — Cutover (the only risky step)

1. Decide if any WordPress content needs preserving (blog posts, redirects)
2. Capture anything worth keeping
3. Update DNS at Bluehost to point `troykarnes.com` at Vercel
4. Verify SSL certificate provisions correctly (Vercel handles this automatically, takes ~5 min)
5. Confirm site loads at `troykarnes.com`
6. Optionally cancel Bluehost (Troy's call — sometimes worth keeping email if it's there)

---

## Asset Inventory (to fill in as we build)

| Asset | Status | Notes |
|---|---|---|
| Hero photo of Troy | ⬜ Need | 60/40 layout, right column, homepage |
| About photo of Troy | ⬜ Need | About page |
| Book cover image | ⬜ Need | Book section + Book page |
| EPIC: Edge description | ⬜ Need | Hero's Draft page |
| EPIC: Plot description | ⬜ Need | Hero's Draft page |
| EPIC: Infrastructure description | ⬜ Need | Hero's Draft page |
| EPIC: Compose description | ⬜ Need | Hero's Draft page |
| Big Five publisher announcement | ⬜ Held | Hidden until announcement |
| Hero copy (homepage) | ⬜ Need | Headline, subhead, body — placeholders shown in CLAUDE.md |
| Voice & copy guidelines | ⬜ Need | Short paragraph + words to avoid (so Claude can write in Troy's voice) |
| LinkedIn URL | ✅ Have | https://www.linkedin.com/in/troykarnes/ |
| Substack URL | ✅ Have | https://haltblog.substack.com/ |
| Stripe buy link | ✅ Have | https://buy.stripe.com/cNi00kgxY75zeF0cXg9k400 |
| Audible link | ✅ Have | https://www.audible.com/pd/No-Silver-Bullets-Audiobook/B0G3BVDN83 |
| TidyCal link | ✅ Have | https://tidycal.com/troydkarnes/discovery |

---

## Definition of Done (every page must pass)

- [ ] Renders at the correct URL
- [ ] Matches design system (colors, fonts, spacing per CLAUDE.md)
- [ ] Mobile responsive (single column under 768px)
- [ ] All links work or are clearly marked as placeholder
- [ ] All images have alt text (or labeled placeholder)
- [ ] Lighthouse performance score ≥ 90

---

## Open Questions (to revisit before launch)

- ~~Do we need to preserve any content from the existing WordPress site?~~ **No** — Troy will grab any copy he wants from the live site before cutover.
- ~~Does Troy use Bluehost for email?~~ **No** — `troy@troykarnes.com` is Google Workspace. MX records must be preserved at DNS cutover.
- Voice & copy guidelines — Troy to draft a short paragraph.

---

## Post-Launch Tasks (after the site is live)

**Stripe → ShipStation order routing**
Currently, Bluehost emails Troy when a book is sold so he knows to ship. After cutover, the website only links to a Stripe Payment Link — Bluehost is out of the loop. Troy needs to wire Stripe directly to ShipStation:
- Option A: Use ShipStation's native Stripe integration (simpler, free).
- Option B: Use Zapier ("New Stripe charge → New ShipStation order").
Recommend Option A. Set up after launch — does not block the website build.
