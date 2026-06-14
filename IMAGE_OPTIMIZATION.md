# Image Optimization Guide

This guide covers optimizing images for performance and best practices.

---

## Current Images

Images are in `src/assets/` and `public/`:

```
src/assets/
├── logo.png (light logo)
├── dark-logo.png (dark logo)
├── images/ (service & about images)
├── logos/ (brand logos)
└── service-images/ (repair service images)

public/
├── robots.txt
└── sitemap.xml
```

---

## Optimization Checklist

### 1. Format & Compression

- [ ] Convert PNG/JPG to WebP for modern browsers
- [ ] Use lossy compression for photos, lossless for graphics
- [ ] Compress JPGs to 75-80% quality
- [ ] Ensure no image exceeds 500KB

### 2. Responsive Images

Use `<picture>` element with `srcset` for different screen sizes:

```tsx
<picture>
  <source media="(max-width: 768px)" srcSet="image-mobile.webp" />
  <source media="(min-width: 769px)" srcSet="image-desktop.webp" />
  <img src="image-fallback.jpg" alt="Description" />
</picture>
```

Or use CSS background images with `background-size: cover`.

### 3. Lazy Loading

Add `loading="lazy"` to offscreen images:

```tsx
<img src="service-image.jpg" alt="Service" loading="lazy" />
```

### 4. CDN & Caching

In production (Vercel):
- Vercel automatically optimizes images
- Set Cache-Control headers in `vercel.json`

### 5. Alt Text

Every image MUST have descriptive `alt` text:

```tsx
<img src="logo.png" alt="Express Phone & Laptop Repair logo" />
```

---

## Tools for Optimization

### Online Tools

- **TinyPNG:** https://tinypng.com (PNG/JPG)
- **Squoosh:** https://squoosh.app (interactive, real-time)
- **ImageOptim:** https://imageoptim.com (Mac)
- **PNGQuant:** https://pngquant.org (PNG only)

### Command-Line Tools

```bash
# ImageMagick (convert, resize, compress)
brew install imagemagick
convert input.jpg -quality 80 output.jpg
convert input.png -strip -colors 128 output.png

# FFmpeg (WebP conversion)
brew install ffmpeg
ffmpeg -i input.jpg -c:v libwebp -quality 80 output.webp

# cwebp (official WebP tool)
brew install webp
cwebp -q 80 input.jpg -o output.webp
```

### Vercel Image Optimization

Enable in `next.config.js` (if using Next.js) or Vercel dashboard.

---

## Current Performance

Run **Lighthouse** in Chrome DevTools:

1. Open site in Chrome
2. Press **F12** → **Lighthouse** tab
3. Run **Desktop** and **Mobile** audits
4. Check "Performance" score (target: 90+)

### Common Issues

- [ ] Missing `alt` text on images
- [ ] Unoptimized image sizes
- [ ] No responsive images
- [ ] Unused CSS/JS affecting load time
- [ ] Missing caching headers

---

## Implementation Steps

### Step 1: Inventory Images

List all images and their current sizes:

```bash
# On Mac/Linux
find src/assets public -type f \( -name "*.jpg" -o -name "*.png" \) -exec ls -lh {} \;

# Get total size
du -sh src/assets public
```

### Step 2: Compress & Convert

For each image:

```bash
# Compress
cwebp -q 80 image.jpg -o image.webp

# Or use Squoosh GUI (easier)
```

### Step 3: Update HTML

Replace `<img>` with responsive versions using `<picture>` or `srcset`.

### Step 4: Test Performance

```bash
npm run build
npm run preview
# Run Lighthouse audit
```

### Step 5: Monitor

Set up alerts in Vercel/Lighthouse CI if images exceed size limits.

---

## Best Practices

✅ **Do:**
- Use WebP format with JPG fallback
- Optimize before uploading
- Add descriptive alt text
- Use lazy loading for off-screen images
- Compress to <100KB for thumbnails, <300KB for full-width
- Use SVG for logos and icons

❌ **Don't:**
- Use PNG for photos (use JPG or WebP)
- Upload original files from camera
- Use images as text (use actual text)
- Ignore alt text for SEO and accessibility
- Load full-resolution images on mobile

---

## Resources

- [Image Optimization Guide](https://web.dev/image-optimization/)
- [WebP Format](https://developers.google.com/speed/webp)
- [Responsive Images](https://web.dev/responsive-web-design-basics/)

---

## Estimated Impact

Optimized images can reduce:
- Page load time by 30-40%
- Bandwidth usage by 50-70%
- Improve SEO ranking
- Better Core Web Vitals score

---

Run Lighthouse after optimization to verify improvements! 🚀
