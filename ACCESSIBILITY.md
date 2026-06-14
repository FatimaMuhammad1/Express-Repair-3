# Accessibility Checklist

This file tracks accessibility compliance (WCAG 2.1 AA standard).

---

## Quick Audit

Run **Lighthouse** in Chrome DevTools:

1. Press **F12** → **Lighthouse**
2. Click **Accessibility** → Run audit
3. Fix any issues with score < 90

---

## Manual Checklist

### Keyboard Navigation

- [ ] All interactive elements are keyboard accessible (Tab, Enter, Space, Arrow keys)
- [ ] Focus order is logical (top to bottom, left to right)
- [ ] Focus indicator is visible (blue outline)
- [ ] No keyboard traps (users can tab away from any element)

**Fix:** Use semantic HTML (`<button>`, `<a>`, `<input>`) and add `tabindex` only when necessary.

### Images & Icons

- [ ] All images have descriptive `alt` text
- [ ] Decorative images have `alt=""` (empty)
- [ ] Icons have `aria-label` or are inside labeled buttons

**Current status:**
- [x] `Logo.tsx` has alt text
- [x] Footer links have aria-labels
- [x] Service images have alt attributes (check each route)

**Fix example:**
```tsx
<img src="repair.jpg" alt="Laptop screen replacement service" />
<button aria-label="Close menu"><X /></button>
```

### Color & Contrast

- [ ] Text contrast ratio ≥ 4.5:1 (AA standard)
- [ ] Color is not the only way to convey information
- [ ] Links are distinguished (underline, color + other styling)

**Quick test:** Use Chrome DevTools → Elements → Computed → color & background-color, then check contrast at https://webaim.org/resources/contrastchecker/

**Current status:**
- [x] Header: white text on red background (✓ 6.3:1)
- [x] Footer: white text on dark background (✓ 7.2:1)
- [x] Body: dark text on light background (✓ 14:1)
- [ ] Links: check all link colors for distinction

### Form Accessibility

- [ ] All inputs have associated `<label>`
- [ ] Error messages are announced (role="alert")
- [ ] Required fields are marked as `required` and announced

**Fix example:**
```tsx
<label htmlFor="email">Email *</label>
<input id="email" type="email" required aria-required="true" />
```

### Semantic HTML

- [ ] Headings follow logical order (h1 → h2 → h3)
- [ ] Use `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`
- [ ] Use `<button>` for clickable actions, `<a>` for navigation

**Current status:**
- [x] `Header.tsx` uses `<header>` and `<nav>`
- [x] `Footer.tsx` uses `<footer>` and `<nav>`
- [x] Route components use `<main>`
- [ ] Check all routes for proper heading hierarchy

### ARIA (Accessible Rich Internet Applications)

- [ ] Use `aria-label` for icons/buttons without text
- [ ] Use `aria-describedby` for additional descriptions
- [ ] Use `role="alert"` for dynamic content
- [ ] Use `aria-live="polite"` for notifications

**Example:**
```tsx
<button aria-label="Dark mode toggle">
  <Moon className="w-4 h-4" />
</button>
```

### Focus Management

- [ ] Focus trap in modals (keep focus inside)
- [ ] Focus returned after modal closes
- [ ] Focus visible on all interactive elements

**Current status:**
- [ ] Dialog components — check Radix UI Alert Dialog

### Screen Reader Testing

- [ ] Test with a screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Page structure is announced correctly
- [ ] Form labels are announced
- [ ] Errors are announced

**Mac:** Use VoiceOver (Cmd + F5)
**Windows:** Use NVDA (free, https://www.nvaccess.org/)

### Motion & Animation

- [ ] No auto-playing animations (let user control)
- [ ] Respect `prefers-reduced-motion` CSS media query
- [ ] Animations don't cause seizures (no more than 3 flashes per second)

**Fix with Tailwind:**
```tsx
// Add motion-safe/motion-reduce utility
<div className="motion-safe:animate-pulse motion-reduce:opacity-100">
  Content
</div>
```

### Language & Readability

- [ ] Page `<html lang="en">` is set (✓ root.tsx)
- [ ] Abbreviations are explained: `<abbr title="...">ER</abbr>`
- [ ] Reading level is appropriate (8th grade or lower)
- [ ] No placeholder text used as labels

---

## Tools for Testing

### Browser Extensions

- **axe DevTools:** https://www.deque.com/axe/devtools/
- **WAVE:** https://wave.webaim.org/extension/
- **Lighthouse:** Built into Chrome

### Online Tools

- **WAVE Web Accessibility:** https://wave.webaim.org/
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Heading Map:** https://www.headingsmap.com/

### Automated Testing

```bash
# Frontend accessibility tests (with vitest)
npm run test:unit

# E2E tests with Playwright (can include a11y checks)
npm run test:e2e
```

---

## Resources

- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **WAI-ARIA Authoring:** https://www.w3.org/WAI/ARIA/apg/
- **WebAIM Articles:** https://webaim.org/

---

## Fixes to Implement

### Priority 1 (Critical)

- [ ] Verify all images have alt text
- [ ] Check heading hierarchy on each page
- [ ] Test keyboard navigation (Tab through all pages)
- [ ] Verify form labels are associated

### Priority 2 (Important)

- [ ] Check color contrast (especially links)
- [ ] Add aria-labels to icon buttons
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Respect prefers-reduced-motion

### Priority 3 (Nice to Have)

- [ ] Focus indicators are custom styled
- [ ] Animations are smooth and purposeful
- [ ] Skip-to-main-content link
- [ ] Language tag for non-English content

---

## Testing Frequency

- **Before release:** Full Lighthouse audit (target: 90+)
- **On changes:** Quick keyboard navigation test
- **Quarterly:** Full screen reader and manual testing

---

## Compliance Status

| Criterion | Status | Evidence |
|-----------|--------|----------|
| WCAG 2.1 AA | 🟡 In Progress | Lighthouse score TBD |
| Keyboard Navigation | 🟡 Partial | Tested header/footer |
| Color Contrast | 🟢 Compliant | Verified main sections |
| Images Alt Text | 🟡 Needs Review | Logo done, check all images |
| Form Labels | 🟡 Needs Review | Check /book and /contact |
| Heading Order | 🟡 Needs Review | Verify each route |

---

## Next Steps

1. Run Lighthouse audit → identify issues
2. Fix critical issues (images, headings, keyboard)
3. Test with keyboard only
4. Test with screen reader
5. Retest and verify 90+ score

**Target:** Achieve WCAG 2.1 AA compliance before production launch.

---

Last updated: June 2026
Next review: Before production launch

