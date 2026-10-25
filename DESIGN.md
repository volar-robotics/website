---
date: 2026-10-25
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
| Contained window | `.portrait-hole` and `.company-portrait-window`; founder-specific crops preserve optical centering. |
| Emerging window | `_includes/platform-stage.html` on Technology; `.story-product-window` on Home. Both use matched rear and foreground image layers. |
| Panel pair | `.technology-explorer` groups the platform and pillars; `.research-panels` places laboratory contact research beside inspection research in development. |
| Resource inset | `.resource-inset` and `.resource-inset-label`; `.research-papers` supplies its placement beneath a project. |
| Band | `.evidence-note` for the Technology evidence scope; `.company-scene-band` for affiliation, office and Contact; `.route-path` for navigation. |
| Connector | Labeled links inside `.route-path` and `.breadcrumbs`; these already express the page relationships without requiring additional drawn lines. |

Both technology pillars remain inline. Longer evidence and source notes use native
inline disclosures. The contact dialog handles the focused contact task.

Shared presentation belongs in `assets/css/main.scss`; repeated markup with meaningful
structure belongs in a Jekyll include, as the product stage already does. Keep interaction
state in `assets/js/experience.js`. Existing selectors do not need renaming to match the
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
Its corresponding navigation links target those scenes; the dedicated pages remain
available. Research holds project summaries, external project links and
publications. Local project pages are temporarily excluded from the build; their source
remains in `_projects/`. Company owns the purpose article. Breadcrumbs identify each page's parent.
The bottom navigation moves through the main path or returns from a child to its parent.
Persistent navigation and contact are utilities. The opening “Scroll to explore” link
starts the homepage journey and uses the same `.text-link` treatment as “Meet the
projects.” There is no technology-only progress bar. Each project has one main external link; paper resources sit beneath SOAR-Touch. Both pillar explanations are visible inline beside miniThex.

On Home, the brand stays fixed as a return-to-start link. Over the first 160 pixels of
scrolling, its wordmark recedes. The resting logomark remains visible and carves into
the canonical upward arrow over 500 ms on hover or keyboard focus, returning to
rest on departure. It has no background plate; its single fill
changes to Sand where a dark research panel or footer passes beneath it. Paused or reduced motion uses the still state.
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

SOAR-Touch links to the Sapienza project website and the published arXiv preprint
`2610.10020`, which covers tactile sensing and manipulator experiments. The second
preprint has a clearly labeled, non-clickable placeholder.

## Media and motion

Research photographs and tactile images come from `soar-touch-report/assets/img/`.
Simone’s portrait is a crop from the flattened September RoboPitch slide; its source
resolution limits sharpness on dense displays. Antonio’s transparent portrait comes
from [his personal website](https://r-rapuano.com/assets/images/propic.png), encoded
as WebP at its original 1314 × 1203 resolution. Both are centered in capsule masks.
Mobile crops use a smaller image scale and individual horizontal face anchors while
preserving the capsule dimensions.
The Sapienza logo uses the existing university artwork in `assets/img/Uniroma1.svg`. Product illustrations
use the supplied transparent PNGs at two resolutions. A square, bounded composition
keeps the capsule proportions fixed. The rear image is clipped to the opening; a matching
foreground layer extends beyond its edge. Engineering meshes and the engineering viewer are excluded
from the public build.

The homepage uses a pinned scene on viewports at least 1000 pixels wide and 700 pixels
high when motion is enabled. It first zooms the whole resting mark uniformly, then hands
three bars over to independently sized content windows. This handover is a page transition;
it does not define a new carve or change the canonical mark. The heading appears during
the transition and the content arrives as the windows open. Scrolling backward reverses
the sequence. Narrow screens, short viewports, paused motion and reduced motion use a
normal document flow. Essential content also remains visible without JavaScript.

The technology composition uses three aligned, equally tall capsule windows. miniThex has
a Deep Blue opening and an internal miniThex / Research platform caption; the two
pillar windows use Sand with Deep Blue text. Their surfaces change during the handover
from the mark. The two pillars retain equal visual weight. The platform reuses the Technology page's
matched `.platform-drift` layers for hovering and pointer response, plus its Sand and
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
underlined links. The Research page uses that block to jump to the full paper entries,
whose available preprint has the same Orange accent. The jump places and focuses the
paper heading at the top of the viewport. Forthcoming work stays muted
and non-clickable.
The photograph's caption sits below the capsule, on the page background. There are no project tabs, overlays or separate project scroll stops. Narrow
screens preserve this sequence vertically, and the connector points downward.

`_includes/research-projects.html` reads projects with `home_order`, sorted by that value.
Their `home` frontmatter owns the name, program, status, summary, scope, media,
caption and action label. Top-level `project_url` and `papers` own the external project
destination and publication entries. The projects collection has `output: false`; its
metadata remains available to both Home and Research. Use `media: photograph` with a real image and alt text, or
`media: field` for a branded development visual. The order is editorial and carries
no implied completion date or validation milestone. The current pair occupies one
scene; adding projects requires reviewing its composition. Scroll length does not
grow with the project count. Without motion or JavaScript, all projects remain in
normal document order.

Company continues the homepage sequence in `_includes/home-company.html`. Its
Deep Blue field distinguishes the people scene from Sand research. During the
handover, the SOAR-NDT panel's measured bounds expand to fill the viewport. A
horizontal reveal then exposes one Sand directory band, with two fixed capsule
portraits crossing its upper edge. The windows retain their size and position.
Scrolling back reverses the reveal. The heading and secondary links become
available as they settle; keyboard focus reveals the complete scene.

The Company pattern ends at a tile boundary; the homepage footer starts at that
same boundary. Both use the same density, opacity and horizontal fade so they read
as one continuous Deep Blue field.

Both founders have equal window sizes and the same Co-founder label. Their names,
images and personal websites come from `_data/company.yml`, also used on the
Company page. New team content requires reviewing the composition. The shared band
contains affiliation, office and Contact. The office text also appears in the contact
dialog through `_includes/office-address.html`. `_includes/contact-button.html`
provides the same Contact action and styling in the header and Company band; text
links lead to destinations. The purpose article and LinkedIn page are secondary
routes. The company LinkedIn URL lives in `_data/company.yml` and also appears in
the footer. Mobile, short screens, paused motion and unavailable JavaScript show the
final content in normal reading order. An Orange `.accent-dot` sits at the first portrait rim, outside the image mask and
clear of the face and names. Portraits do not have an automatic animation.

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
internal links, image loading, overflow and the absence of engineering assets in `_site/`.
The design repository's build and checks govern its generated pattern assets.

Apply the visual system's component checks to changed compositions. For this website,
include disabled JavaScript and verify that essential content and navigation remain usable.
