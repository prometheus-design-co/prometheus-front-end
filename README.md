# Prometheus homepage

A responsive, locally hosted homepage for Prometheus. Everything needed to publish is in `dist/`. No dependencies or build step are required.

## View locally

Open `dist/index.html` directly, or run `npm start` from this folder and visit http://127.0.0.1:4173. Set `PORT` if that port is already in use.

## Edit

- `dist/index.html`: homepage content and accessible concept previews.
- `dist/styles.css`: brand colors, typography, responsive layouts, and animation.
- `dist/app.js`: mobile navigation, FAQ support through native HTML details, scroll reveals, privacy dialog, and contact behavior.
- `dist/config.js`: verified contact email and social links.
- `dist/assets/`: locally stored Prometheus symbol and fonts with font licenses.

The page includes all supplied content, six outcome-led services, three explicitly fictional scenarios, four process steps, four differentiators, six FAQs, and a contact form. Service cards can prefill the inquiry without overwriting an existing message.

## Before publishing

The contact email and social URLs were not supplied. Add them to `dist/config.js`. Until an email is configured, form submission clearly explains that no message has been sent. After configuration, the form opens an email draft for the visitor to review and send; it does not claim to deliver messages. A hosted form service can replace this later. The form does not store entries.

The privacy dialog currently describes the local preview. When contactEmail is configured it describes the email-draft behavior. Review and finalize the policy for the actual hosting and inquiry service before launch.

No hosting, GitHub upload, or deployment was performed. Upload this project to your chosen repository whenever ready; use `dist` as the static publishing directory (or publish its contents). The local preview server is for development only.

## Design sources

Brand sheet: https://www.figma.com/design/2cjpZw4LQgTfd8l4dlFvz2/Assets?node-id=460-148

Additional reference: https://www.figma.com/design/2cjpZw4LQgTfd8l4dlFvz2/Assets?node-id=507-496

Site reference: https://galaxy-habit-50924111.figma.site/

The Figma connector could not access these files, so their viewable browser versions were used to inspect the visual direction. This is an adaptation to the supplied homepage brief, rather than a pixel-for-pixel reproduction. The torch symbol and DM Sans font were exported from the published reference. Barlow Condensed is an open-source substitute for the brand sheet’s condensed heading style; licensed original heading font files can be swapped in later. All fonts and the symbol are stored locally; there are no runtime Figma or font-CDN dependencies. UI previews are built with HTML and CSS and contain fictional data.

## Accessibility and motion

Semantic headings and landmarks, a skip link, visible focus, labeled fields, native FAQ disclosures, an accessible modal, Escape-aware mobile navigation, and reduced-motion support are included. Scroll reveals progressively enhance already-visible content; content remains available without JavaScript. Without JavaScript, FAQ disclosures and anchor links still work; the submission button stays disabled to avoid an accidental form request.

Run `npm run check` for JavaScript syntax validation.

## Logo and hero update

The header and footer now use the original logo from Figma node `507:1801`. The hero reproduces node `507:1190` using five original assets in a responsive SVG composition, including the original positions, aspect ratio, layering, and fades. This replaces the initial text-and-interface-preview hero; all later homepage sections remain. Original artwork is in `dist/assets/hero-*` and the logo is `dist/assets/prometheus-logo.svg`. The Figma connector was accessible for this update.

## Painted hero and typography update

The current hero uses an original ancient Greek landscape and a transparent Prometheus foreground, generated with the built-in image-generation tool. Files: `dist/assets/olympus-landscape.png` and `dist/assets/prometheus-foreground.png`. The full production prompts are recorded in `hero-artwork-prompts.json`. The earlier Figma hero assets are retained for reference but are no longer displayed.

Landscape, headline, and foreground move at separate scroll speeds. Scroll remains native; passive listeners schedule transform updates in animation frames, offscreen work pauses, and reduced-motion preferences disable parallax. Mobile framing keeps the figure and Olympus visible.

All body and label text uses locally stored Red Hat Display. Headings use locally stored Pathway Gothic One. Their Google Fonts licenses are included with the assets. Existing logo artwork remains vector artwork. The header CTA now has a pill shape and a decorative arrow. The footer uses the original `507:1212` Figma artwork in `dist/assets/prometheus-footer.svg`.

The current simplified hero uses `olympus-landscape-flat.png` and `prometheus-foreground-flat.png` in `dist/assets`, generated with the built-in image tool. Flat color fields replace detailed textures. Composition and parallax behavior are preserved. Full prompts: `hero-flat-prompts.json`. Previous artwork is retained.

The latest hero uses `olympus-valley.png` and `prometheus-cliff.png`: a wider valley composition with a smaller torch-bearing Prometheus on the left cliff. Layered scroll motion remains. Built-in image-generation prompts are in `hero-reference-prompts.json`. Earlier variants are retained.

Hero headline uses Bambe Regular from https://www.1001fonts.com/bambe-font.html (`dist/assets/bambe-regular.ttf`). The source lists the download as free for personal use; obtain the appropriate commercial/webfont license before publishing this agency website. Other headings remain Pathway Gothic One.
