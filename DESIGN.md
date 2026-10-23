# Website design

## Sources

The identity comes from `volar-robotics/design`: palette tokens, official lockups,
`geometry/carves.json`, and the field-carving, motion, pattern and typography guidelines.
The designer's `_Volar Template.key` and September 2026 RoboPitch and Technital decks
supply the sand/aqua fields, capsule framing and italic headline treatment.

`assets/brand/` contains unmodified generated outputs from the design repository.
Refresh those outputs there. `volar-pattern-tile.svg` repeats at its native aspect ratio
through the full footer field; the square preview is not a repeat tile. The field fades
as a whole to preserve text contrast. It represents the identity, not sensing data.

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

The canvas mark interpolates only the original bars' y and height. Anchors, outer ends,
pitch, width and corner radius stay fixed, with one fill per frame. The eye is excluded
because its free-standing bar cannot follow this model. Automatic sequences return to
rest between figures and stop offscreen or when the document is hidden.

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
