# eDiye® Studio — Master Style Guide

This document captures the complete design token specifications extracted directly from the Framer project screenshots located at `style for eDiye/`.

---

## 1. Color Palette

### Primary Accent
| Token Name | Hex Code | Preview / Description | CSS Variable |
| :--- | :--- | :--- | :--- |
| **Primary** | `#0000FF` | Electric Blue (Brand Accent, 100%) | `--color-primary` / `--accent-blue` |

### Backgrounds
| Token Name | Hex Code | Preview / Description | CSS Variable |
| :--- | :--- | :--- | :--- |
| **neutral-bg** | `#F5F5F5` | Main site light canvas background | `--neutral-bg` / `--bg-page` |

### Neutral Scale
| Token Name | Hex Code | Description | CSS Variable |
| :--- | :--- | :--- | :--- |
| **neutral-0** | `#FFFFFF` | Pure White (Cards, Light text on dark) | `--neutral-0` |
| **neutral-50** | `#FAFAFA` | Off-white (Card hover surfaces) | `--neutral-50` |
| **neutral-100** | `#F5F5F5` | Neutral surface tone | `--neutral-100` |
| **neutral-200** | `#E5E5E5` | Light borders & slider background | `--neutral-200` |
| **neutral-300** | `#D4D4D4` | Subtle borders & dividers | `--neutral-300` |
| **neutral-400** | `#999999` | Muted body copy & icons | `--neutral-400` |
| **neutral-500** | `#7A7A7A` | Secondary text & subtitles | `--neutral-500` |
| **neutral-550** | `#1F1F1F` | Dark borders & card containers | `--neutral-550` |
| **neutral-600** | `#000000` | Pure Black (Headings & dark sections) | `--neutral-600` |

---

## 2. Typography Styles

### Headings
| Style Name | Font | Weight | Size | Letter Spacing | Line Height | Color | Paragraph Gap |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | `Inter` | Semibold (`600`) | `120px` | `-0.04em` | `1.1em` | `neutral-600` (`#000000`) | `0px` |
| **H1-Blog** | `Inter` | Semibold (`600`) | `72px` | `-0.06em` | `1.1em` | `neutral-600` (`#000000`) | `0px` |
| **H2** | `Inter` | Semibold (`600`) | `56px` | `-0.06em` | `110%` (`1.1`) | `neutral-600` (`#000000`) | `40px` |
| **H3** | `Inter` | Medium (`500`) | `40px` | `-0.05em` | `1.3em` | `neutral-600` (`#000000`) | `40px` |
| **H4** | `Inter` | Regular (`400`) | `22px` | `-0.04em` | `1.4em` | `neutral-600` (`#000000`) | `40px` |

---

### Paragraphs & Body Copy
| Style Name | Font | Weight | Size | Letter Spacing | Line Height | Color | Paragraph Gap |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Body-64** | `Inter` | Semibold (`600`) | `64px` | `-0.06em` | `110%` (`1.1`) | `#000000` | `20px` |
| **Body-48** | `Inter` | Semibold (`600`) | `48px` | `-0.05em` | `1em` | `neutral-0` (`#FFFFFF`) | `20px` |
| **Body-32** | `Inter` | Semibold (`600`) | `36px` | `-0.04em` | `1.3em` | `#000000` | `20px` |
| **Body-28** | `Inter` | Medium (`500`) | `32px` | `-0.04em` | `1.4em` | `neutral-50` (`#FAFAFA`) | `20px` |
| **Body-24** | `Inter` | Medium (`500`) | `28px` | `-0.04em` | `1.3em` | `neutral-500` (`#7A7A7A`) | `20px` |
| **Body-20** | `Inter` | Semibold (`600`) | `22px` | `-0.04em` | `1.4em` | `neutral-500` (`#7A7A7A`) | `16px` |
| **Body-20-blog** | `Inter` | Regular (`400`) | `22px` | `-0.04em` | `1.3em` | `neutral-500` (`#7A7A7A`) | `16px` |
| **Body-18** | `Inter` | Medium (`500`) | `20px` | `-0.04em` | `1.3em` | `#666666` | `20px` |
| **Body-16** | `Inter` | Regular (`400`) | `16px` | `-0.04em` | `1.6em` | `#666666` | `20px` |
| **Body-16 med**| `Inter` | Medium (`500`) | `16px` | `-0.04em` | `1.3em` | `#666666` | `20px` |
| **Body-14** | `Inter` | Medium (`500`) | `16px` | `-0.04em` | `1.6em` | `#666666` | `20px` |
| **Body-12** | `Inter` | Semibold (`600`) | `12px` | `-0.04em` | `1.6em` | `neutral-0` (`#FFFFFF`) | `20px` |

---

### Functional & UI Elements
| Style Name | Font | Weight | Size | Letter Spacing | Line Height | Color | Paragraph Gap |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tag** | `Inter` | Semibold (`600`) | `16px` | `-0.02em` | `1.6em` | `#666666` | `20px` |
| **Primary Button** | `Inter` | Semibold (`600`) | `18px` | `-0.04em` | `1.4em` | `neutral-600` (`#000000`) | `20px` |
| **Link Button** | `Inter` | Semibold (`600`) | `14px` | `-0.04em` | `1.4em` | `neutral-600` (`#000000`) | `20px` |

---

## 3. Utility Classes Reference

```css
/* Typography Helper Classes */
.text-h1           { font-size: 120px; font-weight: 600; letter-spacing: -0.04em; line-height: 1.1em; color: var(--neutral-600); }
.text-h1-blog      { font-size: 72px; font-weight: 600; letter-spacing: -0.06em; line-height: 1.1em; color: var(--neutral-600); }
.text-h2           { font-size: 56px; font-weight: 600; letter-spacing: -0.06em; line-height: 1.1; color: var(--neutral-600); }
.text-h3           { font-size: 40px; font-weight: 500; letter-spacing: -0.05em; line-height: 1.3em; color: var(--neutral-600); }
.text-h4           { font-size: 22px; font-weight: 400; letter-spacing: -0.04em; line-height: 1.4em; color: var(--neutral-600); }

.text-body-64      { font-size: 64px; font-weight: 600; letter-spacing: -0.06em; line-height: 1.1; color: #000000; }
.text-body-48      { font-size: 48px; font-weight: 600; letter-spacing: -0.05em; line-height: 1em; color: var(--neutral-0); }
.text-body-32      { font-size: 36px; font-weight: 600; letter-spacing: -0.04em; line-height: 1.3em; color: #000000; }
.text-body-28      { font-size: 32px; font-weight: 500; letter-spacing: -0.04em; line-height: 1.4em; color: var(--neutral-50); }
.text-body-24      { font-size: 28px; font-weight: 500; letter-spacing: -0.04em; line-height: 1.3em; color: var(--neutral-500); }
.text-body-20      { font-size: 22px; font-weight: 600; letter-spacing: -0.04em; line-height: 1.4em; color: var(--neutral-500); }
.text-body-20-blog { font-size: 22px; font-weight: 400; letter-spacing: -0.04em; line-height: 1.3em; color: var(--neutral-500); }
.text-body-18      { font-size: 20px; font-weight: 500; letter-spacing: -0.04em; line-height: 1.3em; color: #666666; }
.text-body-16      { font-size: 16px; font-weight: 400; letter-spacing: -0.04em; line-height: 1.6em; color: #666666; }
.text-body-16-med  { font-size: 16px; font-weight: 500; letter-spacing: -0.04em; line-height: 1.3em; color: #666666; }
.text-body-14      { font-size: 16px; font-weight: 500; letter-spacing: -0.04em; line-height: 1.6em; color: #666666; }
.text-body-12      { font-size: 12px; font-weight: 600; letter-spacing: -0.04em; line-height: 1.6em; color: var(--neutral-0); }

.text-tag          { font-size: 16px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.6em; color: #666666; }
.btn-primary-text  { font-size: 18px; font-weight: 600; letter-spacing: -0.04em; line-height: 1.4em; color: var(--neutral-600); }
.btn-link-text     { font-size: 14px; font-weight: 600; letter-spacing: -0.04em; line-height: 1.4em; color: var(--neutral-600); }
```
