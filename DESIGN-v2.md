# Suchona Website — v2 Design Reference

Source materials used to build this doc:
- Hero artwork: [`images/v2/v2-hero-artwork-final.png`](images/v2/v2-hero-artwork-final.png) (Durga illustration, 1672×941px) — primary source for palette + illustration style
- Reference screenshots (attached to chat): dontboardme (dog walking), Heyday Canning Co., Mr. Spring & Mrs. Fresh, Eastern Market Detroit — primary source for layout/spacing/rhythm
- Reference HTML: `references/v2/*.html` — used only to cross-check section/structural intent (nav → hero → content sections → footer), not for visual styling (no CSS attached to these files)

Colors and fonts from the reference sites are intentionally **excluded** — only their layout DNA is borrowed.

---

## 1. Color Palette (extracted from hero artwork)

All values below were sampled directly from flat-fill regions of `v2-hero-artwork-final.png` (sky, sari bands, foliage, ornamentation, crown gems) via pixel sampling — these are true measured colors, not approximations.

| Swatch | Hex | Role | Where it appears in the hero |
|---|---|---|---|
| Ivory / Warm Cream | `#FBE1B8` | **Base background** — dominant tone (~20%+ of image) | Sky, negative space around the halo |
| Terracotta / Rust Red | `#8B3018` | **Primary accent** | Sari border bands, sword blade |
| Deep Forest Green | `#3C4530` | **Secondary / grounding accent** | Foliage, ornamental scrollwork base, sari stripe |
| Warm Gold | `#C9863C` | **Ornamentation / linework accent** | Mandala halo linework, bangles, scrollwork gold lines, sari threads |
| Deep Maroon | `#6B2410` | **Deepest accent** — use sparingly for emphasis | Crown gems, small decorative details |
| Sunset Coral | `#E0794E` | **Warm highlight accent** | Lotus flower, sun-glow tones |
| Ink Brown-Black | `#1A160F` | **Linework / text-on-cream** (not pure black — keep this warm near-black for line art or dark text if used) | Hair, outline linework |
| Warm Sand | `#F0C888` | **Midtone fill / skin tone** | Figure's skin, warm transitional tone between cream and gold |

**Usage guidance:** treat cream (`#FBE1B8`) as the dominant field color across the whole site — it should read as "mostly cream" the way the hero art does, not "mostly colored." Terracotta and deep green are the two workhorse accents (buttons, links, borders, icons). Gold is for ornamental linework/dividers, not large fills. Maroon and coral are accent-of-accent — small details, hover states, single emphasis moments. Ink brown-black is safer than pure `#000` for any dark text or line art, to stay warm and consistent with the illustration.

---

## 2. Illustration Style (for any new assets)

- **Medium/feel:** painterly gouache/watercolor illustration with soft grain and gentle gradients (not flat vector) — rooted in Bengali folk-art / Kalighat-pat and traditional pattachitra conventions, rendered with a warm, sunset-lit golden-hour palette.
- **Linework:** outlines are a warm ink brown-black (`#1A160F`), not pure black — medium weight around the central figure, thinner and more delicate in ornamental/decorative elements.
- **Ornamentation:** dense floral/paisley scrollwork borders, a radiating mandala halo built from fine gold linework with dotted/beaded rings, small flower motifs with dark centers repeated as pattern-fill within sari bands.
- **Texture:** soft painterly texture and light grain throughout — gradients used for sky (cream → warm gold near horizon), foliage depth, and the halo glow. Avoid hard flat color fields when generating new assets; everything should feel hand-painted.
- **Composition conventions:** generous open negative space in the "sky" portion, ornamental elements anchor the bottom/edges of a composition rather than the center, warm backlit/golden-hour lighting throughout.

Any new illustrated assets should match this: warm gouache texture, ink-brown linework, gold decorative line detail, and restraint in how many accent colors appear in a single asset (2-3 max, drawn from the palette above).

---

## 3. Layout DNA (from reference screenshots)

Colors and fonts from these sites are ignored — only structure, spacing, and pacing below.

**Cross-checked against `references/v2/*.html`:** all four references share the same skeletal shape — `header/nav` → `main` with multiple `section`s → `footer`. This confirms the section-by-section pacing seen in the screenshots is intentional structure, not a styling accident.

### Section rhythm
- One idea per section. Each section = eyebrow label (small, letter-spaced) → large heading → short supporting copy → optional single CTA. Sections don't compete for attention with each other.
- Generous vertical whitespace between sections — sections breathe, nothing is stacked tightly. This is the single biggest contributor to the "calm/minimalist" feel across all four references.
- Alternating two-column layout (image one side, text the other, flipping side each time) is the default pattern for storytelling/explainer sections (seen in Mr. Spring & Mrs. Fresh, Eastern Market).
- Horizontal scrollable card rows/carousels for repeated content (products, menu items) with consistent card sizing (Heyday Canning's bean/soup carousels).
- Simple 3-column icon/label rows for value props — no heavy card chrome, just icon + short label (Eastern Market's Dine/Shop/Support row).
- A visually distinct "testimonial" block set apart with its own background treatment, centered short quote, minimal attribution.
- A photo grid/collage strip near the bottom of the page (uniform, small thumbnails) for social proof / real-world texture before the footer.
- Footer is consistently multi-column (link groups + newsletter signup) with a large brand wordmark treatment at the very bottom edge.

### Grid & spacing
- Centered content container with a comfortable max-width and consistent side margins — full-bleed only for hero imagery and color-block banner sections.
- Nav is a simple horizontal bar: logo/wordmark left, links right, one CTA button; sometimes overlaid transparently on the hero image rather than a solid bar.
- Buttons are simple pill or rounded-rectangle shapes, single solid fill, no gradients or heavy shadowing — restraint over decoration.
- Type contrast (not color) does most of the hierarchy work: large bold headline against small, quiet body copy and eyebrow labels.

### How the references achieve "calm/minimalist"
It's whitespace + restraint, not absence of content: every reference still has rich content (menus, products, testimonials, market info) but paces it out one section at a time, uses a consistent grid, and never lets more than one accent color/element compete for attention in a given section. Suchona v2 should borrow this pacing discipline while keeping the palette and illustration warmth from the hero — i.e., calmer *arrangement* of a warm, ornamented palette, not a cooler/neutral palette.

---

## 4. Typography

### Hero wordmark — "SUCHONA"
Needs: bold, narrow/condensed display font, tall and heavy like Anton but more distinctive.

**Recommended options (all free, Google Fonts):**
1. **Khand** (Bold/SemiBold) — condensed display font from Indian Type Foundry; distinctive letterforms with a slight cultural resonance given the Bengali Association context, while still reading as a clean modern display face.
2. **Big Shoulders Display** (Black/ExtraBold) — very tall and condensed with more textural personality than Anton; huge weight/width range if we need flexibility later.
3. **Fjalla One** — condensed and bold with subtly distinctive letter shapes (slight flare), still clean and highly legible at large display sizes.

**Specs:**
- Weight: 700–900 (Bold–Black)
- Case: all caps
- Letter-spacing: 0 to +0.01em (these faces are already tight/condensed — don't over-tighten further)
- Size: hero scale, roughly 72–140px depending on viewport, scaling down for mobile

### Nav bar / "Bengali Association" secondary text
Needs: thin-weight, uppercase, letter-spaced, feels like a current real-world web dev choice (not decorative).

**Selected: Work Sans** (Light 300) — humanist grotesk, pairs well with either condensed wordmark option above, reads a touch friendlier than a purely geometric grotesk, and is a font a web developer would genuinely reach for today. Free on Google Fonts.

*(Other options considered: Inter, Manrope — both solid alternatives, but Work Sans was chosen for its warmer, more humanist feel alongside the hero's hand-painted style.)*

**Specs:**
- Weight: 300–400 (Light–Regular)
- Case: uppercase
- Letter-spacing: +0.15em to +0.25em
- Size: 11–13px

---

## 5. Overall Tone & Mood

The rest of the site should feel like it was painted by the same hand as the hero, then asked to whisper instead of sing: same warm cream/terracotta/gold/deep-green world, same ink-brown linework and gouache warmth *if* new illustration is introduced — but used sparingly, mostly as accents against generous cream negative space, paced with the same one-idea-per-section restraint seen across the reference sites. The hero illustration remains the single emotional/cultural high point of the page; everything below it should be quieter, typographic, and unhurried, letting whitespace and section pacing — not additional color or ornamentation — carry the "calm, modern, minimalist" feel.
