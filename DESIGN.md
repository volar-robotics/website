---
date: 2026-10-24
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
capsule windows, panels, panel pairs, bands and connectors. Follow that contract for
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
| Animated field | `CarvedMark` in `assets/js/experience.js`, canonical data in `assets/brand/carves.json`; integrated into Home, navigation and page illustrations. |
| Field pattern | Backgrounds in `assets/css/main.scss`; shared `--pattern-size` controls density. |
| Contained window | `.portrait-hole`; founder-specific crops preserve optical centering. |
| Emerging window | `_includes/platform-stage.html`, `.stage-capsule`, `.platform-window`, `.platform-foreground`; miniThex on Technology. |
| Panel pair | `.technology-explorer`, with `.explorer-stage` and `.pillar-panel`; platform and both pillar explanations. |
| Band | `.evidence-note` for the Technology evidence scope; `.route-path` for navigation. |
| Connector | Labeled links inside `.route-path` and `.breadcrumbs`; these already express the page relationships without requiring additional drawn lines. |

Both technology pillars remain inline. Longer research methods and sources use native
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

## Navigation

The main path is Home → Technology → Research → Company. Research owns the two project
pages; Company owns the purpose article. Breadcrumbs identify each page's parent.
The bottom navigation moves through the main path or returns from a child to its parent.
Persistent navigation and contact are utilities. Cards have one link each. Both pillar explanations are visible inline beside miniThex.

The technology has exactly two pillars: friction-anchor interaction and soft-optical
tactile sensing. Inspection is an application under research. The homepage introduces
the company through its animated identity with one route into Technology. Technology shows
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
Founder portraits come from the September RoboPitch deck and are centered in capsule masks.
The Sapienza logo uses the existing university artwork in `assets/img/Uniroma1.svg`. Product illustrations
use the supplied transparent PNGs at two resolutions. A square, bounded composition
keeps the capsule proportions fixed. The rear image is clipped to the opening; a matching
foreground layer extends beyond its edge. Engineering meshes and the engineering viewer are excluded
from the public build.

The canvas mark follows the design repository's motion rules. Automatic sequences stop
offscreen or when the document is hidden.

The navigation uses the animated mark beside the original outlined wordmark.
Reduced motion has a still equivalent. The footer offers a persistent pause control.
The contact dialog contains focus and supports Escape and backdrop dismissal. It creates
an email link and submits nothing.

## Checks

Build with `bundle exec jekyll build --strict_front_matter` and run `bundle exec jekyll doctor`.
Check mobile and desktop widths, inline pillar explanations and their anchors, experiment
stages, publication links, source disclosures, mobile navigation and motion controls. Verify
internal links, image loading, overflow and the absence of engineering assets in `_site/`.
The design repository's build and checks govern its generated pattern assets.

Apply the visual system's component checks to changed compositions. For this website,
include disabled JavaScript and verify that essential content and navigation remain usable.
