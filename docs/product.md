# Margin product ideology and review record

## Product purpose

Margin is a personal reading room for sharing four carefully composed Efficient AI study artifacts with friends. The successful first visit takes a person from a clear overview to an interesting page in one decision. A successful return visit lets them find a remembered concept, continue the learning sequence, or send an exact page to someone else.

The product earns its quality through legible writing, thoughtful navigation, accurate content labels, working diagrams and sources, and small, intentional interactions. Its appearance grows directly from the artifacts: warm paper, dark ink, Charter or Georgia reading type, compact uppercase mono metadata, violet accents, amber annotations, generous breathing space, thin rules. Custom animation should suggest pages, ink and considered movement while keeping the reading experience calm.

## Source inventory and editorial understanding

1. **Why AI Has to Get Lighter** (`lecture2-efficient-ai.html`): motivation, quantization, pruning and hardware; a concise context-setting essay.
2. **Counting What Makes a Network Expensive** (`lecture3-efficient-ai-deep.html`): parameters, activations, latency, throughput and convolution; an analytical deeper essay.
3. **Inside a Neural Network: Layers, Channels, and What They Cost** (`neural-network-building-blocks.html`): neural architecture vocabulary and cost accounting; several interactive labs and exam checks.
4. **Neural Network Pruning: Cutting a Model Without Killing It** (`neural-network-pruning.html`): granularity, criteria, ratios and fine-tuning; several interactive labs and exam checks.

A useful learning sequence is motivation → building blocks → accounting → pruning. Lecture identifiers and the distinction between essays and labs make the overlapping subjects understandable. Content already includes source qualifications and sections describing what the pages do not establish; preserve these so the library retains its factual, bounded tone.

## Core user journeys

- Browse all four notes from the library and choose using title, short synopsis, lecture context and visible essay/lab labels.
- Search for a concept such as channels, latency or pruning and receive predictable results, an explicit empty state and an easy reset.
- Filter content without losing the search query; restore the entire collection through an obvious All control.
- Open a note at a stable URL, read the original artifact, use its interactive experiments, follow citations and navigate related notes.
- Share the actual current note URL, with visible success or failure feedback and a usable fallback when the clipboard API is unavailable.
- Return to the collection from any note without needing browser history.

## Acceptance criteria

### Collection

- All four artifacts appear once with descriptive titles and accurate essay/lab metadata.
- The page provides a clear reading order and visible collection scope without fabricated usage counts or personal claims.
- Search is case insensitive, searches useful topic metadata and supports an explicit empty state.
- Filters operate with search and visibly show their selected state.
- Each card's title or primary action is a native anchor to its page so keyboard, open-in-new-tab and copied-link behavior work.

### Reading and preservation

- Every note has a direct permanent URL that survives refresh on GitHub Pages.
- Original text, source caveats, diagrams, reference anchors, exam checks and interactive JavaScript behavior remain intact.
- Reader navigation offers Library, current note title, related or previous/next notes and share.
- Primary slide links resolve to hosted PDF copies. Source paths in the originals include `../Lecture2.pdf`, `../Lecture3.pdf` and `../Lecture6.pdf`; adjust distribution paths as needed while keeping sibling crosslinks and section anchors valid.
- No article is displayed in a tiny fixed-height frame or cropped container. Reading layout remains usable at a narrow phone width.

### Visual and interaction quality

- Library and article chrome share the artifacts' paper/serif/mono/violet/amber language.
- Typography, spacing, hover states, focus states, borders and motion are consistent across the collection.
- At least one relevant Fancy Components treatment is genuinely adapted and credited in implementation documentation; it supports this editorial experience.
- Motion is deterministic, restrained and disabled or simplified under `prefers-reduced-motion`.
- Keyboard users can navigate every control and see focus clearly. Buttons have accessible names and filters communicate selection.
- Desktop and mobile rendered views receive human visual review; source code inspection alone cannot satisfy the design review.

### Publication

- Repository creation, build and GitHub Pages publishing finish successfully.
- The final live URL returns the actual library, every note and slide links resolve, and a note's labs work on the deployed site.
- The final handoff identifies the canonical live website and notes any unresolved external gates accurately.

## Review protocol

The product manager reviews the designer's specification, the implementer's realized application and the deployer's public site. Reviews distinguish observed behavior from proposed behavior. Findings include a concrete trigger, impact and recommended correction. The product manager owns this document; implementation agents own application files. The root agent coordinates changes and final release.

## Review log

### Initial source review

**Observed:** all four artifacts use the same restrained paper styling. Two pages have JavaScript labs; two are essays. All include primary slide references and bounded provenance notes. Crosslinks include a building-blocks `#s4` section anchor.

**Sent to designer:** retain reading-focused hierarchy, numbered sequence, useful lab labels, brief paper/ink motion and reduced-motion support. Keep original lab behavior and reader chrome quiet.

**Sent to root:** ensure Lecture 2, 3 and 6 PDFs ship, because current slide links are relative to the original output directory. Preserve sibling URLs and section anchors.

**Status:** source and product review complete; awaiting design and rendered implementation for the next review.

### Design specification review

**Designer proposal:** warm 1160px library, large left-aligned Georgia title, compact provenance mark, custom violet/amber neural paper visual, four numbered full-width editorial entries, All / With labs / Saved controls, and quiet reader navigation. Fancy Text Highlighter and Letter Swap provide restrained annotation and label motion.

**Assessment:** appropriate continuity with the source artifacts and useful differentiation of essays from labs. Approved with conditions: Saved requires persistent behavior and an empty state; share requires feedback and clipboard fallback; mobile typography must collapse fluidly; the diagram must remain meaningful without pointer input; reduced motion must render the static design; the suggested learning sequence is motivation → building blocks → accounting → pruning.

### Deployment plan review

**Observed:** deployer created `addiee13/margin`, intends `https://addiee13.github.io/margin/`, and owns deployment workflow and documentation. Root prepared hosted copies of Lecture 2–6 PDFs and all four source artifacts.

**Gate:** Vite asset base must be `/margin/`; publish success alone does not prove usable article URLs, labs, mobile layout or PDF links. Those are reviewed against the live site before final handoff.

### Final design review

**Observed:** `docs/design.md` specifies the original-source identity, concrete typography/tokens, four accurate entries, search/filter/saved/share contracts, standalone reader preference, responsive behavior, accessible dialogs, Fancy adaptation licenses and reduced-motion rules. Designer installed and applied frontend-design and ui-ux-pro-max.

**Assessment:** approved. The planned hierarchy and restrained technical drawings express the real content. A native static implementation is an appropriate fit for direct URLs and source preservation. Saved and Share must ship as finished behavior; reader preservation and mobile overflow remain release gates.

**Implementation warning sent:** the pruning 8-column matrix has fixed 2.6rem cells and can widen a phone layout. Apply targeted responsive reader CSS or a local horizontal scroller while preserving complete matrices, scripts and labels. Do not conceal overflow globally. Maintain the companion `#s4` link and Library return on direct artifact pages.

### Initial implementation review

**Observed:** first React implementation uses hash routes for stable GitHub Pages reader links, title anchors, combined search/filter state, local saved state, full-height same-origin article iframe, native source labs, local table wrappers and targeted small-screen matrix CSS. Source content is fetched from preserved files; iframe links intercept sibling pages and section anchors.

**Findings sent to implementer:** sharing a reader section currently drops the section parameter; preserve it in copied reader URLs. The fallback share dialog requires Escape dismissal, focus containment/return and a meaningful selectable copy fallback. Standalone source URLs must include a Library return in generated distribution chrome. The full-height iframe approach must be verified visually to exclude nested scrolling and clipping.

**Status:** awaiting styles and local render. These findings are implementation observations, not a release approval.
