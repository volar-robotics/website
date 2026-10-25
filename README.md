---
date: 2026-10-25
---

# Volar Robotics website

Source for [volar-robotics.com](https://volar-robotics.com), built with Jekyll and
served by GitHub Pages.

## Local development

Requires Ruby (3.1+) and Bundler.

```bash
bundle install
bundle exec jekyll serve
```

The site is available at <http://127.0.0.1:4000>. Restart the server after changing
`_config.yml`.

## Checks and deployment

```bash
bundle exec jekyll build --strict_front_matter --destination /tmp/volar-site-check
bundle exec jekyll doctor
VOLAR_SITE_DIR=/tmp/volar-site-check python3 -m unittest discover -s test
```

The tests check the built site's links, fragment destinations, canonical URLs and
legacy redirects. This build stays separate from the local preview in `_site/`.

Push to `main` to publish through GitHub Pages (Settings → Pages → Source:
`main` / root).

## Structure and routes

- `index.html`: the identity, Technology (`/#technology`), Research (`/#research`)
  and Company (`/#company`) scenes.
- `_data/projects.yml`: ordered project summaries, external destinations and papers.
- `_data/company.yml`: founders and the company LinkedIn destination.
- `_includes/research-projects.html`: the Research scene.
- `_includes/home-company.html`: the Company scene and directory band.
- `aerial-robots-for-good.html`: the purpose article at `/aerial-robots-for-good/`,
  reached from Company.
- `legal.md`, `privacy-policy.md`, `cookie-policy.md`: the three legal pages.
- `redirects/`: compatibility URLs pointing to the canonical destinations.
  `/technology/`, `/work/` and `/company/` redirect to their homepage scenes;
  `/soar-touch/` and `/soar-ndt/` to their project anchors in Research;
  `/imprint/` to `/legal/`. GitHub Pages uses HTML redirects through
  `jekyll-redirect-from`. These URLs are excluded from the sitemap and must not
  be used in new internal links.
- `_layouts/`, `_includes/`: HTML shell and partials.
- `assets/`: styles, JavaScript, brand artwork, fonts and published images.
- `test/`: checks against the built site.

## Content notes

Use “Enabling tactile interaction in the sky” as the company tagline.
The two technology pillars are friction-anchor interaction and soft-optical tactile sensing.
Keep laboratory demonstrations and development goals distinct; inspection is an application.
The purpose article cites primary sources; check dated statistics before updating it.
The website component mapping, content rules and visual checks are in [DESIGN.md](DESIGN.md),
which links the shared visual-system contract in the design repository.
The site needs no JavaScript build step.
