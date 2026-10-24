---
date: 2026-10-24
---

# volar-robotics.github.io

Source for the [Volar Robotics](https://volar-robotics.github.io) website.
Static site built with Jekyll and served by GitHub Pages.

## Local development

Requires Ruby (3.1+) and Bundler.

```bash
bundle install
bundle exec jekyll serve
```

The site is then available at <http://127.0.0.1:4000>.

## Deploy

Push to `main`. GitHub Pages builds and publishes automatically
(Settings → Pages → Source: `main` / root).

## Structure

- `index.html`: company introduction with the animated identity.
- `technology.html`: miniThex with both technology pillars explained inline.
- `work.html`: the research index.
- `company.html`: founders and company background.
- `aerial-robots-for-good.html`: the purpose article, reached from Company, with evidence and sources.
- `_projects/`: SOAR-Touch demonstrations and active SOAR-NDT development.
- `imprint.md`: legal / affiliation page.
- `_layouts/`, `_includes/`: HTML shell and partials.
- `assets/`: CSS (SCSS), JS, images.

## Content notes

Use “Enabling tactile interaction in the sky” as the company tagline.
The two technology pillars are friction-anchor interaction and soft-optical tactile sensing.
Keep laboratory demonstrations and development goals distinct; inspection is an application.
The purpose article cites primary sources; check dated statistics before updating it.
The website component mapping, content rules and checks are in [DESIGN.md](DESIGN.md),
which links the shared visual-system contract in the design repository.
The site needs no JavaScript build step. Engineering meshes and the engineering viewer are excluded from the public build.
