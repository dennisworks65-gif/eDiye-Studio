const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PROJECTS_DIR = path.join(ROOT_DIR, 'content', 'projects');
const ARTICLES_DIR = path.join(ROOT_DIR, 'content', 'articles');
const WORKS_DIR = path.join(ROOT_DIR, 'works');
const ARTICLES_OUT_DIR = path.join(ROOT_DIR, 'articles');

// 1. Build Case Studies
if (fs.existsSync(PROJECTS_DIR)) {
  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} projects in ${PROJECTS_DIR}`);

  const projects = files.map(file => {
    return JSON.parse(fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8'));
  });

  function renderProjectTemplate(p) {
    const tagsHtml = (p.tags || []).map(t => `<span class="cs-tag"># ${t.replace(/^#\s*/, '')}</span>`).join('\n            ');
    
    const rel = (img) => {
      if (!img) return '';
      if (img.startsWith('http') || img.startsWith('../')) return img;
      return '../' + img.replace(/^\//, '');
    };

    const relatedCardsHtml = (p.related || []).map(r => {
      const rTags = (r.tags || []).map(t => `<span class="projects-tag-pill">${t.replace(/^#\s*/, '')}</span>`).join('\n                ');
      return `          <!-- Card: ${r.client || r.slug} -->
          <a href="${r.slug}.html" class="projects-card-link">
            <div class="projects-card-visual visual-medium">
              <div class="projects-card-tags">
                ${rTags}
              </div>
              <img src="${rel(r.image)}" alt="${r.client || r.title}" loading="lazy">
            </div>
            <div class="projects-card-info">
              <h3 class="projects-card-title">${r.client || r.slug}</h3>
              <div class="projects-card-desc">${r.title || ''}</div>
            </div>
          </a>`;
    }).join('\n\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.client || 'Project'} - ${p.title} — eDiye®</title>
  <meta name="description" content="${p.hero_desc || 'We build brands, design interfaces, and develop fast, functional websites that help growing teams stand out and convert.'}">
  <link rel="canonical" href="https://www.ediyestudio.com.ng/works/${p.slug}.html">
  <link rel="icon" href="../assets/images/ljCwDyWpHUcR27Eh2oMvudEmA.png">

  <!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="eDiye® Studio">
  <meta property="og:url" content="https://www.ediyestudio.com.ng/works/${p.slug}.html">
  <meta property="og:title" content="${p.client || 'Project'} - ${p.title} — eDiye®">
  <meta property="og:description" content="${p.hero_desc || ''}">
  <meta property="og:image" content="https://www.ediyestudio.com.ng/${p.hero_banner || 'assets/images/LMnLAUtHBsiEcqfMmuJIhYwbxFg.png'}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@jakke_dea">
  <meta name="twitter:creator" content="@jakke_dea">
  <meta name="twitter:title" content="${p.client || 'Project'} - ${p.title} — eDiye®">
  <meta name="twitter:description" content="${p.hero_desc || ''}">
  <meta name="twitter:image" content="https://www.ediyestudio.com.ng/${p.hero_banner || 'assets/images/LMnLAUtHBsiEcqfMmuJIhYwbxFg.png'}">
  <link rel="stylesheet" href="../css/tokens.css">
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css">
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body class="case-study-page">

  <!-- Top Announcement Bar -->
  <header class="announcement-bar">
    <span class="announcement-dot"></span>
    <a href="../index.html#pricing">
      <span>NEW eDiye® PRICING</span>
      <span>•</span>
      <span>LEARN MORE</span>
      <span>•</span>
      <span>NEW NOORA® PRICING</span>
      <span>•</span>
      <span>LEARN MORE</span>
    </a>
    <span class="announcement-dot"></span>
  </header>

  <!-- Navigation Bar (Light Canvas Variant) -->
  <div class="navbar-wrapper theme-light">
    <nav class="navbar-inner theme-light">
      <a href="../index.html" class="brand-logo">
        <div class="logo-text">eDiye<span class="reg">®</span></div>
        <div class="logo-sub">Clarity over clutter.</div>
      </a>

      <div class="nav-pills-group">
        <a href="../about.html" class="nav-pill-btn">About</a>
        <a href="../works.html" class="nav-pill-btn active">Projects</a>
        <a href="../shopify.html" class="nav-pill-btn">Shopify</a>
        <a href="../articles.html" class="nav-pill-btn">Articles</a>
        <a href="../contact.html" class="nav-pill-btn">Contact</a>
      </div>

      <button class="nav-mobile-toggle" aria-label="Toggle Navigation Menu">Menu</button>
    </nav>
  </div>

  <main>
    <!-- Case Study Hero Fold -->
    <section class="cs-hero-section">
      <div class="cs-hero-grid">
        <!-- Left: Metadata Stack -->
        <aside class="cs-meta-col">
          <div class="cs-meta-item">
            <span class="cs-meta-label">Client</span>
            <span class="cs-meta-val">${p.client || ''}</span>
          </div>
          <div class="cs-meta-item">
            <span class="cs-meta-label">Duration</span>
            <span class="cs-meta-val">${p.duration || ''}</span>
          </div>
          <div class="cs-meta-item">
            <span class="cs-meta-label">Date</span>
            <span class="cs-meta-val">${p.date || ''}</span>
          </div>
        </aside>

        <!-- Right: Content -->
        <div class="cs-content-col">
          <div class="cs-tags-row">
            ${tagsHtml}
          </div>
          <h1 class="cs-hero-title">${p.title || ''}</h1>
          <p class="cs-hero-desc">
            ${p.hero_desc || ''}
          </p>
          <a href="#about-the-project" class="cs-explore-btn">Scroll to explore</a>
        </div>
      </div>

      <!-- Full-Width Hero Media Showcase -->
      <div class="cs-hero-banner">
        <img src="${rel(p.hero_banner)}" alt="${p.client} - ${p.title}" loading="eager">
      </div>
    </section>

    <!-- Narrative & Case Study Details -->
    <section class="cs-content-section" id="about-the-project">
      
      <!-- Block 1: About the project -->
      <div class="cs-content-block">
        <div class="cs-block-label">${p.about_label || 'About the project'}</div>
        <div class="cs-block-content">
          <h2 class="cs-block-headline">
            ${p.about_headline || ''}
          </h2>
          <p class="cs-block-desc">
            ${p.about_desc || ''}
          </p>
        </div>
      </div>

      <!-- Full-Width Project Image 1 -->
      <div class="cs-content-img-full">
        <img src="${rel(p.showcase_img_1)}" alt="${p.client} Showcase" loading="lazy">
      </div>

      <!-- Block 2: Challanges -->
      <div class="cs-content-block">
        <div class="cs-block-label">${p.challenges_label || 'Challanges'}</div>
        <div class="cs-block-content">
          <h2 class="cs-block-headline">
            ${p.challenges_headline || ''}
          </h2>
          <p class="cs-block-desc">
            ${p.challenges_desc || ''}
          </p>
        </div>
      </div>

      <!-- 3-Image Gallery (2 Columns + 1 Full Width) -->
      <div class="cs-gallery-wrapper">
        <div class="cs-gallery-row-2col">
          <img src="${rel(p.gallery_img_left)}" alt="${p.client} Detail 1" loading="lazy">
          <img src="${rel(p.gallery_img_right)}" alt="${p.client} Detail 2" loading="lazy">
        </div>
        <img src="${rel(p.gallery_img_bottom)}" alt="${p.client} Detail 3" class="cs-gallery-img-bottom" loading="lazy">
      </div>

      <!-- Block 3: Summary -->
      <div class="cs-content-block" style="padding-bottom: 80px;">
        <div class="cs-block-label">${p.summary_label || 'Summary'}</div>
        <div class="cs-block-content">
          <h2 class="cs-block-headline">
            ${p.summary_headline || ''}
          </h2>
          <p class="cs-block-desc">
            ${p.summary_desc || ''}
          </p>
        </div>
      </div>

    </section>

    <!-- Discover More / Other Projects Section -->
    <section class="cs-discover-section">
      <div class="cs-discover-container">
        
        <div class="cs-discover-badge">
          <i class="ph-duotone ph-folder"></i>
          <span>DISCOVER MORE</span>
        </div>

        <h2 class="cs-discover-heading">
          Want to check more?<br>
          <span class="cs-discover-heading-sub">Discover our other projects.</span>
        </h2>

        <div class="cs-discover-grid">
${relatedCardsHtml}
        </div>

      </div>
    </section>

    <!-- Dark Lead Capture / Contact Section (1-to-1 Framer Architecture) -->
    <section class="section-contact-dark" id="contact">
      <div class="contact-dark-bg">
        <img src="../assets/images/2QwXSHgmouhAG707Aj6Ue0D7ZBg.png" alt="eDiye Studio Contact" class="contact-dark-img">
        <div class="contact-dark-overlay"></div>
      </div>

      <div class="container">
        <!-- Top Row: Badge + Main Heading + Subtitle in 3-Column Grid -->
        <div class="contact-header-3col-grid">
          <div class="grid-col-1">
            <div class="badge-tag contact-badge-blue">
              <i class="ph-duotone ph-paper-plane-tilt"></i>
              <span>Contact</span>
            </div>
          </div>

          <div class="grid-col-span-2">
            <h2 class="contact-heading-main">
              If your brand feels outdated, your website isn’t pulling its weight, or you’re simply ready to look more professional, eDiye is here to help.
            </h2>
            <p class="contact-sub-text">
              Reach out today and you’ll get a clear plan, honest advice, and a team that cares about the outcome as much as you do. Whether you prefer a quick call or a simple email, getting started is easy.
            </p>
          </div>
        </div>

        <!-- Bottom Row: Form Aligned with Right 2-Column Span -->
        <div class="contact-form-3col-grid">
          <div class="grid-col-1"></div>

          <div class="grid-col-span-2">
            <form class="contact-form-clean" id="studio-contact-form" action="https://formspree.io/f/xvkgovlb" method="POST">
              <div class="form-group-clean">
                <label for="form-name" class="form-label-clean">Name *</label>
                <input type="text" id="form-name" class="form-input-clean" placeholder="Jane Foster" required>
              </div>

              <div class="form-group-clean">
                <label for="form-email" class="form-label-clean">E-mail *</label>
                <input type="email" id="form-email" class="form-input-clean" placeholder="jane@framer.com" required>
              </div>

              <div class="form-group-clean">
                <label for="form-goals" class="form-label-clean">Project and goals *</label>
                <textarea id="form-goals" class="form-textarea-clean" placeholder="Tell us more" required></textarea>
              </div>

              <button type="submit" class="btn-send-message">Send message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Site Footer (1-to-1 Framer Architecture) -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-3col-layout">
        
        <!-- Left Column: Brand, Mission, and Contact Items -->
        <div class="footer-brand-side">
          <div class="footer-brand-top">
            <div class="footer-brand-logo">eDiye®</div>
            <div class="footer-tagline">Clarity over clutter.</div>
          </div>

          <div class="footer-brand-bottom">
            <p class="footer-mission">
              With eDiye, every part of your website works together to build clarity, trust, and momentum — not just visual polish, but real purpose.
            </p>

            <div class="footer-brand-divider"></div>

            <div class="footer-contact-items">
              <div class="footer-contact-item">
                <div class="label">[ Email ]</div>
                <div class="val"><a href="mailto:hello@diye.studio">hello@diye.studio</a></div>
              </div>
              <div class="footer-contact-item">
                <div class="label">[ Phone ]</div>
                <div class="val"><a href="tel:2349065175674">(234) 906 517 5674</a></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right 2 Columns: Newsletter & Navigation Grid -->
        <div class="footer-links-side">
          
          <!-- Top: Newsletter Form -->
          <div class="footer-newsletter-wrap">
            <h3 class="newsletter-title">Newsletter</h3>
            <div class="newsletter-sub">Sign in to newsletter and never miss any update.</div>
            <form class="newsletter-form" id="newsletter-form">
              <input type="text" class="newsletter-input" placeholder="your name..." required>
              <input type="email" class="newsletter-input" placeholder="your e-mail address..." required>
              <button type="submit" class="newsletter-btn">
                <span>Subscribe</span>
                <span class="sub-arrow">↳</span>
              </button>
            </form>
          </div>

          <!-- Bottom: 3 Nav Columns -->
          <div class="footer-nav-cols">
            <div>
              <div class="footer-nav-col-title">Navigation</div>
              <ul class="footer-nav-list">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../about.html">About</a></li>
                <li><a href="../works.html">Projects <span class="nav-count">[6]</span></a></li>
                <li><a href="../articles.html">Articles <span class="nav-count">[8]</span></a></li>
                <li><a href="../contact.html">Contact</a></li>
              </ul>
            </div>

            <div>
              <div class="footer-nav-col-title">Social</div>
              <ul class="footer-nav-list">
                <li><a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="https://behance.net" target="_blank" rel="noopener">Behance</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener">Youtube</a></li>
              </ul>
            </div>

            <div>
              <div class="footer-nav-col-title">Additionals</div>
              <ul class="footer-nav-list">
                <li><a href="../terms-of-service.html">Terms of Service</a></li>
                <li><a href="../privacy-policy.html">Privacy Policy</a></li>
                <li><a href="../shopify.html">Shopify</a></li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  </footer>

  <!-- Dark Full-Bleed Footer Bottom Bar -->
  <section class="footer-bottom-bar">
    <div class="left-stack">
      © 2025 eDiye. All rights reserved.
    </div>
    <div class="right-stack">
      <a href="https://x.com/jakke_dea" target="_blank" rel="noopener" class="creator-link">
        <img src="../assets/images/Ot8hE4Ji3qEmQb2AVwGOBjGAQ.jpg" alt="@Dennis" class="creator-avatar">
        <span>Created by <span class="highlight">@Dennis</span></span>
      </a>
      <a href="https://framer.link/jakke-dea" target="_blank" rel="noopener" class="framer-link">
        <img src="../assets/images/dZ3qW2jJj4hP7FSiFFZzXwCOTqI.png" alt="Framer" class="creator-avatar">
        <span>Made in <span class="highlight">Framer</span></span>
      </a>
    </div>
  </section>

  <!-- Progressive Liquid Glass Bottom Blur Overlay -->
  <div class="viewport-liquid-glass" aria-hidden="true"></div>

  <script src="../js/main.js"></script>

  <!-- Vercel Web Analytics & Speed Insights Telemetry -->
  <script defer src="/_vercel/insights/script.js"></script>
  <script defer src="/_vercel/speed-insights/script.js"></script>
</body>
</html>`;
  }

  projects.forEach(p => {
    const outputPath = path.join(WORKS_DIR, `${p.slug}.html`);
    const html = renderProjectTemplate(p);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`Generated: works/${p.slug}.html`);
  });
}

console.log('Build automation completed successfully!');
