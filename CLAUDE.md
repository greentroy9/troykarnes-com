# CLAUDE.md — troykarnes.com

## Project Overview

Build a static marketing website for Troy Karnes, a book coach and ghostwriter. The site is built in Next.js, hosted on Vercel, and uses Notion as a content layer for dynamic content (testimonials, featured Substack posts). Everything else is static.

The site must load fast, look professional, and convert three types of visitors: founders/executives who want a ghostwriter, founders/executives who want book coaching, and readers who found Troy through his book or Substack.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) — installed at scaffold time. Next.js 16 has breaking changes from older training data; read `node_modules/next/dist/docs/` before relying on memorized APIs.
- **Styling:** Tailwind CSS v4 — CSS-first config via `@theme inline` in `app/globals.css`. There is no `tailwind.config.js` (intentional, this is v4's pattern).
- **Content layer:** Notion API (for testimonials and featured content)
- **Hosting:** Vercel
- **Fonts:** Google Fonts (Raleway, Libre Baskerville, Libre Franklin), loaded via `next/font/google` in `app/layout.js`
- **Language:** JavaScript (not TypeScript)
- **React:** 19.2

---

## Design System

### Colors

| Role | Hex |
|---|---|
| Background | #fefdf8 |
| Primary text | #000000 |
| Brand anchor (green) | #69995d |
| Accent / CTA (orange) | #dc602e |
| Surface / alternating sections | #ede8d1 |
| Dark sections | #000000 |

### Fonts

| Use | Font | Weight |
|---|---|---|
| Headlines (H1–H3) | Raleway | 700 / 600 |
| Body paragraphs | Libre Baskerville | 400 |
| Nav, buttons, labels, UI | Libre Franklin | 500 / 400 |

### Design Principles

- Editorial and literary aesthetic. Not corporate. Not SaaS.
- Generous white space. Strong typography. Minimal decoration.
- No gradients. No drop shadows. Flat surfaces.
- Square corners on all buttons (no border radius).
- Sections alternate between #fefdf8 and #ede8d1 backgrounds for visual rhythm.
- One dark section (#000000 background) for the book section.
- One brand-color section (#69995d background) for the final CTA.

### Buttons

- Primary: background #dc602e, text #fefdf8, no border radius, padding 16px 32px
- Outline: border 1px solid current color, transparent background
- Hover state on primary: background shifts to #69995d
- All button text: Libre Franklin, 14-15px, weight 500

### Pre-headlines (section labels)

- Font: Libre Franklin
- Size: 11px
- Weight: 600
- Letter spacing: 2.5px
- Color: #dc602e
- Text transform: uppercase

---

## Site Architecture

### Navigation (fixed, top)

```
[Logo: Troy Karnes] .... [Home] [The Hero's Draft] [Ghostwriting] [About] [Writing] [Book a Call →]
```

- Background: #fefdf8
- Nav links: Libre Franklin, 13px, weight 500, color #000000, hover #69995d
- "Book a Call" is a button: background #dc602e, text #fefdf8, padding 8px 18px
- "Book a Call" links to: https://tidycal.com/troydkarnes/discovery
- Fixed/sticky on scroll

### Footer (three columns)

Column 1:
- Logo (Troy Karnes)
- Tagline: "I help founders, executives, and consultants write the books they've been carrying."
- Social links: LinkedIn, Substack

Column 2 — Navigation:
- The Hero's Draft
- Ghostwriting
- About
- Writing
- No Silver Bullets

Column 3 — Stay in Touch:
- Heading: "HALT on Hump Day"
- Substack subscribe link: https://haltblog.substack.com/
- Note: "Every Wednesday. Free."

Footer specs:
- Background: #000000
- Text: #fefdf8
- Link hover: #dc602e
- Padding: 60px top and bottom

Footer bottom bar:
- Text: © 2025 Troy Karnes · All rights reserved
- Background: #69995d
- Text: #fefdf8, 11px

---

## Pages

### 1. Homepage (/)

**Section 1: Hero**
- Layout: Two columns, 60/40. Left: text. Right: photo placeholder.
- Background: #fefdf8
- Padding: 120px top, 100px bottom

Left column copy:
```
PRE-HEADLINE: BOOK COACHING & GHOSTWRITING

HEADLINE (H1, Raleway 700, 52px):
For senior leaders writing the book
they've been carrying.

SUBHEADLINE (Libre Franklin, 18px, color #69995d):
You write. I guide. The journey changes you.

BODY (Libre Baskerville, 16px, line-height 1.75):
I work with founders, executives, and consultants
who have ideas, talks, and half-drafts — but no spine.
Six to nine months of structured guidance gets you
to a first draft you wrote yourself.
Or I write it for you.

CTA ROW:
[Primary button] The Hero's Draft →  →  /heros-draft/
[Text link, color #69995d, underlined] Book ghostwriting  →  /ghostwriting/
```

Right column: Image placeholder (warm background #ede8d1). Troy will supply photo.

---

**Section 2: Two Paths**
- Layout: Two equal columns with a 1px vertical divider (#b5b09a) between them
- Background: #ede8d1
- Padding: 80px top and bottom
- Pre-headline (centered): TWO WAYS TO WORK TOGETHER

Left column:
```
TITLE (Raleway 700, 28px): The Hero's Draft
PRICE (Libre Franklin, 13px, color #69995d): Starting at $9,000
BODY: You write the book. I guide you through it. A six-to-nine month engagement with a structured framework, a weekly writing lab, and someone who has built books from scratch holding you accountable to finishing yours. For leaders who want the writing to develop them — not just the outcome.
LINK (color #dc602e, underlined): Learn about The Hero's Draft →
```

Right column:
```
TITLE (Raleway 700, 28px): Book Ghostwriting
PRICE (Libre Franklin, 13px, color #69995d): Starting at $30,000
BODY: I write the book. You put your name on it. Deep interviews, source-material review, and a manuscript written in your voice — while you stay on the work that only you can do. For leaders whose time is the binding constraint.
LINK (color #dc602e, underlined): Learn about ghostwriting →
```

---

**Section 3: Social Proof**
- Layout: Single centered column, max-width 800px
- Background: #fefdf8
- Padding: 80px top and bottom

```
HEADLINE (Raleway 700, 32px, centered): Who I work with

BODY (Libre Baskerville, 17px, centered, line-height 1.7):
I write for the founder of a $38M-valuation company, an investor with $20M+ in exits, a business coach, and a technology founder writing on leadership.

STAT BLOCKS (three in a row, pulled from Notion):
- Stat 1: Number "17" / Label "Amazon reviews for No Silver Bullets"
- Stat 2: Number "6–9 mo" / Label "Typical time to a finished draft"
(Third stat block reserved for Big Five publisher announcement — add when ready)

Stat number: Raleway 700, 48px, color #69995d
Stat label: Libre Franklin, 11px, uppercase, letter-spacing 1.5px
Dividers between stats: 1px vertical rule, color #ede8d1
```

---

**Section 4: From the Substack**
- Layout: Two columns, 55/45
- Background: #fefdf8
- Padding: 80px top and bottom

Left column:
```
PRE-HEADLINE: WEEKLY WRITING
HEADLINE (Raleway 700, 34px): HALT on Hump Day
BODY: Every Wednesday I share what I'm learning about managing the things that derail us — Hungry, Angry, Lonely, Tired — and how that connects to doing the kind of work that lasts. Free. No pitch. Just the writing.
Substack subscribe embed or link to Substack
```

Right column (pulled from Notion — featured post):
```
LABEL: Latest issue
TITLE (Raleway 600, 20px): [Featured post title from Notion]
BODY: [2-sentence excerpt from Notion]
LINK (color #dc602e): Read this week's issue →
```

---

**Section 5: The Book**
- Layout: Two columns, 40/60. Left: book cover image. Right: text.
- Background: #000000
- Text: #fefdf8
- Padding: 80px top and bottom

```
PRE-HEADLINE (color #dc602e): THE BOOK
HEADLINE (Raleway 700, 38px, color #fefdf8): No Silver Bullets
BODY (Libre Baskerville, 15px, color #cccccc, line-height 1.8):
Built around the HALT framework — Hungry, Angry, Lonely, Tired — this is a book about the problems that don't go away. And the life you can build around them anyway.
LINKS:
[Primary button, background #dc602e] Buy directly → https://buy.stripe.com/cNi00kgxY75zeF0cXg9k400
[Secondary link, color #fefdf8, underlined] Listen on Audible → https://www.audible.com/pd/No-Silver-Bullets-Audiobook/B0G3BVDN83
[Text link, color #dc602e] Read more about the book → /book/
```

---

**Section 6: Final CTA**
- Layout: Single centered column
- Background: #69995d
- Padding: 100px top and bottom

```
HEADLINE (Raleway 700, 44px, color #fefdf8, centered):
Ready to write the book
you've been carrying?

SUBHEAD (Libre Franklin, 17px, color #d4e8ce, centered):
45 minutes. No pitch. Just a conversation about your book.

BUTTON (background #dc602e, text #fefdf8, padding 18px 40px):
Book a free discovery call
Links to: https://tidycal.com/troydkarnes/discovery
```

---

### 2. The Hero's Draft (/heros-draft/)

**Primary job:** Convert coaching prospects to discovery calls.

Content to include:
- Hero: Who it's for and what it is
- The line between coaching and ghostwriting (you want the writing to develop you vs. time is the constraint)
- The EPIC framework: four phases (Edge, Plot, Infrastructure, Compose) — Troy will supply descriptions
- The weekly writing lab mechanic
- Timeline: 6-9 months
- Price: Starting at $9,000
- Risk reversal: refundable kickoff, pause rights
- Testimonials (pulled from Notion, filtered by service = "coaching")
- Final CTA: Book a discovery call → https://tidycal.com/troydkarnes/discovery

**Note:** Troy has not yet supplied the EPIC framework phase descriptions. Build the page structure with placeholder text in those sections labeled [EPIC: Edge description], [EPIC: Plot description], [EPIC: Infrastructure description], [EPIC: Compose description]. Troy will fill these in.

---

### 3. Ghostwriting (/ghostwriting/)

**Primary job:** Convert ghostwriting prospects to discovery calls. Self-select unqualified buyers before they book.

Content to include:
- Hero: Who it's for (time is the binding constraint)
- The interview-driven process (Troy draws the book out through deep interviews)
- Anonymous client proof: founder of a $38M-valuation company, investor with $20M+ in exits, business coach, technology founder writing on leadership
- Price floor stated clearly: Starting at $30,000
- What ghostwriting is not (not template-based, not AI-generated)
- Testimonials (pulled from Notion, filtered by service = "ghostwriting")
- Final CTA: Book a discovery call → https://tidycal.com/troydkarnes/discovery

---

### 4. About (/about/)

**Primary job:** Build trust at depth. Establish the mentor figure. Connect personal story to professional credibility.

Content to include:
- Personal story: cancer survivor, person in active recovery, author of No Silver Bullets
- Why that connects to ghostwriting work (empathetic guide, holds space for identity transitions)
- Professional credibility: book, ghostwriting work, Good Vibes Ghostwriting
- Placeholder section for Big Five publisher announcement (currently hidden, toggle visible when ready)
- Substack subscribe block at bottom: "Stay in touch"
- No hard sales pitch on this page

---

### 5. No Silver Bullets (/book/)

**Primary job:** Serve existing readers, capture Substack subscribers, soft-introduce services.

Content to include:
- Book cover image
- Book overview and HALT framework explanation
- 17 Amazon reviews (pull 3-4 featured ones from Notion)
- Primary CTA: Buy directly → https://buy.stripe.com/cNi00kgxY75zeF0cXg9k400
- Secondary CTA: Listen on Audible → https://www.audible.com/pd/No-Silver-Bullets-Audiobook/B0G3BVDN83
- Substack subscribe block
- Bottom CTA: "If you're working on your own book" → links to /heros-draft/

---

### 6. Writing (/writing/)

**Primary job:** Drive Substack subscriptions. Surface recent writing.

Content to include:
- Brief intro to the writing (HALT on Hump Day, what it covers)
- Featured recent posts (pulled from Notion — 4-6 entries)
- Substack subscribe embed
- Link out to full Substack archive

---

### 7. Begin (/begin/)

**Primary job:** House the discovery call booking and a contact form for general inquiries.

Content to include:
- Short intro: what to expect from the call (45 minutes, no pitch)
- TidyCal embed: https://tidycal.com/troydkarnes/discovery
- Simple contact form below for general inquiries (name, email, message)
- Form submits via a serverless function or Formspree

Navigation CTA "Book a Call" links here or directly to TidyCal — Troy's preference.

---

## Notion Integration

### Setup

Use the Notion API with a private integration token. Store the token in a .env.local file:

```
NOTION_TOKEN=your_integration_token
NOTION_TESTIMONIALS_DB=your_database_id
NOTION_FEATURED_POST_DB=your_database_id
```

### Testimonials Database Schema

Each entry in Notion should have:
- Name (text)
- Title (text) — job title or descriptor
- Quote (text)
- Service (select) — "coaching" or "ghostwriting"
- Featured (checkbox)
- Published (checkbox) — only fetch where Published = true

### Featured Post Database Schema

Each entry should have:
- Title (text)
- Excerpt (text) — 2 sentences max
- Substack URL (url)
- Active (checkbox) — only one entry should be active at a time

### Fetching Pattern

Use Next.js static generation (getStaticProps or generateStaticParams) to fetch Notion data at build time, not runtime. This ensures zero performance impact from the Notion API.

Set up a Vercel webhook to trigger a rebuild when Notion content changes. Instructions for this can be added after the initial build.

---

## File Structure

```
/
├── app/
│   ├── layout.js          # Global layout, nav, footer, fonts
│   ├── page.js            # Homepage
│   ├── heros-draft/
│   │   └── page.js
│   ├── ghostwriting/
│   │   └── page.js
│   ├── about/
│   │   └── page.js
│   ├── book/
│   │   └── page.js
│   ├── writing/
│   │   └── page.js
│   └── begin/
│       └── page.js
├── components/
│   ├── Nav.js
│   ├── Footer.js
│   ├── TestimonialBlock.js
│   ├── StatBlock.js
│   ├── FeaturedPost.js
│   └── CTASection.js
├── lib/
│   └── notion.js          # Notion API fetch functions
├── public/
│   └── images/            # Troy's photos, book cover
├── .env.local             # Notion tokens (never commit this)
├── CLAUDE.md              # This file
└── tailwind.config.js
```

---

## Content Placeholders

The following content needs to be supplied by Troy before or during the build. Build the structure with placeholders and label them clearly:

- `[PHOTO: Hero image of Troy]` — homepage hero, right column
- `[PHOTO: About image of Troy]` — about section
- `[PHOTO: Book cover]` — book section and book page
- Stripe buy link: https://buy.stripe.com/cNi00kgxY75zeF0cXg9k400
- Audible link: https://www.audible.com/pd/No-Silver-Bullets-Audiobook/B0G3BVDN83
- LinkedIn: https://www.linkedin.com/in/troykarnes/
- Substack: https://haltblog.substack.com/
- `[EPIC: Edge description]` — Hero's Draft page
- `[EPIC: Plot description]` — Hero's Draft page
- `[EPIC: Infrastructure description]` — Hero's Draft page
- `[EPIC: Compose description]` — Hero's Draft page
- `[BIG FIVE ANNOUNCEMENT]` — About page and homepage stat block, currently hidden, toggle visible when announcement goes public

---

## Build Order

Build in this sequence:

1. Project setup (Next.js, Tailwind, Google Fonts, folder structure)
2. Global layout (Nav, Footer)
3. Homepage (all six sections)
4. The Hero's Draft page
5. Ghostwriting page
6. About page
7. Book page
8. Writing page
9. Begin/Contact page
10. Notion integration (lib/notion.js + wiring into pages)
11. Vercel deployment

---

## Deployment

- Host on Vercel
- Connect to GitHub repository for automatic deploys
- Environment variables (Notion tokens) set in Vercel dashboard, not in code
- Domain: troykarnes.com (DNS update instructions provided by Vercel after deploy)

---

## Notes for Claude Code

- Never hardcode the Notion token anywhere in the codebase
- All Notion fetches happen at build time (static generation), never at runtime
- Image placeholders should use a warm background (#ede8d1) with a subtle label so Troy knows where to drop photos
- Keep components small and reusable — the CTA section, testimonial block, and stat block appear on multiple pages
- Mobile responsive is required — design is single-column on screens below 768px
- No animations, no parallax, no scroll effects — keep it fast and clean
- Accessibility: all images need alt text placeholders, all CTAs need descriptive labels
