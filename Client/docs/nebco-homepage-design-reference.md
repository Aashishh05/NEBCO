# NEBCO Homepage — Design Reference

Source: <https://nebco-homepage-design.ashishshahnepal2.chatgpt.site/>
(built with Tailwind v4 + shadcn/Radix: dialog, tabs, accordion, sheet, navigation-menu; self-hosted Manrope)

> **Fidelity verdict (audited 2026-10-28)**: the deployed bundle contains several design
> iterations (v1→v5); cascade resolves to the **last** declaration. The repo port
> (`src/styles/nebco.css`) matches the reference's *final* rendering almost exactly.
> Remaining deviations are listed at the bottom of the file.

## Design tokens (final cascade values)

```css
:root {
  /* iteration overrides collapse to:
     --background:#faf9f6; --secondary:#efe9dc; --gold:#aa8c56;   (v5) */
  --background: #faf9f6;   /* page cream (v5; earlier iteration used #f8f7f4) */
  --foreground: #222421;
  --secondary: #efe9dc;
  --muted: #efede8;
  --muted-foreground: #64655f;
  --border: #deded7;
  --ring: #b82026;
  --radius: 0;             /* sharp corners everywhere */
  --gold: #aa8c56;          /* investments accent (earlier: #aa9269) */
  --ink: #222421;
  --red: #b82026;           /* primary CTA */
  --deep-red: #981b20;      /* hover */
}
```

### Supporting surfaces

| Surface | Color (final) |
| --- | --- |
| Hero base | `#f3f1ec` + shade `linear-gradient(90deg,#f3f1ec 0% 24%, …00 64%)` |
| Credentials band | **red** `var(--red)` with white text (v5; earlier iteration was beige) |
| Starting-point band | `#f0ebe2`, borders `#dfd7c8`, divider `#d4c8b4` |
| Foundation/about | `#eee6d7` |
| Experience photo placeholder | `#e1dfd7` |
| Overseas section | `#232720` (dark, `border-top: 0`) |
| Footer | `#20231f`, top border 5px red, group heading `#cdb692` |
| Tile backs (flip) | Construction `var(--red)` · Consulting `#252724` · Investments `#755b35` |
| Tile backs detail icons | `#eed4aa` |
| Coordination tab list | border `#c6b99f` (construction-comparison variant: no bg, 0 padding) |
| Delivery board | `#262b25` dark (NEBCO-led) · `#ebe9e2` light `.is-independent` (separate trades) |
| Business card border | `#ddd6c9`, hover `#aa9269` + `0 12px 30px #332c2110` shadow |

Accent top borders are 3px (header, tile-copy, dialog); schedule card 4px; footer 5px.

## Typography

- **Font**: Manrope 400/500/600/700/800 (self-hosted, fallback Arial). Footer tagline uses Georgia in early iterations; final v5 uses Manrope everywhere.
- Body: 16px / 1.65.
- Hero `h1`: `clamp(60px, 5.9vw, 82px)` · weight 400 · `-.06em` · lh 1.08 · max-width 830px.
  Strong ("landmark."): uppercase red · `1.13em` · weight 800 · `-.055em` · margin-top 4px.
  (Responsive: 1200px → 65px/1.11em; 1050 → 62px; 700 → `clamp(39px,10.8vw,61px)`/1.08em.)
- Section `h2`: `clamp(34px, 3.6vw, 50px)` · weight 500 · `-.05em` · lh 1.19.
- `h3`: 25px · weight 600 · `-.035em` · lh 1.3.
- `.eyebrow`: 12px · weight 700 · uppercase · `.12em` · `#62645d` · 24×2px red dash.
- `.button`: 14px · weight 600 · min-height 53px · padding 15px 23px · radius 0 · red → `--deep-red`.
- `.text-link`: 14px · weight 600 · transparent bottom border → underline on hover.

## Page structure (single page, anchor nav)

1. **Header** (96px, white bg): 3px red top border · logo 69×77 · "Our businesses" dropdown (Radix nav-menu, panel 325px) + anchors `#experience` `#about` `#overseas` · CTA "Discuss your project" (opens enquiry dialog) · mobile hamburger → 700px sheet `min(390px,90%)` with accordion.
2. **Hero** `#top`: image right 72% (`object-position:75% 50%`), gradient shade from left; eyebrow "A-Class construction company · Nepal"; h1 "From land to **landmark.**"; "Construction. Consulting. Investments."; lede (max-width 430px); "Discuss your project" + "Explore NEBCO" `→ #businesses`; gold dash "Quality. Integrity. Timely."; caption chip bottom-right "Architectural concept · illustrative".
3. **Credentials band** (red): `20+` Years of experience (Established in 2001) · `A–Class` Construction company (Quality. Integrity. Timely.) · `3` Connected businesses (One vision for your project). Grid `1fr 1.1fr 1fr`, strong 43px/600, accent glyphs `#f0d3a9`, white dividers `#ffffff48`, small `#f9dedd`.
4. **Our businesses** `#businesses`: h2 "Three businesses. One connected vision." / "Choose where you need us. We'll help you move forward." Three flip cards (3×1, gap 20px): image tile 222px, 3D flip (`rotateY(180deg)` 500ms) to colored back → label, tagline 23px, 3 check bullets; copy below with 3px colored top border (red/ink `#282a25`/gold): audience 12px, h3 30px, description 16px/1.75 (min-height 112px), "Explore …" link.
5. **Starting point** `#start`: band bg; h2 39px "What would you like to do?"; 4 options in 2-col grid, lucide icons `land-plot` `pencil-ruler` `file-check-corner` `handshake`; deep links `#development-planning` `#design-build` `#from-drawings` `#partnerships`.
6. **Experience**: 74px padding; h2 46px; sector anchors Residential/Commercial/Hospitality; "View our projects" → nebco.com.np; 3 cards: photo 257px (hover zoom 1.025, 400ms), label 12px uppercase `.08em` `#6f6656`, h3 24px (hover red), sub 14px..live from `GET /api/projects/featured` with exact fallback copy.
7. **Foundation/About** `#about`: bg `#eee6d7` 70px; eyebrow "The NEBCO foundation"; h2 43px; "Established in 2001" red label. Tabs "Managing separate trades" / "Building with NEBCO" (tab buttons 14px, active red); panel `#faf9f6` border `#d8cdb8`, `0.78fr/1.22fr`; copy side: kicker 12px uppercase red, h3 32px/1.2 (max-width 330px), 3 checks; board side `.delivery-board`: top bar "Your project · building icon · Brought together/Separate appointments", lead card (red or `#dbdcd2` light), pillars `hard-hat` `package-check` `clipboard-check` with gold `#ba9e65` connectors (48–49px circular icons), result line "An agreed scope. A connected team."; oversight note 12px.
8. **Overseas** `#overseas`: bg `#232720` 72px; eyebrow `#cdbd9f` with `#bda178` dash; h2 44px, `em` → `#cdbd9c`; benefits 14px with `video`/`images`/`file-check`-style icons (19px, `#c2af8e`); "Schedule an online call" red button (opens appointment dialog); visual: height 430px, bottom gradient `#0000 43% → #101a15bf`, caption "Closer to home." 34px + "A place for your future in Nepal.", note "Architectural concept".
9. **Schedule** `#schedule`: bg `#eee7dc` 66px; h2 57px `-.055em`, red `em`; grid `1.25fr/0.75fr` gap 85px; card white, border-top 4px red, pad 28px 31px: calendar icon `#8d7350`, h3 27px, full-width button, note 12px.
10. **Footer**: `#20231f`, 5px red top, padding `57px 0 21px`; grid `1.5fr .8fr 1fr 1.1fr` gap 42px; brand block (logo panel 72×81 on white, "From land to landmark." `#d4ba8b`) + company + legacy lines; Explore / Our businesses / Let's connect columns (headings `#cdb692`, links `#d3d7ca`, gold divider `#aa926950`); bottom bar `#aeb4a4` bordered `#4a4b40`: © year · "Enquiry privacy" · "Back to top".

## Interactions

- **Flip tiles**: hover flips on `(hover: hover) and (pointer: fine)`; tap/Enter/Space toggles via `is-flipped` + `aria-pressed`.
- **Tabs** (about), **enquiry/appointment dialog** (610px, radius 0, `.enquiry-context` chip, `.draft-ready` success view), **mobile sheet** nav with accordion.
- `html { scroll-behavior: smooth; scroll-padding-top: 28px }`; `::selection` red/white; focus outline 2px red offset 5px (gold `#d8c29e` inside dark sections).
- Breakpoints: `1200px`, `1050px`, `960px`, `700px` (2 blocks). Container: `min(1280px, 100% - 112px)`; 700px → `calc(100% - 44px)`.

## Subpage template (Construction / Consulting / Investments)

- `.service-hero`: 2-col grid (copy + image), back link, h1 54px `-.055em`, lede 17px/1.85, CTA; then `.service-scope` feature articles, comparison boards, talk CTA; anchors `#design-build` `#from-drawings` `#development-planning` `#partnerships`.

## Assets (all local)

| File | Size | Used in |
| --- | --- | --- |
| `images/final/hero-concept.webp` | 1672×941 | Hero |
| `images/final/construction-site.webp` | 1536×1024 | Construction tile |
| `images/final/planning-concept.webp` | 1536×1024 | Consulting tile |
| `images/final/investments-concept.webp` | 1536×1024 | Investments tile |
| `images/final/overseas-home-concept.webp` | 1448×1086 | Overseas |
| `images/final/kathmandu.webp` | — | Business pages |
| `images/projects/project-*.jpg` | 1200×900 | Experience cards |
| `images/nebco-logo.png` | 400×446 | Header/footer |
| `fonts/manrope-{400..800}.ttf` | — | Self-hosted font |

Project photos (NEBCO's real photography, from `nebco.com.np/wp-content/uploads/2024/06/`): Sukedhara Private House · Khanal Commercial Building · Hotel Yatri.

## Implementation mapping (this repo)

| Reference | Repo |
| --- | --- |
| Header + dropdown + mobile sheet | `src/components/navbar/` (`Navbar`, `NavDropdown`, `MobileSheet`) |
| Hero / CredentialsBand / BusinessTiles / StartingPoint / Experience / Foundation / Overseas / ScheduleCta | `src/pages/public/Home/sections/` (same names) |
| Flip card interaction | `src/components/cards/BusinessCard.jsx` |
| Foundation tabs + delivery board | `Foundation.jsx` (+ `.is-independent` light board) |
| Footer (contact from API) | `src/components/footer/Footer.jsx` |
| Business subpages | `src/pages/public/{Construction,Consulting,Investments}/` + `src/components/business/` |
| Enquiry/appointment dialogs | `src/components/forms/FormModals.jsx` + `ui/dialog.jsx` |
| Design CSS port | `src/styles/nebco.css` (tokens + sections, ~3,000 lines) |
| Tokens/base | `src/index.css` (Tailwind theme + Manrope @font-face) |

## Audit: deviations aligned (2026-10-28)

All previously listed micro-deltas were fixed so the port matches the reference's final
cascade exactly (`src/styles/nebco.css`, `Overseas.jsx`, `MobileSheet.jsx`):

1. `.header-cta` → gap 19px, padding 13px 18px (was 16px / 11px 18px).
2. `.business-card` → added `transition: box-shadow 0.2s, border-color 0.2s` (hover animates).
3. Enquiry dialog → ref density restored: `max-height: 90dvh` + `overflow-y: auto`, gap 16px,
   padding 40px, title 32px, description 16px/1.8, form gap 17px, textarea 95px.
4. `.button` → `padding: 15px 25px` + literal `height: auto; box-shadow: none; white-space: normal`.
5. `.tile-copy h3` → removed the `500` weight / `-0.045em` overrides (base `h3` 600 / `-0.035em` applies, as in the reference).
6. `.experience-photo img` → declared `filter: none` for literal parity; overseas image `object-position: 50% 55%`.
7. `.coordination-tab-list > button` → font-weight 500 (reference renders `font-medium`).
8. Overseas benefits icon → `FileCheckCorner` (reference uses `file-check-corner`).
9. Mobile drawer accordion → reference beige link chips (`#eee7d9`, border `#ded3bd`,
   padding 11px 17px, 16px, last-child border 0) via `.mobile-nav-section` / `.mobile-accordion-link`.

Remaining pairs are cascade-equivalences only (`var(--gold)` == `#aa8c56`,
shorthand-vs-longhand, missing defaults), verified equal during the audit.
