# Project overview

`porto` is Jérôme Stephan's personal portfolio and blog, published at
`jeromestephan.de`. It is a static site built with **Eleventy 2**, **Pug**,
**Markdown**, and **Tailwind CSS 3**. Browser interactions use vanilla JavaScript;
there is no application server or database in this repository.

## Getting started

Install dependencies with `npm ci`. For local development, run these commands in
separate terminals from the repository root:

```sh
npx @11ty/eleventy --serve
npx tailwindcss -i ./src/css/tailwind.css -o ./_site/css/style.css --watch
```

Eleventy serves the site at `http://localhost:8080`. It writes HTML and assets to
`_site/`; Tailwind scans that generated HTML, so **build Eleventy before Tailwind**
when doing a one-off build:

```sh
npx @11ty/eleventy
npx tailwindcss -i ./src/css/tailwind.css -o ./_site/css/style.css --minify
```

`_site/` is ignored generated output. Edit source files, then rebuild. There is
currently no automated test suite: `npm test` is a placeholder that exits with an
error. Validate changes with the builds above and browser checks at mobile and
desktop widths.

## Where things live

| Path | Purpose |
| --- | --- |
| `.eleventy.js` | Input/output directories, plugins, collections, filters, image processing, and asset copying. |
| `src/sites/` | Main pages: `Home.pug`, `About.pug`, `Blog.pug`, and `Impressum.pug`; `Project.pug` generates project pages and `_tags.pug` generates blog tag pages. |
| `src/_includes/_layouts/` | Shared page shell (`template.pug`), article layout (`blog_post.pug`), and blog/tag listing layout (`blog_view.pug`). |
| `src/_includes/` | Navigation, portfolio/blog mixins, responsive images, carousels, spacers, grids, and project-order helpers. |
| `src/_data/projects/` | JSON/YAML project records, keyed by filename slug. |
| `src/_data/project_order.yaml` | Homepage project order, tile widths/aspect ratios, and nested groups. |
| `src/_data/clients.yaml`, `src/_data/socials.json` | About-page clients and shared social links. |
| `src/blog_posts/` | Article content, predominantly Pug with embedded Markdown. `_general/` contains reusable fragments; `WIP/` contains drafts. |
| `src/css/tailwind.css` | Font faces, theme variables, base typography, and custom component styles. |
| `tailwind.config.js` | Theme tokens, custom spacing/fonts, large-screen breakpoints, and generated-output scan paths. |
| `src/js/` | Menu/theme interactions (`main.js`) and animated flow-field canvas code. |
| `src/images/`, `src/fonts/`, `src/files/`, `src/favicon/`, `src/Games/` | Media, downloadable files, and a bundled Unity WebGL game. |
| `scripts/`, `layout-data.json` | Manual project-layout migration helpers and extracted layout data; not part of the normal build. |

## Content and rendering flow

- **Pages:** Pug pages extend `/_layouts/template`. The shared shell supplies
  metadata, fonts, navigation, theme initialization, and `/js/main.js`.
  `eleventyNavigation` front matter controls navigation entries. Main page URLs
  retain their capitalization, e.g. `/Home/`, `/About/`, and `/Blog/`.
- **Projects:** `Project.pug` paginates over `projects` and generates
  `/projects/<slug>/`. Records contain `name`, `description`, `tools`, `year`,
  `cover_img`, and `media`. The homepage uses `project_order.yaml`, normalized by
  `sortCollection.pug`; listing a project there controls its homepage placement.
- **Blog:** Published Pug articles extend `/_layouts/blog_post` and fill
  `block blog_post`. Front matter supplies `title`, `subtitle`, `date`,
  `cover_img`, and `tags`; default URLs are `/blog_posts/<filename>/`.
  The `blog` collection only matches top-level `src/blog_posts/*.{pug,md}`.
  Nested drafts/fragments are excluded from that listing, but that alone does
  not prevent Eleventy from rendering them. Tag pages use `/Blog/tag/<tag>/`.
- **Images:** The `img_collection` build step uses `@11ty/eleventy-img` and Sharp
  to generate WebP/JPEG variants in `_site/img/`. `pf_blog.pug` and
  `mixin_responsive_image.pug` render images, videos, SVGs, embeds, and carousels.
  Original assets are also copied through. A first image build can be slow.
- **Styling:** Colors use CSS variables, dark mode uses the root `.dark` class,
  and light backgrounds are randomized by `main.js`. Root font sizes increase
  at large breakpoints. Navigation rotates onto the page edges in landscape.
  Blog post headers use the full page width, like project headers. Post bodies
  use a centered `.blog-article` reading column and scoped `.blog-prose` styles
  in `tailwind.css`; adjust those for article readability.

## Useful editing conventions

- Put shared article changes in `blog_post.pug` and its scoped CSS rather than
  duplicating them across posts. `blog_view.pug` controls the listing instead.
- Add media under `src/images/` and reference it with `/images/...` paths. Shared
  media mixins expect images to be present in the image collection.
- Pug accesses Eleventy helpers via `filters` (wired up in `.eleventy.js`),
  including date formatting, syntax highlighting, and SVG/video detection.
- Tailwind scans `_site/`, not the Pug source. Rebuild HTML after changing classes,
  including classes assembled dynamically in mixins, before compiling CSS.
