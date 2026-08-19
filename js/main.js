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
    const calculatedPrice = Math.round(basePrice + ((maxPrice - basePrice) * (percent / 100)) / 100) * 100;
    const formatted = calculatedPrice.toLocaleString();
    
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
          const otherIcon = other.querySelector('.accordion-toggle-icon, .toggle-symbol');
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        if (toggleIcon) toggleIcon.textContent = '+';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 30 + 'px';
        if (toggleIcon) toggleIcon.textContent = '–';
      }
    });
  });

  // Open first item by default
  if (accordionItems.length > 0) {
    const firstItem = accordionItems[0];
    firstItem.classList.add('active');
    const firstContent = firstItem.querySelector('.accordion-content, .faq-accordion-body');
    if (firstContent) {
      firstContent.style.maxHeight = firstContent.scrollHeight + 30 + 'px';
    }
    const firstIcon = firstItem.querySelector('.accordion-toggle-icon, .toggle-symbol');
    if (firstIcon) firstIcon.textContent = '–';
  }
}

// --- 3. Sticky Navbar & Header Scroll State ---
function initHeaderScroll() {
  const navbar = document.querySelector('.navbar-wrapper');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.style.paddingTop = '12px';
      navbar.style.paddingBottom = '12px';
    } else {
      navbar.style.paddingTop = '20px';
      navbar.style.paddingBottom = '20px';
    }
  });
}

// --- 4. Mobile Navigation Toggle ---
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-pills-group');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.right = '20px';
      navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
      navLinks.style.padding = '16px';
      navLinks.style.borderRadius = '16px';
      navLinks.style.gap = '8px';
    }
  });
}

// --- 5. Form Submissions ---
function initFormSubmissions() {
  const contactForm = document.getElementById('studio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      if (submitBtn) {
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.backgroundColor = '#0000ff';
        submitBtn.style.color = '#ffffff';
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = 'Send message';
          submitBtn.style.backgroundColor = '#ffffff';
          submitBtn.style.color = '#000000';
        }, 3000);
      }
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('.newsletter-btn');
      if (btn) {
        btn.innerHTML = 'Subscribed ✓';
        setTimeout(() => {
          newsletterForm.reset();
          btn.innerHTML = 'Subscribe ↳';
        }, 3000);
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
