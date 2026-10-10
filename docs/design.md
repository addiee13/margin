# Margin: design ideology and interface specification

## Product idea

Margin is a personal shelf of ideas worth passing around. Its job is to help a friend find an explanation, read it comfortably, explore the working examples, and send a permanent link to another friend. The four actual artifacts are the product. The interface feels like opening a carefully kept notebook: literate, precise, generous, and warm.

The identity inherits the artifacts' paper, Charter/Georgia serif, measured line lengths, violet links/diagrams, amber highlights, monochrome metadata, explicit references, and honest source limitations. Premium quality comes from typographic care, real working interactions, composed whitespace, and faithful reading pages.

## Source understanding

All four HTML files were read, including original CSS, markup, links, and interactive scripts.

- `lecture2-efficient-ai.html`: short motivation and hardware/quantization introduction, “Why AI Has to Get Lighter”. No interactive labs. Carries explicit source verification caveats.
- `neural-network-building-blocks.html`: long teaching companion, “Inside a Neural Network: Layers, Channels, and What They Cost”. Four real labs: kernel presets, channel slider, convolution calculator, pooling. Quiz answers expand with details. Links to pruning.
- `lecture3-efficient-ai-deep.html`: focused reading on parameters, activations, latency, throughput, and device memory, “Counting What Makes a Network Expensive”. No interactive labs. Contains factual limitations and references.
- `neural-network-pruning.html`: long teaching companion, “Neural Network Pruning: Cutting a Model Without Killing It”. Four labs: sparsity patterns, editable magnitude weights, APoZ, sensitivity slider; expandable quizzes. Links back to channels.

Recommended reading sequence is motivation, building blocks, counting costs, pruning. Index numbers encode that actual suggested sequence. Preserve full titles inside the reading pages; the library can use shorter friendly headings provided descriptions correctly identify the artifact.

## Deliberate design choices

Spend the strongest expression on the opening composition: an oversized, balanced serif sentence beside an original technical drawing assembled from the artifacts' neural nodes, grids, and amber annotation. Keep the reading index quiet and practical. Avoid stock illustrations; create native SVG or CSS diagrams derived from real content.

Wide library, narrow reader. The library offers an overview; the reader keeps the original calm pace. The homepage hero is left aligned and the original article title remains centered. Body copy on the homepage is left aligned. Keep source article body formatting, while permitting a targeted mobile overflow fix.

The artifacts explicitly supply warm paper and serif/mono aesthetics, so those choices remain despite being common visual patterns. To make the identity specific, use technical editorial diagrams, actual lecture context, genuine reading sequence, and distinct art for each note. Do not insert invented testimonials, popularity counts, ratings, or promotional claims.

## Tokens

| Role | Value | Use |
| --- | --- | --- |
| Paper | `#f7f5ef` | Main library surface |
| Sheet | `#fffefb` | Reading preview and raised feature paper |
| Ink | `#25231f` | Titles, body, primary actions |
| Muted | `#6b665f` | Secondary readable text |
| Rule | `#ded9ce` | Dividers and subtle outlines |
| Violet | `#5b4fc7` | Active controls, diagrams, focus rings |
| Violet wash | `#eeebfb` | Selected states and soft diagram shapes |
| Amber | `#fde7c4` | Marker sweeps and selected ideas |

Use semantic CSS custom properties. No gradient backgrounds. Fine paper texture may be created by a low opacity SVG noise layer on the hero only, under text, with pointer events disabled. Texture must be almost imperceptible.

Display and reading serif: `Georgia, Charter, serif` in library; retain the source article `Charter, Georgia, serif`. Optional local display font may be used only if it improves the rendered result and has an included license. UI sans: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`; tiny metadata: `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`. Three roles, with metadata used sparingly. Keep UI labels in sentence case; uppercase is reserved for compact source provenance.

Type: wordmark 29px; desktop hero `clamp(44px, 6vw, 82px)` with line-height 1.02 and slight negative tracking; hero body 18px/1.6; library row titles 28–34px/1.16; row decks 16px/1.65; controls 14px; metadata 11–12px with at most 0.08em tracking. Retain article base around 17px/1.85 and 34rem text column. Library maximum width 1160px, desktop side padding 48px, mobile 22px. Space scale: 8, 12, 16, 24, 32, 48, 64, 96px. Border radii: paper preview 4px, small controls 8px, selection pills 999px. The different radii reflect different jobs.

## Homepage composition

```
Margin                 Library     About       [Share library]
─────────────────────────────────────────────────────────────
A little space                        annotated neural drawing
for big ideas.                        on two quiet paper sheets

Lecture notes, visual explanations,
and small experiments. Kept here,
so we can think through them together.
[Explore the library]                  Personal library / 4 notes
─────────────────────────────────────────────────────────────
The reading room              [Search notes______________]
[All notes] [With labs] [Saved]                  4 notes
─────────────────────────────────────────────────────────────
01  [small chip diagram]   Why AI has to get lighter     [save]
                           Motivation • overview        Read
                           Clear actual deck
─────────────────────────────────────────────────────────────
02  [layer grid drawing]   Inside a neural network       [save]
                           Foundations • 4 labs          Read
...
─────────────────────────────────────────────────────────────
Built for a slower, clearer kind of learning.     Margin © 2026
```

Masthead height 84px desktop / 72px mobile. Wordmark may use a small violet doubled vertical rule as an abstract margin mark, not an icon imported from a generic kit. Library nav is an anchor to the index; About opens a compact accessible dialog explaining that these are personal learning artifacts with cited original sources. Share library copies the canonical homepage URL and confirms success.

Hero desktop is roughly 58/42 with a 54px gutter and 72–88px top/bottom air; phone stacks title, description, CTA, then a smaller 220px diagram. Above-fold must still show the beginning of the library at normal laptop height. Do not let the hero become a whole landing-page screen before visitors can find the notes. Copy can be shortened if the actual viewport demands it.

Each note row is a clear article with a real link, not a div pretending to be clickable. Artwork width 160–190px, body flexible, trailing actions compact. A 1px rule separates rows; hover brings a subtle amber/violet tint behind artwork and a 4px shift of a visible arrow. Actual opening is bound to title/read link. Save button is a sibling, never nested in a link. Large row target may be an accessible stretched link only if Save remains reachable and semantics are valid.

Suggested thumbnails: motivation has compressed chip layers; building blocks has a row of filters and feature maps; cost counting has three minimal bars; pruning has a violet matrix with outlined empty cells. Provide title/deck text as the informative content; decorative artwork has `aria-hidden`.

## Functional contract

Search title, summary, lecture metadata, and meaningful tags. Visible search label or accessible label; placeholder “Search notes, topics, lectures”. Immediate results for four entries; announce count in a polite live region. `/` may focus search when focus is outside an editable control. Escape clears search only when it is focused. Search and filter combine. Empty state: “No notes found. Try a different topic.” plus Clear filters button.

All notes, With labs, and Saved are real filtering buttons with `aria-pressed`. With labs includes exactly the two interactive companions. Saved is local to this browser, persists through reload with localStorage, and has an explicit empty state: “Your saved shelf is empty. Save a note to keep it here.” Catch storage errors and show an understandable status, without blocking reading. Save buttons announce title and current state. Do not imply saves sync to friends.

Share uses Web Share API when appropriate, else clipboard, else a dialog containing a selectable absolute URL and explicit Copy action. Confirm “Link copied” only after actual success. Clear feedback after about 3 seconds, in a status region. Share direct article URLs, including any intended section fragment. A copied link must open the intended reader after hard reload and work on a separate browser.

## Reader

Prefer original standalone HTML reading pages with injected quiet library chrome and complete original scripts. Each must have a permanent URL. Header: Back to library, compact note title, Save, Share. Content begins below this 60–64px toolbar; desktop optional left margin index with numbered real h2 section anchors; small screens use a collapsible “On this page” list outside the article flow, dismissing after selection. Set scroll padding and section scroll margin so headings remain visible. An accessible progress line is optional, computed from the real document scroll extent, never a decorative fake.

Full-page native scrolling preserves browser find, citation anchors, linked companion sections, and predictable Back. If a same-origin iframe is chosen for preservation, it must have a descriptive title, a real standalone source link, reliable routing/deep linking, and avoid nested scrolling on mobile. The simpler direct HTML route is strongly preferred.

Preserve article text, source caveats, formulas, references, diagrams, source credits, working labs, and quiz details. Source PDF links must work publicly or be clearly marked unavailable. Keep companion paths and fragments working after relocation. Never expose a broken source button. Main local slides may be deployed if publication is authorized by root's scope decision.

At end: previous / next suggested note links, title text, and Back to library. First/last omit the absent direction. Original artifact footer remains, with library chrome separate in hierarchy.

## Fancy Components and custom motion

Verified official repository: https://github.com/danielpetho/fancy. License: MIT, copyright (c) 2024 Daniel Petho. Any copied or adapted substantial implementation must retain that license in `THIRD_PARTY_NOTICES.md` or an included source notice.

1. **Text Highlighter** — https://www.fancycomponents.dev/docs/components/text/text-highlighter ; source `src/fancy/components/text/text-highlighter.tsx`. Use its clone-safe background-size marker pattern for one short meaningful hero annotation or provenance phrase. Amber marker sweeps left to right once after first render, 600ms easing; do not recolor a random lone headline word. Keep text visible before animation and readable after. Reduced motion starts fully highlighted.
2. **Letter Swap Hover** — https://www.fancycomponents.dev/docs/components/text/letter-swap ; source `src/fancy/components/text/letter-swap-forward-anim.tsx`. Use for short masthead/action labels at most, e.g. “Library”, not article titles or long paragraphs. Its duplicated-character vertical treatment must preserve one accessible text label and aria-hide decorative duplicate characters. Trigger on keyboard focus as well as hover; leave static under reduced motion. Duration 240–320ms, stagger 12–18ms.
3. **Elastic Line** — source `src/fancy/components/physics/elastic-line.tsx`. Optional only; the default product needs the two components above. A single pointer-responsive separator could express the margin, but skip it if reader affordances/performance suffer. No essential controls depend on pointer physics.

The upstream components are React + motion/react. If root chooses native HTML/CSS/JS for dependable static deployment, adapt the actual marker and letter duplication algorithms into small native components with credited provenance. Do not add React solely for two effects. Describe them accurately as adaptations rather than claiming the unmodified upstream package was used.

Custom motion is a single staged first paint: ink title settles from 10px at 420ms, diagram connections draw 700ms, then marker sweep. Page is readable immediately; animation never gates content. No repeated per-row scroll reveals, no bouncing CTAs, no endless ambient loops. Interactions: selected filter tint 160ms; bookmark fill 180ms; share toast fade 160ms; menu/dialog open opacity plus 6px displacement 180ms. Reduced motion removes translations, draw animations, staggers, and smooth scrolling while preserving immediate state feedback.

## Mobile and accessibility quality floor

At <=720px collapse rows to thumbnail 88–104px beside title/deck; put metadata/actions on a clean second row if needed. At <=420px use single-column rows with a compact illustration band. Controls wrap; search remains full width. Preserve 44px touch targets with >=8px gaps. No text clipped and no page horizontal scroll. Dense original tables/matrices may use a labeled local horizontal scroller as a targeted exception; they must not widen the document.

One h1, semantic nav/main/article/footer. Skip-to-content link visible on focus. Violet 2px focus outlines with offset. Body/control contrast >=4.5:1. Dialogs trap focus, Escape dismisses, close returns focus to trigger. Icon buttons have meaningful labels. Transparent paper textures never degrade text. Browser zoom works, and the whole site remains operable with keyboard. Decorative technical art may not intercept clicks or hide content.

## Skills installed and applied

- `frontend-design`, https://github.com/anthropics/skills/tree/main/skills/frontend-design, installed with the official skill-installer helper to `/Users/addie/.codex/skills/frontend-design` and read. Applied subject-based identity, explicit token plan, restrained unique opening, critique, plain product copy.
- `ui-ux-pro-max`, https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/main/.claude/skills/ui-ux-pro-max, installed narrowly with the same helper to `/Users/addie/.codex/skills/ui-ux-pro-max` and read. Applied keyboard focus, readable contrast, touch targets, real deep links, state feedback, mobile layout, reduced motion.

Both installs used helper `--method git` after the local Python downloader reported a certificate-chain error. Installed skills will be discovered automatically next turn; their files were read and applied during this design task.

Design-system queries “personal reading library editorial” and narrower “knowledge management scholarly reading” returned scholarly typography and grid recommendations, but also a testimonial conversion layout. That layout did not fit this personal library after the narrower retry. The layout in this document is a deliberate source-grounded design decision. Targeted “keyboard focus modal” search returned relevant visible-focus and unobscured-focus guidance; that guidance is included above. No generated testimonials or commercial page structure are used.

## Review before release

Review actual rendered desktop and phone library/reader states. Verify all four notes, working labs in both companions, one deep link into channels, next/previous reading order, search result and empty result, Saved persist/empty state, share success/fallback, keyboard navigation, reduced motion, and public source PDF links. Premium appearance and working reading flow must both pass; a compiled bundle or clean source alone does not establish either.
