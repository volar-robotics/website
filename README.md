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

- `index.html`: single-page landing.
- `imprint.md`: legal / affiliation page.
- `_layouts/`, `_includes/`: HTML shell and partials.
- `assets/`: CSS (SCSS), JS, images.
