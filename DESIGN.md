# Suchona — Definitive Design System

This file is the single source of truth for every Suchona page. The approved
home hero reference is `images/hero/hero-artwork-final.png` (1672 × 941). Future pages
must use the colors, typography, spacing character, and illustration language
documented here without deviation.

## Source assets

- **Approved visual reference:** `images/hero/hero-artwork-final.png`
- **Approved Donate detail reference:** the plaque in
  `images/hero/hero-artwork-final.png`
- **Immutable hero illustration source:** `images/hero/hero-artwork-final.png`
- The approved Durga figure, landscape, and illustrated ornament in this file
  are locked and must never be regenerated or edited. CSS masks only its baked
  interface zones; all visible copy, navigation, rules, ornaments, and buttons
  remain real HTML/CSS layered above it.

## Color palette

Values below preserve the approved reference palette with the confirmed subtle
20%-toward-reference warmth adjustment.

```css
:root {
  --color-maroon: #922b19; /* headline, donate plaque, ceremonial accents */
  --color-maroon-dark: #7b2617; /* interaction/pressed state */
  --color-gold: #d89437; /* rules, lotus, diamonds, button frame */
  --color-parchment: #f2d9ad; /* dominant warm background */
  --color-parchment-light: #f8e4ba; /* Donate text and pale details */
  --color-forest: #2e4f3b; /* illustration foliage and supporting art */
  --color-ink: #1f1a17; /* descriptive paragraphs and long-form copy */
}
```

Navigation labels use forest green. Maroon remains the hero headline and
primary ceremonial accent.

The hero artwork uses a restrained non-destructive CSS grade of
`brightness(1.025) saturate(0.965) sepia(0.035)`. This is the maximum approved
warmth: it lifts the reds and greens without applying a flat yellow wash.

## Typography

The hero name retains the locally hosted condensed display face
`Anton-Regular.woff2`. Section headings use the locally hosted Playfair Display variable face, while navigation,
body copy, labels, and buttons use the locally hosted Montserrat family.

```css
--font-display: 'Anton', 'Arial Narrow', sans-serif;
--font-section: 'Playfair Display', Georgia, serif;
--font-body: 'Montserrat', Arial, sans-serif;
```

| Element             | Family     | Weight | Native 1672px size |   Tracking | Color      |
| ------------------- | ---------- | -----: | -----------------: | ---------: | ---------- |
| Navigation links    | Montserrat |    500 |            15–16px |  `0.105em` | `#2E4F3B`  |
| Donate label        | Montserrat |    600 |               18px |   `0.09em` | `#F8E4BA`  |
| Hero `SUCHONA`      | Anton      |    400 |              160px |  `0.005em` | `#922B19`  |
| Association tagline | Montserrat |    500 |               15px |   `0.10em` | `#2E4F3B`  |
| Section headings    | Playfair Display | 900 |         responsive | `0.005em` | contextual |
| Body copy           | Montserrat |    500 |            17–21px |          0 | `#1F1A17`  |

Navigation, association tagline, labels, and action buttons stay uppercase.
Body prose remains sentence case. Section headings use Playfair Display Black for a
more editorial, community-oriented contrast.

Homepage section headings use title case: `About Us` and `Upcoming Events`.
The Upcoming Events heading is centered over a framed horizontal carousel that
shows exactly one event card per state at every viewport size.

## Definitive home hero geometry

- Reference canvas: **1672 × 941**.
- The top-left header position remains intentionally blank until the approved
  Suchona logo is supplied.
- Primary nav order is exactly: **Home, Events, About Us, Gallery, Magazine,
  Contact**, followed by **Donate** at the far right.
- The gold header rule sits at approximately **105px**, with the lotus centered
  on the viewport and diamond/dot ornaments preserved.
- Hero copy begins approximately **115px from the left** and **278px from the
  top**.
- The hero does not include a `WELCOME TO` line.
- The association tagline is uppercase and followed by its own thin gold rule
  with a centered diamond cluster.
- The hero contains **no Explore Community button** and **no Scroll to Discover
  element**.

## Definitive homepage continuation

- The continuation begins with a deep-maroon statistics band framed by double
  gold rules. On wide screens, two explicitly dashed future-photo positions
  flank three centered statistics; the photos disappear on narrower layouts
  and the statistics stack into a single column on mobile.
- The About section is an editorial split on light parchment: Playfair Display title,
  ornamental rule, Montserrat prose, and one action plaque beside a single
  gold-framed, dashed future-photo position. The columns stack on narrow
  screens without changing their reading order.
- Upcoming Events is one clearly bounded parchment panel with a maroon outer
  keyline and double gold frame. Its carousel is a single-card transform track,
  not a multi-card grid: previous/next controls and indexed dots change the one
  visible card while keeping inactive cards hidden from assistive technology.
- Carousel movement is brief and purposeful. Under `prefers-reduced-motion`,
  the transform transition is removed; controls and actions retain only their
  color-state feedback.
- Stats, community photography, event photography, dates, locations, member
  counts, and annual-event counts remain visibly labeled placeholders until
  confirmed content or approved imagery is supplied.

## Style principles

- **Flat illustrated poster style:** bold outlines, clean flat color fields,
  sharp edges, and restrained Bengali motifs. Avoid generic SaaS cards, glass
  effects, gradients, soft drop shadows, grain, haze, blur, and distressed
  AI-style texture.
- **Warm, community-centered tone:** use parchment, maroon, gold, and forest
  consistently so the site feels celebratory, welcoming, and culturally
  grounded.
- **Generous whitespace:** preserve open parchment around important copy and
  avoid crowding the goddess illustration or headline.
- **Legible for an older audience:** maintain strong contrast, substantial
  body sizes, clear focus states, and comfortable interaction targets.
- **Exact continuity:** every future page must inherit this palette, condensed
  display voice, ornamental line language, and illustrated-poster character.
  Do not introduce unrelated colors, fonts, radii, shadows, or UI conventions.
- **Restrained ornament:** paisley, floral, lotus, and diamond embellishments
  support section framing at roughly 70–80% of the visual density shown in the
  homepage reference; they never compete with headings or content.
- **Future photography:** any photographic position remains a clearly labeled
  dashed placeholder until approved community imagery is supplied.

## Shared footer

- Every page uses the single reusable component defined by `js/footer.js` and
  `css/footer.css`, mounted into a semantic `[data-site-footer]` element.
- The outer field and double border use the established deep forest green; the
  inner panel remains warm parchment with restrained gold rules.
- The footer wordmark is text-only in the locally hosted Bespoke Slab face. It
  is followed by the uppercase Montserrat association name; there is no emblem
  and no descriptive paragraph.
- Footer navigation mirrors only existing site routes: Explore, Events, and
  About Us. Do not add speculative Community or Resources pages.
- Newsletter, social, email, and phone details remain structurally ready, but
  their external integrations and destination URLs must be confirmed before
  launch.
- Left/right paisley art and the bottom architectural skyline are dimensioned
  placeholder layers. Replace their CSS backgrounds when approved transparent
  assets arrive; do not change the component markup or content grid.
