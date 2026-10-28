---
date: 2026-10-26
---

# Website design

## Sources

The identity comes from [`volar-robotics/design`](https://github.com/volar-robotics/design): palette tokens,
official lockups, `geometry/carves.json`, and its identity guidelines. Geometry belongs
in [field carving](https://github.com/volar-robotics/design/blob/main/guidelines/field-carving.md), deformation behavior in
[motion](https://github.com/volar-robotics/design/blob/main/guidelines/motion.md), and repeat construction in
[pattern](https://github.com/volar-robotics/design/blob/main/guidelines/pattern.md). Those files remain authoritative.
The designer's `_Volar Template.key` and September 2026 RoboPitch and Technital decks
supply the sand/aqua fields, capsule framing and italic headline treatment.

`assets/brand/` contains unmodified generated outputs from the design repository.
Generate changes there and copy the outputs here. Website composition and component
behavior belong in this file; do not copy geometry tables into it.

## Component contract

The [visual system](https://github.com/volar-robotics/design/blob/main/guidelines/visual-system.md) in the design repository
owns the adopted definitions and shared behavior for capsules, Volar fields, carves,
capsule windows, panels, panel pairs, resource insets, bands and connectors. Follow that contract for
website changes. When the sibling design checkout exists, read the same source at
`../design/guidelines/visual-system.md`. A standalone website checkout needs access to
the linked design source; its rules are not duplicated here. This file specializes
its website application.

Before changing a composition, identify its content question, component roles and
intended next and return routes. Reuse the current implementation where its role
matches. New conventions extend the shared contract in design; website-specific
behavior stays here.

| Role | Website implementation and use |
|---|---|
| Animated field | `CarvedMark` in `assets/js/experience.js` for carving; `HomeStory` in `assets/js/home-story.js` for the homepage scene; both read canonical `assets/brand/carves.json`. |
| Field pattern | Backgrounds in `assets/css/main.scss`; shared `--pattern-size` controls density. |
| Contained window | `.company-portrait-window`; founder-specific crops preserve optical centering. |
| Emerging window | `.story-product-window` uses matched rear and foreground image layers. |
| Panel pair | `.research-panels` places laboratory contact research beside inspection research in development. |
| Resource inset | `.resource-inset` and `.resource-inset-label`; `.research-papers` supplies its placement beneath a project. |
| Band | `.company-scene-band` for affiliation, office and Contact; `.route-path` for navigation. |
| Connector | Labeled links inside `.route-path` and `.breadcrumbs`; these already express the page relationships without requiring additional drawn lines. |

Both technology pillars remain inline. Longer evidence and source notes use native
inline disclosures. The contact dialog handles the focused contact task.

Shared presentation belongs in `assets/css/main.scss`; repeated markup with meaningful
structure belongs in a Jekyll include. Shared interaction state belongs in
`assets/js/experience.js`; homepage scene transitions belong in `assets/js/home-story.js`. Existing selectors do not need renaming to match the
vocabulary. Extract shared behavior when a real second use needs it; the site needs no
general component framework or JavaScript build step.

## Palette and type

Montserrat is self-hosted under the bundled SIL Open Font License. The main ground is
Sand. Deep Blue carries body text and dark bands; Aqua carries navigation bands and
product fields; Orange marks small points of attention. Body copy scales from 16 to
20 pixels; reading widths and section spacing have shared limits.

`.accent-dot` is the shared decorative dot treatment, with a Sand variant. Reuse it
occasionally at a capsule rim or in a brand field, including Technology, Research and
the Company mark. Orange supplies the larger accent; Sand supplies a smaller accent
on dark or aqua surfaces. Keep dots clear of text and primary image subjects. They
remain static, ignore pointer events and are hidden from assistive technology; they
carry no status or navigation meaning.

## Navigation

Home scrolls from the identity introduction into Technology, Research and Company.
Their canonical URLs are `/#technology`, `/#research` and `/#company` on
`https://volar-robotics.com`. Research holds project summaries, external project links
and publications. `/#project-soar-touch` and `/#project-soar-ndt` target the projects
within that scene. Company owns the separate purpose article, whose breadcrumb and
return link target `/#company`. The legal pages retain their own URLs.
Legacy URLs are compatibility redirects, defined in `redirects/` and excluded from
the sitemap. All internal links use the canonical destinations directly. The route
inventory and build checks are in [README.md](README.md).
Persistent navigation and contact are utilities. The opening “Scroll to explore” link
starts the homepage journey and uses the same `.text-link` treatment as “Meet the
projects.” There is no technology-only progress bar. Each project has one main external
link; paper resources sit beneath SOAR-Touch. Both pillar explanations remain inline,
beside miniThex on desktop and in successive pinned capsule scenes on compact screens.

On Home, the brand stays fixed as a return-to-start link. Over the first 160 pixels of
scrolling, its wordmark recedes. The resting logomark remains visible and carves into
the canonical upward arrow over 500 ms on hover or keyboard focus after leaving the
top of the page, returning to rest on departure. Touch devices hold the arrow after
scrolling more than eight pixels and restore the resting mark at the top. It has no
background plate; its single fill changes to Sand where the dark product window,
research panel, company field or footer passes beneath it. Paused or reduced motion uses the still state.
The link returns without reloading the page and has an explicit accessible label.

Underlined links share `--link-line`: 40% of the text color at rest, full contrast
on hover or keyboard focus. Text and action links use a one-pixel text underline
with a four-pixel offset. `.link-arrow` has a four-pixel gap from its label and moves
three pixels in the destination's direction over 200 ms;
paused and reduced-motion states keep the arrow still. Contact buttons retain their
separate button treatment.

The technology has exactly two pillars: friction-anchor interaction and soft-optical
tactile sensing. Inspection is an application under research. The homepage introduces
the company through its identity and scrolls into the platform and both pillars. Technology shows
the platform and both pillars; Research holds experiments and development; Company introduces
the founders and purpose.

## Evidence and disclosure

The user's two-pillar description, the local SOAR-Touch report, and the `soar-touch-phynt`
and `soar-touch-sot` source repositories support the technology description. Public copy
states laboratory contact flight as the demonstrated scope. It contains no generalized
energy, cost, slip-detection, field-reliability or inspection-accuracy claims.

The AUTOASSESS public project description supports naming SOAR-NDT and its intended
PEC inspection application. Selection and intended capabilities do not establish technical
validation. Internal plans, TRL targets, client engagements and algorithm details are
outside the website's content scope.

The purpose article cites HSE's 2025/26 provisional Great Britain counts and Schierbeck
et al.'s 2023 observational study. HSE counts describe all-industry hazards, not deaths
preventable by drones. AED results describe a separate system and selected operations;
the dispatch and delivery denominators accompany the comparison. Neither source is
presented as evidence of Volar's impact.
Its reading sequence moves from the association of drones with war to AED delivery,
workplace falls, AUTOASSESS's confined-space inspection goal and Volar's commitment
to supporting human expertise. AUTOASSESS's About page supplies the inspection
context; the human role is expressed as Volar's purpose. A full-width patterned Deep
Blue hero holds the Sand title and standfirst, with an unframed Orange heart carve.
The article uses one bounded frame on Sand, with consistent full-frame section
dividers and justified prose columns with English hyphenation. Dictionary-based
discretionary breaks in longer body words support browsers without automatic
hyphenation dictionaries. The article and
hero use bounded inner padding independent of the outer viewport gutters, keeping
the reading columns stable on very wide or zoomed-out viewports. The introduction
uses the same column split and gap as the evidence row with a left capsule.
Evidence sits in a Deep Blue
capsule on the right, then an Aqua capsule on the left; narrow screens put each
capsule centered beneath its text.
Editorial illustrations show AED delivery and human-supervised contact inspection,
in their related sections, at a bounded supporting size and in the website palette,
with captions identifying them as concepts. Dot grids stay inset from the curved
ends of evidence capsules. A patterned Deep Blue outlook panel with left-aligned
prose closes the narrative. The article uses no reused laboratory photograph.
On this route the fixed header mark shares Home's arrow behavior: Home at the top,
return to the article's top after departure, with the same hover and touch states.

SOAR-Touch links to the Sapienza project website and the published arXiv preprint
`2610.10020`, which covers tactile sensing and manipulator experiments. The second
preprint has a clearly labeled, non-clickable placeholder.

## Media and motion

Research photographs and tactile images come from `soar-touch-report/assets/img/`.
Both founder portraits use the supplied headshots, encoded as transparent WebP.
Simone’s background removal and subtle lighting adjustment match Antonio’s supplied
cutout. Their portrait framing uses founder-specific uniform scales and offsets to balance
eye spacing and eye level inside equal capsule masks. The same optical framing
applies on mobile while the capsule dimensions adapt to the screen.
The Sapienza logo uses the existing university artwork in `assets/img/Uniroma1.svg`. Product illustrations
use the supplied transparent PNGs at two resolutions. A square, bounded composition
keeps the capsule proportions fixed. The rear image is clipped to the opening; a matching
foreground layer extends beyond its edge. Compact screens bound both image layers
within the viewport so the emerging arm remains visible.

The homepage uses a pinned viewport when motion is enabled. Viewports at least
1000 pixels wide and 700 pixels high use the full composition. It first zooms the whole
resting mark uniformly, then hands
three bars over to independently sized content windows. This handover is a page transition;
it does not define a new carve or change the canonical mark. The heading appears during
the transition and the content arrives as the windows open. Scrolling backward reverses
the sequence. Narrow screens and short viewports keep the stage pinned while scroll
advances successive reading stops: miniThex, each pillar, one complete panel per
research project, then one company directory with portraits, affiliation and Contact.
Cards within Research enter and leave horizontally. Technology hands over to Research
as a full-height page transition, with its heading and content traveling vertically.
SOAR-NDT slides in from the right as an inset Deep Blue patterned panel over the Sand
research scene. Scrolling onward expands that panel's bounds to the full viewport,
revealing Company after the research content clears. The complete pattern aligns
with viewport coordinates during expansion and remains fixed behind Company.
Reversing scroll retraces both transitions. On phones, the opening mark occupies
the remaining space below the introduction, bounded by the available height and
width, with its base near the viewport's lower edge. The mark zooms
into the first capsule. Each stop includes a reading interval; content taller than the available region pans within
that region before the next transition. The final compact scene releases after its
own reading interval, with trailing space accounting only for the visible pinned stage. Scroll length follows measured content
height. Paused motion and reduced motion show the complete content in document flow.
Essential content also remains visible without JavaScript.
Compact cards accept pointer input only when both their own content and their
chapter are visible. Transparent chapters cannot intercept another scene's links;
keyboard focus continues to reveal the destination scene.
In document flow, scene headings leave clearance for the fixed return mark when
opened directly through a fragment URL.

Enhanced viewports at least 1600 pixels wide and 850 pixels high use a shared
chapter frame up to 1440 pixels wide, bounded to the available height and clear of
the fixed return mark. Technology, Research
and Company share a left heading anchor, headline scale, reserved heading row
and centered content region. Capsule proportions remain vertical as the content
region changes height. Intro shares the horizontal frame with balanced copy and
mark columns. Laptop and compact layouts retain their existing composition.
Capsule destinations and the research-to-company field expansion are measured
from that layout through resizing.

The desktop technology composition uses three aligned, equally tall capsule windows.
Compact screens present those windows successively in the same viewport region.
miniThex has
a Deep Blue opening and an internal miniThex / Research platform caption; the two
pillar windows use Sand with Deep Blue text. Their surfaces change during the handover
from the mark. The two pillars retain equal visual weight. The platform uses matched
`.platform-drift` layers for hovering and pointer response, plus its Sand and
Orange dot accents. The two image layers move together while their clipping planes
stay fixed. Homepage hovering pauses outside the technology reading state; the shared
pause and reduced-motion controls still apply.
The technology eyebrow sits directly above its headline, aligned to the capsule grid's
right edge on desktop and left on mobile. The persistent return mark has its own space.

The technology windows part to reveal one Research scene. SOAR-Touch starts the
sequence with a real laboratory photograph in a capsule window beside its explanation.
A directional connector leads into SOAR-NDT's continuous Deep Blue field, labeled
“Next application” and “In development.” Its pattern and static brand carve are
background identity elements. The photograph and text have no shared horizontal
boundary with the next project. During the transition, SOAR-Touch appears first and
SOAR-NDT follows; both remain visible at the final scroll position. This sequence
describes a research direction without implying validated inspection capability.
Each project shows its name, status, summary, evidence scope, program and one external
project link, labeled “Explore SOAR-Touch” or “Explore SOAR-NDT.” Home shows compact
SOAR-Touch paper entries in a labeled, lightly tinted block with an Orange edge and
underlined links. The available preprint links directly to arXiv; its full title,
publication status and evidence scope remain in project metadata and its accessible
link label. Forthcoming work stays muted and non-clickable.
The photograph's caption sits below the capsule, on the page background. Desktop
keeps the projects in one composition without tabs or separate project stops.
Compact screens show each project in one reading stop. SOAR-Touch pairs its capsule
photograph and caption with the project heading, then keeps its summary, evidence
scope, project link and papers in the same panel. SOAR-NDT pairs its static carve
with its heading inside the inset Deep Blue panel. Sand remains visible around the
panel and behind the research heading. Its complete pattern continues into the
expanding field that becomes the company background.
Compact SOAR-Touch places its photograph alongside the heading, summary and evidence
scope, with the project link and a two-column paper inset below. This keeps the
project's explanation and resources in one compact reading area. The pinned stage
follows the unzoomed visual viewport as browser controls retract
or expand, including browsers whose CSS viewport height includes an obscured area.
The opening scene fits that same visible height; the small CSS viewport remains the
separate reference for scroll timing. Pinch zoom retains the existing layout size.
The scene module shares the entry
script's build version so cached code and layout refresh together.
Compact panels fill that visible height, distributing spare space between content groups and increasing type and
portrait sizes within bounds. Reading stops are measured at the small viewport
height before the visible composition is measured, keeping scroll timing stable
through toolbar changes. Short screens retain compact sizes.

`_includes/research-projects.html` reads `_data/projects.yml` in list order. Each entry
owns its slug, name, program, status, summary, evidence scope, external destination,
media and paper metadata. Use `media: photograph` with a real image and alt text, or
`media: field` for a branded development visual. The order is editorial and carries
no implied completion date or validation milestone. The current pair occupies one
desktop scene; adding projects requires reviewing its composition. Desktop scroll length
does not grow with the project count; compact reading stops follow project order.
Without motion or JavaScript, all projects remain in normal document order.

Company continues the homepage sequence in `_includes/home-company.html`. Its
Deep Blue field distinguishes the people scene from Sand research. During the
handover, the SOAR-NDT panel's measured bounds expand to fill the viewport. A
horizontal reveal then exposes one Sand directory band, with two fixed capsule
portraits crossing its upper edge. The windows retain their size and position.
Scrolling back reverses the reveal. The heading and secondary links become
available as they settle; keyboard focus reveals the complete scene.

SOAR-NDT, Company and the homepage footer use the complete pattern at the same
density and opacity, without spatial fades. The desktop development panel aligns its
pattern to the company field's viewport coordinates, preserving the texture as the
field expands. The Company pattern ends at a tile boundary; the homepage footer
starts at that same boundary.

Both founders have equal window sizes and the same Co-founder label. Their names,
images and personal websites come from `_data/company.yml`. New team content requires reviewing the composition. The shared band
contains affiliation, office and Contact. The office text also appears in the contact
dialog through `_includes/office-address.html`. `_includes/contact-button.html`
provides the same Contact action and styling in the header and Company band; text
links lead to destinations. The purpose article and LinkedIn page are secondary
routes. The company LinkedIn URL lives in `_data/company.yml` and also appears in
the footer. Mobile and short screens keep the portraits, affiliation, office and
Contact together in one pinned directory, with the company heading and secondary
routes above it. A compact band places affiliation and office side by side, with
Contact spanning both columns. The Sand surface belongs to the complete directory
and ends at its content boundary. Paused motion and unavailable JavaScript show the
final content in document flow.
Orange `.accent-dot` elements sit at the portrait rims, alternating between upper right and lower left, outside the image
masks and clear of faces and names. Portraits do not have an automatic animation.

The canvas mark follows the design repository's motion rules. Automatic sequences stop
offscreen or when the document is hidden.

The navigation uses the animated mark beside the original outlined wordmark.
Reduced motion has a still equivalent. The footer offers a persistent pause control.
The contact dialog contains focus and supports Escape and backdrop dismissal. It creates
an email link and submits nothing.

## Checks

Build with `bundle exec jekyll build --strict_front_matter` and run `bundle exec jekyll doctor`.
Check mobile and desktop widths, inline pillar explanations and their anchors, external project
destinations, publication links, source disclosures, mobile navigation and motion controls. Verify
internal links, image loading and overflow. Run the built-site route checks in
[README.md](README.md).
The design repository's build and checks govern its generated pattern assets.

Apply the visual system's component checks to changed compositions. For this website,
include disabled JavaScript and verify that essential content and navigation remain usable.
