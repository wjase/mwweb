Melissa Wraxall. com

# Project page structure

This site is built from markdown pages in `docs/pages/` and a YAML menu configuration in `docs/pages/menu.yaml`.

## How pages are loaded

- Each page is stored in its own folder under `docs/pages/`.
- The main page file must be `index.md`.
- The site router loads `pages/<slug>/index.md` for each menu item.
- Menu items are defined in `docs/pages/menu.yaml`.
- The slug in `menu.yaml` becomes the URL path, for example `/gallery`.

## Page folder structure

A normal page folder looks like this:

```
docs/pages/<slug>/
  index.md
  img/
  gallery_file.yml
```

- `index.md` is the page content.
- `img/` holds page-specific image files.
- `gallery_file.yml` is optional and used for gallery sections where the page renders image grids.

## Supported page types

### 1. Static content pages

These pages are regular markdown files with HTML snippets for layout and images.
Examples: `about`, `contact`, `privacy`.

- Write markdown and HTML directly in `index.md`.
- Use `<img>` tags for images or `<div>` with `class="container-fluid"` sections.
- Image sources must be relative to the page folder, for example `img/example_sm.jpg`.
- The app rewrites `src` and `data-src` paths so page assets load from the correct folder.

### 2. Gallery pages

A gallery page uses markup like this in `index.md`:

```html
<div class="gallery" data-src="gallery2024.yml"></div>
```

- The gallery loader reads the referenced YAML file from the same page folder.
- Each gallery YAML file is a list of image entries.
- The page can include multiple gallery sections by adding multiple `<div class="gallery">` blocks.

Example gallery page:

- `docs/pages/gallery/index.md`
- `docs/pages/gallery/gallery2024.yml`
- `docs/pages/gallery/gallery2023.yml`

### 3. Hidden or manual pages

The `privacy` page is loaded by a manual router entry in `docs/js/app.js` and is not listed in the main menu.
If you add a similar hidden page, you must also add a router route in `app.js`.

# Creating a new page

## 1. Create the page folder

Add a folder under `docs/pages/` named after the page slug.
For example, to create a page at `/newpage`:

```
docs/pages/newpage/
  index.md
  img/
```

## 2. Add `index.md`

- Use markdown for headings and paragraphs.
- Use HTML for layout structure and images when needed.
- Keep image paths relative, such as `img/photo_sm.jpg`.

## 3. Add page assets

- Place local images in `docs/pages/<slug>/img/`.
- The site uses small versions named `*_sm.jpg` while loading the larger `*_lg.jpg` in the background.
- For example:

```
docs/pages/gallery/img/painting_sm.jpg
docs/pages/gallery/img/painting_lg.jpg
```

## 4. Add the page to the menu

Open `docs/pages/menu.yaml` and add a new entry:

```yaml
- item: NEW PAGE
  slug: newpage
```

- `item` is the menu label.
- `slug` is the folder name and URL path.
- Keep YAML indentation consistent with the existing list.

If the page should remain hidden, do not add it to `menu.yaml` and instead add a route manually in `docs/js/app.js`.

## 5. Verify locally

Run the site and visit the new URL in your browser:

```bash
npm start
```

Then open:

```text
http://localhost:3000/newpage
```

# Creating gallery content

Gallery pages use YAML files to describe items and image metadata.

## Gallery page structure

- Put gallery YAML files inside the same page folder as `index.md`.
- In `index.md`, add one or more gallery blocks:

```html
<div class="gallery" data-src="gallery2024.yml"></div>
```

- The app automatically loads `pages/<slug>/gallery2024.yml`.

## Adding images to a gallery

1. Copy the image files to `docs/pages/<slug>/img/`.
2. Name the smaller preview version with `_sm.jpg` and the large version with `_lg.jpg`.
3. Use the gallery update script to generate resized images if needed.
4. Add entries to the gallery YAML file.

Example YAML entry:

```yaml
- img: img/heliograph_sm.jpg
  alt: |
    Heliograph
    Oil on paper, framed
    40 cm x 52.5 cm
```

- Keep the YAML indentation exact.
- Additional fields like `link`, `status`, or `sold` can be used by the gallery renderer.

## Image resizing script

Use this script to scale images in the page folder image directory:

```bash
python script/updateImages.py docs/pages/<slug>/img
```

# Publishing changes

Use Source Control in the Activity Bar.

1. Review the changed files.
2. Revert any unwanted changes.
3. Add a commit message.
4. Commit and push.

# Tech info

- The site uses JavaScript to render markdown pages from `docs/pages/`.
- `docs/js/app.js` loads the menu from `pages/menu.yaml` and renders content from `pages/<slug>/index.md`.
- Gallery sections are rendered from YAML files and laid out with Masonry.
- Images are loaded asynchronously so `_sm.jpg` previews are replaced by `_lg.jpg` versions after loading.

## Requirements

- node/npm
- gulp
- python 3

## Starting the server

```bash
npm start
```

## Updating third-party JavaScript

```bash
npm update
```

If any vulnerabilities are flagged:

```bash
npm audit fix
```

Then copy vendor files into the project:

```bash
gulp
```

