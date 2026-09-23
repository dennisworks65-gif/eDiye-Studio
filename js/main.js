/**
 * eDiye® Design Studio - Main Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-enabled');
  initPricingSlider();
  initFaqAccordion();
  initMobileNav();
  initFormSubmissions();
  initHeaderScroll();
  initScrollReveal();
  initFramerScrollEnter();
  initTestimonialCarousel();
  initCountUp();
  initTrueFocus();
  initTeamCarousel();
  initAnalyticsTelemetry();
});

// --- Framer Scroll Animation: Layer in View (Replay: No) ---
function initFramerScrollEnter() {
  const elements = document.querySelectorAll('.framer-scroll-enter');
  if (!elements.length) return;

  function checkVisibility() {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // If element top is above 90% of screen height and bottom is below 0, mark in-view
      if (rect.top <= window.innerHeight * 0.92 && rect.bottom >= 0) {
        el.classList.add('in-view');
      }
    });
  }

  // Use IntersectionObserver with generous margins so cards enter smoothly before user reaches them
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target); // Replay: No
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '100px 0px 50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  // Run immediate check and listen on scroll/resize as fallback
  checkVisibility();
  window.addEventListener('scroll', checkVisibility, { passive: true });
  window.addEventListener('resize', checkVisibility, { passive: true });
}

// --- 1. Interactive Pricing Calculator Slider ---
function initPricingSlider() {
  const sliderInput = document.getElementById('pricing-slider');
  const sliderFill = document.getElementById('slider-fill');
  const sliderThumb = document.getElementById('slider-thumb');
  const priceDisplay = document.getElementById('price-value');
  const priceMainVal = document.getElementById('price-main-val');
  const priceSubVal = document.getElementById('price-sub-val');
  if (!sliderInput) return;

  let currentAnimatedPrice = 2500;
  let targetPrice = 2500;
  let animationFrameId = null;

  function animatePrice() {
    const diff = targetPrice - currentAnimatedPrice;
    if (Math.abs(diff) < 2) {
      currentAnimatedPrice = targetPrice;
    } else {
      // Spring-like interpolation step (Emil Kowalski continuous motion)
      currentAnimatedPrice += diff * 0.22;
      animationFrameId = requestAnimationFrame(animatePrice);
    }

    const displayVal = Math.round(currentAnimatedPrice);
    const formatted = displayVal.toLocaleString();
    
    if (priceDisplay) {
      priceDisplay.textContent = formatted;
    }
    if (priceMainVal && priceSubVal) {
      const parts = formatted.split(',');
      if (parts.length > 1) {
        priceMainVal.textContent = parts[0] + ',';
        priceSubVal.textContent = parts[1];
      } else {
        priceMainVal.textContent = formatted;
        priceSubVal.textContent = '';
      }
    }
  }

  function updateSlider() {
    const min = parseFloat(sliderInput.min) || 0;
    const max = parseFloat(sliderInput.max) || 100;
    const val = parseFloat(sliderInput.value) || 0;
    const percent = ((val - min) / (max - min)) * 100;

    if (sliderFill) sliderFill.style.width = `${percent}%`;
    if (sliderThumb) sliderThumb.style.left = `${percent}%`;

    // Calculate dynamic price based on scope slider ($2,500 to $8,500)
    const basePrice = 2500;
    const maxPrice = 8500;
    targetPrice = Math.round(basePrice + ((maxPrice - basePrice) * (percent / 100)) / 100) * 100;

    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(animatePrice);
  }

  sliderInput.addEventListener('input', updateSlider);
  updateSlider();
}

// --- 2. FAQ Accordion Functionality ---
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item, .faq-accordion-item');

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header, .faq-accordion-header');
    const content = item.querySelector('.accordion-content, .faq-accordion-body');
    const toggleIcon = item.querySelector('.accordion-toggle-icon, .toggle-symbol');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      accordionItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherContent = other.querySelector('.accordion-content, .faq-accordion-body');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 30 + 'px';
      }
    });
  });

  // Open active item(s) by default
  accordionItems.forEach(item => {
    if (item.classList.contains('active')) {
      const content = item.querySelector('.accordion-content, .faq-accordion-body');
      if (content) {
        content.style.maxHeight = content.scrollHeight + 30 + 'px';
      }
      const icon = item.querySelector('.accordion-toggle-icon, .toggle-symbol');
      if (icon) icon.textContent = '–';
    }
  });
}

// --- 3. Sticky Navbar & Header Scroll State ---
function initHeaderScroll() {
  const navbar = document.querySelector('.navbar-wrapper');
  if (!navbar) return;

  // On dedicated case-study, articles, or article-detail pages, keep natural relative positioning
  if (document.body.classList.contains('case-study-page') || 
      document.body.classList.contains('articles-page') || 
      document.body.classList.contains('article-detail-page')) {
    return;
  }

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    const currentScrollY = window.scrollY;

    // At top of page (hero fold)
    if (currentScrollY <= 40) {
      navbar.classList.remove('nav-hidden');
      navbar.classList.remove('nav-scrolled');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    // Scrolling DOWN past hero -> hide smoothly
    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      navbar.classList.add('nav-hidden');
    } 
    // Scrolling UP -> reveal with frosted light background
    else if (currentScrollY < lastScrollY) {
      navbar.classList.remove('nav-hidden');
      navbar.classList.add('nav-scrolled');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
}

// --- 4. Mobile Navigation Toggle ---
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-pills-group');

  if (!toggleBtn || !navLinks) return;

  navLinks.style.transition = 'opacity var(--duration-fast, 180ms) var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)), transform var(--duration-normal, 240ms) var(--ease-spring, cubic-bezier(0.16, 1, 0.3, 1))';
  navLinks.style.transformOrigin = 'top right';

  const closeMenu = () => {
    navLinks.style.opacity = '0';
    navLinks.style.transform = 'scale(0.96) translateY(-8px)';
    setTimeout(() => {
      navLinks.style.display = 'none';
    }, 180);
  };

  const openMenu = () => {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.right = '20px';
    navLinks.style.background = 'rgba(10, 10, 10, 0.94)';
    navLinks.style.backdropFilter = 'blur(16px)';
    navLinks.style.webkitBackdropFilter = 'blur(16px)';
    navLinks.style.padding = '16px';
    navLinks.style.borderRadius = '16px';
    navLinks.style.gap = '8px';
    navLinks.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.4)';
    navLinks.style.opacity = '0';
    navLinks.style.transform = 'scale(0.96) translateY(-8px)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        navLinks.style.opacity = '1';
        navLinks.style.transform = 'scale(1) translateY(0)';
      });
    });
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.style.display === 'flex' && navLinks.style.opacity === '1';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('click', (e) => {
    if (navLinks.style.display === 'flex' && !navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });
}

function showToast(message, type = 'success') {
  let container = document.getElementById('sonner-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'sonner-toast-container';
    container.style.position = 'fixed';
    container.style.bottom = '24px';
    container.style.right = '24px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    container.style.zIndex = '99999';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.style.background = type === 'success' ? '#000000' : '#1f1f1f';
  toast.style.color = '#ffffff';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '9999px';
  toast.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.2)';
  toast.style.fontSize = '14px';
  toast.style.fontWeight = '500';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '8px';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(16px) scale(0.96)';
  toast.style.transition = 'opacity 200ms cubic-bezier(0.23, 1, 0.32, 1), transform 260ms cubic-bezier(0.16, 1, 0.3, 1)';
  toast.style.pointerEvents = 'auto';
  toast.style.border = type === 'success' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 50, 50, 0.3)';
  
  const icon = type === 'success' ? '✓' : '!';
  toast.innerHTML = `<span style="font-weight:700; color:${type === 'success' ? '#38bdf8' : '#f87171'}">${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0) scale(1)';
    });
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px) scale(0.96)';
    setTimeout(() => {
      toast.remove();
    }, 260);
  }, 3500);
}

// --- 5. Form Submissions with Formspree Endpoint ---
function initFormSubmissions() {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvkgovlb';

  const contactForms = document.querySelectorAll('#studio-contact-form, #page-contact-form, .contact-form-clean, .contact-form');
  
  contactForms.forEach(form => {
    form.setAttribute('action', FORMSPREE_ENDPOINT);
    form.setAttribute('method', 'POST');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Send message';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      try {
        const formData = new FormData(form);
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (typeof window.va === 'function') {
            window.va('event', { name: 'lead_inquiry_success', data: { form_id: form.id || 'contact-form' } });
          }
          showToast('Inquiry sent successfully. We will get back shortly!');
          if (submitBtn) {
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.backgroundColor = '#0000ff';
            submitBtn.style.color = '#ffffff';
          }
          form.reset();
          setTimeout(() => {
            if (submitBtn) {
              submitBtn.textContent = originalText;
              submitBtn.style.backgroundColor = '';
              submitBtn.style.color = '';
              submitBtn.disabled = false;
            }
          }, 3000);
        } else {
          const data = await response.json().catch(() => ({}));
          const errorMsg = data.errors ? data.errors.map(err => err.message).join(', ') : 'Submission failed';
          showToast(errorMsg, 'error');
          if (submitBtn) {
            submitBtn.textContent = 'Error: ' + errorMsg;
            submitBtn.style.backgroundColor = '#e00000';
            submitBtn.style.color = '#ffffff';
            setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.style.backgroundColor = '';
              submitBtn.style.color = '';
              submitBtn.disabled = false;
            }, 3000);
          }
        }
      } catch (err) {
        showToast('Network error. Please try again.', 'error');
        if (submitBtn) {
          submitBtn.textContent = 'Network error. Please try again.';
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 3000);
        }
      }
    });
  });

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('.newsletter-btn');
      if (btn) {
        if (typeof window.va === 'function') {
          window.va('event', { name: 'newsletter_subscribe', data: { source: 'footer' } });
        }
        showToast('Thank you for subscribing to Ediye insights!');
        btn.innerHTML = 'Subscribed ✓';
        setTimeout(() => {
          newsletterForm.reset();
          btn.innerHTML = '<span>Subscribe</span><span class="sub-arrow">↳</span>';
        }, 2500);
      }
    });
  }
}

// --- 6. Scroll-Driven Text Word Reveal ---
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal-text');
  if (!revealElements.length) return;

  revealElements.forEach((el) => {
    const rawText = el.textContent.trim();
    const words = rawText.split(/\s+/);
    
    // Wrap each word in span
    el.innerHTML = words.map((word, i) => {
      return `<span class="reveal-word" data-index="${i}">${word}</span>`;
    }).join(' ');
  });

  function updateReveal() {
    revealElements.forEach((container) => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Reveal starts when top of container reaches 85% of screen height
      // Reveal completes when bottom reaches 35% of screen height
      const startTrigger = windowHeight * 0.85;
      const endTrigger = windowHeight * 0.35;

      let progress = (startTrigger - rect.top) / (startTrigger - endTrigger);
      progress = Math.max(0, Math.min(1, progress));

      const words = container.querySelectorAll('.reveal-word');
      const totalWords = words.length;

      words.forEach((word, index) => {
        // Individual word threshold window
        const wordStart = index / totalWords;
        const wordEnd = (index + 1.25) / totalWords;

        let wordProgress = (progress - wordStart) / (wordEnd - wordStart);
        wordProgress = Math.max(0, Math.min(1, wordProgress));

        // Smoothly interpolate opacity from muted (0.18) to full (1.0)
        const opacity = 0.18 + (1 - 0.18) * wordProgress;
        word.style.opacity = opacity.toFixed(3);

        // Highlight with solid black when illuminated
        if (wordProgress >= 0.7) {
          word.style.color = '#000000';
          word.style.fontWeight = '600';
        } else {
          word.style.color = '#999999';
          word.style.fontWeight = '600';
        }
      });
    });
  }

  window.addEventListener('scroll', updateReveal, { passive: true });
  window.addEventListener('resize', updateReveal, { passive: true });
  updateReveal(); // Trigger once on load
}

// --- 7. Interactive Testimonial Carousel ---
function initTestimonialCarousel() {
  const testimonials = [
    {
      quote: '"We worked with a few agencies before, but eDiye just got it. The brand finally feels aligned, sharper and way more us."',
      name: 'Frankie Brooks',
      role: 'Co-founder at Peni',
      avatar: 'assets/images/S7Ignt0wJYmWyuZXN39Yfz8s.jpeg'
    },
    {
      quote: '"Working with the team at Diye felt effortless. The final result wasn’t just a website — it was a brand we’re proud to show off."',
      name: 'Ayo Ogun',
      role: 'CEO at Oni-ile',
      avatar: 'assets/images/yHXd1YWnHqY9lUHubvUS7Yh3Exs.png'
    },
    {
      quote: '"The speed and precision was unbelievable. Our new digital identity elevated our presence immediately across all markets."',
      name: 'Elena Rostova',
      role: 'Creative Lead at Everly',
      avatar: 'assets/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png'
    },
    {
      quote: '"eDiye took our complex legacy brand and distilled it into something modern, clean, and convert-ready. Exceptional work."',
      name: 'Marcus Vance',
      role: 'Founder at Korten',
      avatar: 'assets/images/Ot8hE4Ji3qEmQb2AVwGOBjGAQ.jpg'
    }
  ];

  let currentIndex = 0;
  const quoteEl = document.getElementById('testimonial-quote-text');
  const nameEl = document.getElementById('testimonial-author-name');
  const roleEl = document.getElementById('testimonial-author-role');
  const avatarEl = document.getElementById('testimonial-author-avatar');
  const counterEl = document.getElementById('testimonial-counter');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (!quoteEl || !prevBtn || !nextBtn) return;

  function renderSlide(index) {
    const item = testimonials[index];
    quoteEl.style.opacity = '0';
    setTimeout(() => {
      quoteEl.textContent = item.quote;
      nameEl.textContent = item.name;
      roleEl.textContent = item.role;
      avatarEl.src = item.avatar;
      avatarEl.alt = item.name;
      counterEl.textContent = `0${index + 1} / 0${testimonials.length}`;
      quoteEl.style.opacity = '1';
    }, 200);
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    renderSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderSlide(currentIndex);
  });
}

// --- 8. Spring-Based CountUp Component (React Bits Algorithm) ---
function initCountUp() {
  const countElements = document.querySelectorAll('.count-up-val');
  if (!countElements.length) return;

  function animateCount(el) {
    const from = parseFloat(el.getAttribute('data-from') || '0');
    const to = parseFloat(el.getAttribute('data-to') || '100');
    const duration = parseFloat(el.getAttribute('data-duration') || '2'); // in seconds
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const separator = el.getAttribute('data-separator') || '';
    const delay = parseFloat(el.getAttribute('data-delay') || '0');

    // Calculate spring physics parameters matching React Bits CountUp component:
    // damping = 20 + 40 * (1 / duration); stiffness = 100 * (1 / duration);
    setTimeout(() => {
      const startTime = performance.now();
      const durationMs = duration * 1000;

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        // Smooth cubic spring easing: 1 - (1 - t)^3.5 with natural deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3.5);
        const currentVal = Math.round(from + (to - from) * easeOut);

        let formatted = currentVal.toString();
        if (separator) {
          formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        }

        el.textContent = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          let finalFormatted = to.toString();
          if (separator) {
            finalFormatted = finalFormatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
          }
          el.textContent = `${prefix}${finalFormatted}${suffix}`;
        }
      }

      requestAnimationFrame(update);
    }, delay * 1000);
  }

  // IntersectionObserver: trigger when element enters viewport (once: true)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    countElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not available
    countElements.forEach(el => animateCount(el));
  }
}

// --- 9. TrueFocus Component (React Bits Algorithm) ---
function initTrueFocus() {
  const containers = document.querySelectorAll('.true-focus-container');
  if (!containers.length) return;

  containers.forEach(container => {
    const sentence = container.getAttribute('data-sentence') || 'Ask a question';
    const blurAmount = parseFloat(container.getAttribute('data-blur') || '2.5');
    const borderColor = container.getAttribute('data-border-color') || '#0000FF';
    const glowColor = container.getAttribute('data-glow-color') || 'rgba(0, 0, 255, 0.4)';
    const animationDuration = parseFloat(container.getAttribute('data-duration') || '0.45');
    const pauseBetweenAnimations = parseFloat(container.getAttribute('data-pause') || '1.4');
    const manualMode = container.getAttribute('data-manual') === 'true';

    container.style.setProperty('--border-color', borderColor);
    container.style.setProperty('--glow-color', glowColor);

    const words = sentence.split(' ');
    container.innerHTML = '';

    const wordEls = words.map((word, index) => {
      const span = document.createElement('span');
      span.className = `true-focus-word ${index === 0 ? 'active' : ''}`;
      span.textContent = word;
      span.style.transition = `filter ${animationDuration}s ease, opacity ${animationDuration}s ease`;
      span.style.filter = index === 0 ? 'blur(0px)' : `blur(${blurAmount}px)`;
      span.style.opacity = index === 0 ? '1' : '0.4';
      container.appendChild(span);
      return span;
    });

    const frame = document.createElement('div');
    frame.className = 'true-focus-frame';
    frame.style.transition = `transform ${animationDuration}s cubic-bezier(0.25, 1, 0.5, 1), width ${animationDuration}s cubic-bezier(0.25, 1, 0.5, 1), height ${animationDuration}s cubic-bezier(0.25, 1, 0.5, 1), opacity ${animationDuration}s ease`;
    frame.innerHTML = `
      <span class="corner top-left"></span>
      <span class="corner top-right"></span>
      <span class="corner bottom-left"></span>
      <span class="corner bottom-right"></span>
    `;
    container.appendChild(frame);

    let currentIndex = 0;
    let timer = null;

    function updateFrame(index) {
      if (index < 0 || index >= wordEls.length) return;
      const targetEl = wordEls[index];
      const parentRect = container.getBoundingClientRect();
      const activeRect = targetEl.getBoundingClientRect();

      const x = activeRect.left - parentRect.left;
      const y = activeRect.top - parentRect.top;
      const width = activeRect.width;
      const height = activeRect.height;

      frame.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame.style.width = `${width}px`;
      frame.style.height = `${height}px`;
      frame.style.opacity = '1';

      wordEls.forEach((el, i) => {
        if (i === index) {
          el.classList.add('active');
          el.style.filter = 'blur(0px)';
          el.style.opacity = '1';
        } else {
          el.classList.remove('active');
          el.style.filter = `blur(${blurAmount}px)`;
          el.style.opacity = '0.4';
        }
      });
    }

    // Initial position on load
    setTimeout(() => {
      updateFrame(0);
    }, 60);

    window.addEventListener('resize', () => updateFrame(currentIndex));

    if (!manualMode) {
      function startCycle() {
        timer = setInterval(() => {
          currentIndex = (currentIndex + 1) % words.length;
          updateFrame(currentIndex);
        }, (animationDuration + pauseBetweenAnimations) * 1000);
      }
      startCycle();

      container.addEventListener('mouseenter', () => clearInterval(timer));
      container.addEventListener('mouseleave', () => {
        clearInterval(timer);
        startCycle();
      });
    }

    wordEls.forEach((el, i) => {
      el.addEventListener('mouseenter', () => {
        currentIndex = i;
        updateFrame(i);
      });
    });
  });
}

// --- 10. Team Photos Carousel ---
function initTeamCarousel() {
  const prevBtn = document.getElementById('team-carousel-prev');
  const nextBtn = document.getElementById('team-carousel-next');
  const container = document.querySelector('.team-carousel-container');
  if (!prevBtn || !nextBtn || !container) return;

  const scrollAmount = 484; // 460px card + 24px gap

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}


// --- 11. Analytics & Visitor Insights Telemetry ---
function initAnalyticsTelemetry() {
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

  function trackEvent(name, data) {
    try {
      if (typeof window.va === 'function') {
        window.va('event', { name, data });
      }
    } catch (e) {}
  }

  // 1. Track Project & Case Study Clicks
  document.querySelectorAll('a[href*="/works/"], a[href*="works/"]').forEach(link => {
    link.addEventListener('click', () => {
      const slug = (link.getAttribute('href') || '').split('/').pop().replace('.html', '');
      trackEvent('case_study_click', { project: slug });
    });
  });

  // 2. Track Article Clicks
  document.querySelectorAll('a[href*="/articles/"], a[href*="articles/"]').forEach(link => {
    link.addEventListener('click', () => {
      const slug = (link.getAttribute('href') || '').split('/').pop().replace('.html', '');
      trackEvent('article_click', { article: slug });
    });
  });

  // 3. Track Primary CTAs
  document.querySelectorAll('.btn-primary, .btn-dark-pill, .cs-explore-btn, .btn-discover-articles').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim().slice(0, 40);
      trackEvent('cta_click', { label: text });
    });
  });

  // 4. Track Scroll Reading Milestones on Case Studies & Essays
  if (document.body.classList.contains('case-study-page') || 
      document.body.classList.contains('article-detail-page')) {
    const milestones = [25, 50, 75, 100];
    const passed = new Set();
    
    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const percent = Math.round((window.scrollY / maxScroll) * 100);

      milestones.forEach(m => {
        if (percent >= m && !passed.has(m)) {
          passed.add(m);
          trackEvent('scroll_milestone', { depth: `${m}%`, page: window.location.pathname });
        }
      });
    }, { passive: true });
  }
}
