"""Check public routes and local references in the built Jekyll site."""

import os
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from xml.etree import ElementTree

ORIGIN = "https://volar-robotics.com"
SITE = Path(os.environ.get("VOLAR_SITE_DIR", "_site")).resolve()
REDIRECTS = {
    "/technology/": "/#technology",
    "/work/": "/#research",
    "/company/": "/#company",
    "/soar-touch/": "/#project-soar-touch",
    "/soar-ndt/": "/#project-soar-ndt",
    "/imprint/": "/legal/",
}


class Page(HTMLParser):
    """Collect link targets, document IDs and routing metadata."""

    def __init__(self, source):
        super().__init__()
        self.ids = []
        self.references = []
        self.canonical = None
        self.refresh = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for attr in ("href", "src"):
            if attrs.get(attr):
                self.references.append(attrs[attr])
        if attrs.get("srcset"):
            self.references.extend(item.strip().split()[0] for item in attrs["srcset"].split(","))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs["href"]
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "refresh":
            self.refresh = attrs["content"].split("url=", 1)[1]


class SiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not (SITE / "index.html").is_file():
            raise RuntimeError(f"Build the site before testing: {SITE}")
        cls.pages = {
            "/" + str(path.relative_to(SITE)).removesuffix("index.html"): Page(path.read_text())
            for path in SITE.rglob("*.html")
        }

    def assert_local_reference(self, source_url, reference):
        destination = urlsplit(urljoin(ORIGIN + source_url, reference))
        if destination.scheme not in ("http", "https") or destination.netloc != urlsplit(ORIGIN).netloc:
            return
        path = unquote(destination.path)
        target = SITE / path.lstrip("/")
        if target.is_dir():
            target /= "index.html"
        self.assertTrue(target.is_file(), f"Missing destination: {source_url} → {reference}")
        if destination.fragment and target.suffix == ".html":
            self.assertIn(
                unquote(destination.fragment),
                Page(target.read_text()).ids,
                f"Missing fragment: {source_url} → {reference}",
            )

    def test_internal_references_resolve(self):
        for route, page in self.pages.items():
            self.assertEqual(len(page.ids), len(set(page.ids)), f"Duplicate IDs: {route}")
            for reference in page.references:
                with self.subTest(route=route, reference=reference):
                    self.assert_local_reference(route, reference)
                    path = urlsplit(urljoin(ORIGIN + route, reference))
                    if route not in REDIRECTS and path.netloc == urlsplit(ORIGIN).netloc:
                        self.assertNotIn(
                            path.path,
                            REDIRECTS,
                            "Internal links must bypass legacy URLs",
                        )
        for path in SITE.rglob("*.css"):
            route = "/" + str(path.relative_to(SITE))
            for reference in re.findall(r"url\(\s*['\"]?([^'\")\s]+)", path.read_text()):
                with self.subTest(stylesheet=route, reference=reference):
                    self.assert_local_reference(route, reference)

    def test_legacy_routes_redirect_to_canonical_destinations(self):
        for route, destination in REDIRECTS.items():
            with self.subTest(route=route):
                self.assertIn(route, self.pages)
                page = self.pages[route]
                self.assertEqual(page.canonical, ORIGIN + destination)
                self.assertEqual(page.refresh, ORIGIN + destination)
                self.assert_local_reference(route, destination)

    def test_sitemap_contains_only_canonical_content(self):
        root = ElementTree.parse(SITE / "sitemap.xml")
        urls = {node.text for node in root.findall(".//{*}loc")}
        for route, page in self.pages.items():
            if route in REDIRECTS:
                self.assertNotIn(ORIGIN + route, urls)
            else:
                self.assertEqual(page.canonical, ORIGIN + route)
                self.assertIn(ORIGIN + route, urls)
        self.assertEqual((SITE / "CNAME").read_text().strip(), urlsplit(ORIGIN).netloc)


if __name__ == "__main__":
    unittest.main()
