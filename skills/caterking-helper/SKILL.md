---
name: caterking-helper
description: Helps create, modify, and manage CaterKing spit roast landing pages. Use this when generating a new suburb landing page or updating existing landing pages for CaterKing.
---

# CaterKing Helper Skill

This skill provides comprehensive instructions, code structures, and assets for creating and maintaining CaterKing's suburb-specific SEO landing pages.

## Context & File Structure

Every CaterKing landing page consists of 5 files:
1. `spit-roast-catering-[suburb]-head-section.html` (Title, Meta description)
2. `spit-roast-catering-[suburb].html` (Main body HTML)
3. `spit-roast-catering-[suburb].css` (Base styles)
4. `spit-roast-catering-[suburb]-desktop-tablet.css` (Desktop/Tablet layout styles)
5. `spit-roast-catering-[suburb]-mobile.css` (Mobile layout styles)

Template files are located in `assets/spit-roast-catering-waverley/`.

## Instructions

### 1. Generating a New Suburb
To generate a new suburb:
- Use the script in `scripts/generate_new_suburbs.js` as a reference.
- Copy the Waverley template and perform string replacements for the suburb name:
  - Lowercase name (e.g. `coogee`)
  - Capitalized name (e.g. `Coogee`)
  - All-caps name (e.g. `COOGEE`)
- Update the CSS prefixes from `waverleyservice` to `[suburb]service`.
- Customize the prose text to align with the suburb's character (beachside, university hub, multicultural, residential).
- Mapped the exact list of surrounding suburbs for the delivery list.

### 2. FAQ Accordion list (10 FAQs)
Ensure that you import all 10 FAQs from the content document. Do not truncate to 5. 
The HTML uses the Duda accordion structure. The dynamic accordion is managed by a Vanilla JS event listener located inside a `<script data-role="vanilla-accordion-fix">` block at the bottom of the accordion widget. The JS script handles any number of items dynamically.

### 3. Events We Serve Widget
The "Events We Serve" tabs widget is configured using a base64 string inside the `data-widget-config` attribute. 
To modify the tab text:
- Decode the base64 string.
- Update the JSON content (e.g., set the custom tab labels and descriptions).
- Re-encode the JSON back to base64.
- Replace the `data-widget-config` value in the HTML.

### 4. CDN Image Extensions
All images are hosted on a remote CDN (`irp.cdn-website.com`) and must use their original file extensions.
- **Do not convert the URL extensions to .webp**. This will result in 404 errors.
- Keep the original extensions:
  - HTML: `food-salad-healthy-vegetables.jpg`, `food-plate-food-from-restaurant-photos-menu_830198-9817.jpg`, `delicious-tapas-starter-food-composition_926199-1427508.jpg`, `catering-services-in-sydney-caterking.jpg`, `pexels-photo-7363202.jpeg`.
  - CSS: `restaurant-food-restaurant-menu-photos-menu_830198-1710.jpg`, `pexels-photo-32333375.jpeg`, `pexels-photo-31748664.jpeg`, `pexels-photo-8252824.jpeg`, `pexels-photo-32023378.jpeg`, `Finger-Food---Canapes.jpg`, `pexels-photo-1128783.jpeg`, `pexels-photo-8939516.jpeg`, `pexels-photo-12725447.jpeg`, `pexels-photo-6863526.jpeg`.

## Examples

Refer to the `scripts/generate_new_suburbs.js` script for full examples of replacing widget configurations, updating FAQs, replacing delivery lists, and writing the final files.
