# Plan: Consolidate sub-pages into the homepage with smooth scroll + animations

## 1. Convert nav links to in-page scroll

In `src/components/Header.tsx`, change the three nav items so they scroll to homepage anchors instead of routing to separate pages:

- Services → `/#services`
- Accessories → `/#accessories`
- Sell & Resell → `/#sell-resell`

Use `<a href="/#services">` (or `<Link to="/" hash="services">`) with a small click handler: if already on `/`, `preventDefault` and `document.getElementById(id).scrollIntoView({ behavior: "smooth" })`; otherwise let it navigate. Apply to both desktop and mobile menus. Add `scroll-margin-top` to section anchors so the sticky header doesn't cover them. Keep About, FAQ, Contact as routes.

## 2. Move page content into homepage sections

In `src/routes/index.tsx`, add three new full sections with `id="services"`, `id="sell-resell"`, `id="accessories"`:

- **Services section**: port the 9-card categories grid + pricing strip from `services.tsx` (replaces / augments current "What We Do" block, which we'll merge into this one to avoid duplication).
- **Sell & Resell section**: port the two-card "Sell Your Device" / "Buy Refurbished" block from `sell-resell.tsx`.
- **Accessories section**: port the 8-card accessories grid from `accessories.tsx`.

Each section keeps the existing blue theme, gradient cards, and image assets already used on those pages — no new images required.

## 3. Remove the old route pages

Delete:

- `src/routes/services.tsx`
- `src/routes/sell-resell.tsx`
- `src/routes/accessories.tsx`

The route tree regenerates automatically. Update any other internal `<Link to="/services">`, `/accessories`, `/sell-resell` references across the codebase (Footer, index "Learn More" links, etc.) to point at the new hash anchors.

## 4. Add Frost-Halal style animations

Frost-Halal uses subtle scroll-reveal (fade + slide up), staggered card entrances, soft parallax on hero, and smooth hover lifts. Implement with the lightweight `framer-motion` package (install via `bun add framer-motion`).

- Create a tiny `Reveal` wrapper component in `src/components/Reveal.tsx` using `motion.div` with `whileInView={{ opacity: 1, y: 0 }}`, `initial={{ opacity: 0, y: 24 }}`, `viewport={{ once: true, margin: "-80px" }}`, configurable `delay` for stagger.
- Wrap section headings, cards, and feature rows on the homepage with `<Reveal>` (stagger card grids by index \* 0.06s).
- Hero: add a slow parallax on the background image (`motion.img` with a `useScroll` + `useTransform` y offset) and a fade-in stagger on the eyebrow → headline → italic line → paragraph → CTAs.
- Apply globally `html { scroll-behavior: smooth }` in `src/styles.css` for native smooth scroll fallback.
- Keep existing hover-scale / shadow transitions; they already match the reference's feel.

## 5. SEO & cleanup

- Update homepage `head()` description to mention services, accessories, and trade-in (since they now live there).
- Remove unused imports in `index.tsx` after merging.
- Verify build passes and no dead links remain.

## Out of scope

- No color/theme changes (keep current blue system).
- No changes to About, FAQ, Contact, Book, Profile routes.
- No new imagery.
