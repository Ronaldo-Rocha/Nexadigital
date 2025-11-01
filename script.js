// DOM Elements
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const typingText = document.getElementById("typing-text");
const contactForm = document.getElementById("contact-form");
const testimonialTrack = document.getElementById("testimonial-track");
const testimonialDots = document.getElementById("testimonial-dots");
const prevTestimonial = document.getElementById("prev-testimonial");
const nextTestimonial = document.getElementById("next-testimonial");

// Global Variables
let currentTestimonial = 0;
const totalTestimonials = 3;
let typingIndex = 0;
let typingDirection = 1;
const typingTexts = [
  "especialista em Marketing Digital",
  "estrategista de crescimento",
  "criadora de campanhas virais",
  "analista de performance"
];
let currentTextIndex = 0;

// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  setupTypingAnimation();
  setupScrollAnimations();
  setupTestimonialCarousel();
  setupContactForm();
  setupModals();
  setupCounterAnimations();
  setupSmoothScrolling();
}

// Navigation Functions
function setupNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Navbar scroll effect
  window.addEventListener("scroll", handleNavbarScroll);

  // Active link highlighting
  window.addEventListener("scroll", updateActiveNavLink);
}

function toggleMobileMenu() {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
}

function closeMobileMenu() {
  navMenu.classList.remove("active");
  navToggle.classList.remove("active");
}

function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Typing Animation
function setupTypingAnimation() {
  if (!typingText) return;

  startTypingAnimation();
}

function startTypingAnimation() {
  const currentText = typingTexts[currentTextIndex];

  if (typingDirection === 1) {
    // Typing
    if (typingIndex < currentText.length) {
      typingText.textContent = currentText.substring(0, typingIndex + 1);
      typingIndex++;
      setTimeout(startTypingAnimation, 100);
    } else {
      // Pause before erasing
      setTimeout(() => {
        typingDirection = -1;
        startTypingAnimation();
      }, 2000);
    }
  } else {
    // Erasing
    if (typingIndex > 0) {
      typingText.textContent = currentText.substring(0, typingIndex - 1);
      typingIndex--;
      setTimeout(startTypingAnimation, 50);
    } else {
      // Move to next text
      currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
      typingDirection = 1;
      setTimeout(startTypingAnimation, 500);
    }
  }
}

// Scroll Animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".skill-card, .portfolio-item, .testimonial-card, .contact-item, .about-stats, .specialty-item"
  );

  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}

function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}

// Counter Animations
function setupCounterAnimations() {
  const counters = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver(animateCounters, {
    threshold: 0.5
  });

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

function animateCounters(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    }
  });
}

// Testimonial Carousel
function setupTestimonialCarousel() {
  if (!testimonialTrack) return;

  // Auto-play carousel
  setInterval(nextTestimonialSlide, 5000);

  // Navigation buttons
  if (prevTestimonial) {
    prevTestimonial.addEventListener("click", prevTestimonialSlide);
  }

  if (nextTestimonial) {
    nextTestimonial.addEventListener("click", nextTestimonialSlide);
  }

  // Dot navigation
  if (testimonialDots) {
    const dots = testimonialDots.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToTestimonial(index));
    });
  }
}

function nextTestimonialSlide() {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  updateTestimonialCarousel();
}

function prevTestimonialSlide() {
  currentTestimonial =
    (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
  updateTestimonialCarousel();
}

function goToTestimonial(index) {
  currentTestimonial = index;
  updateTestimonialCarousel();
}

function updateTestimonialCarousel() {
  // Update track position
  if (testimonialTrack) {
    testimonialTrack.style.transform = `translateX(-${
      currentTestimonial * 100
    }%)`;
  }

  // Update active testimonial card
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  testimonialCards.forEach((card, index) => {
    card.classList.toggle("active", index === currentTestimonial);
  });

  // Update dots
  if (testimonialDots) {
    const dots = testimonialDots.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentTestimonial);
    });
  }
}

// Contact Form
function setupContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", handleFormSubmit);

  // Add input validation
  const inputs = contactForm.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.addEventListener("blur", validateInput);
    input.addEventListener("input", clearValidationError);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Validate form
  if (!validateForm(data)) {
    return;
  }

  // Show loading state
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<span class="loading"></span> Enviando...';
  submitButton.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    showSuccessMessage();
    contactForm.reset();
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  }, 2000);
}

function validateForm(data) {
  let isValid = true;

  // Required fields
  const requiredFields = ["name", "email", "subject", "message"];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      showFieldError(field, "Este campo é obrigatório");
      isValid = false;
    }
  });

  // Email validation
  if (data.email && !isValidEmail(data.email)) {
    showFieldError("email", "Por favor, insira um e-mail válido");
    isValid = false;
  }

  return isValid;
}

function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();

  clearValidationError(e);

  if (input.hasAttribute("required") && !value) {
    showFieldError(input.name, "Este campo é obrigatório");
    return;
  }

  if (input.type === "email" && value && !isValidEmail(value)) {
    showFieldError(input.name, "Por favor, insira um e-mail válido");
    return;
  }
}

function clearValidationError(e) {
  const input = e.target;
  const errorElement = input.parentNode.querySelector(".error-message");

  if (errorElement) {
    errorElement.remove();
  }

  input.classList.remove("error");
}

function showFieldError(fieldName, message) {
  const field = contactForm.querySelector(`[name="${fieldName}"]`);
  const fieldGroup = field.parentNode;

  // Remove existing error
  const existingError = fieldGroup.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Add error class
  field.classList.add("error");

  // Create error message
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  errorElement.style.color = "var(--error-color)";
  errorElement.style.fontSize = "0.875rem";
  errorElement.style.marginTop = "0.25rem";

  fieldGroup.appendChild(errorElement);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showSuccessMessage() {
  // Remove existing success message
  const existingMessage = contactForm.querySelector(".success-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create success message
  const successMessage = document.createElement("div");
  successMessage.className = "success-message show";
  successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Mensagem enviada com sucesso! Entrarei em contato em breve.
    `;

  contactForm.appendChild(successMessage);

  // Remove success message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}

// Modal Functions
function setupModals() {
  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModal = document.querySelector('.modal[style*="block"]');
      if (openModal) {
        openModal.style.display = "none";
      }
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Smooth Scrolling
function setupSmoothScrolling() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Performance Optimizations
const debouncedScroll = debounce(() => {
  updateActiveNavLink();
}, 10);

const throttledScroll = throttle(() => {
  handleNavbarScroll();
}, 16);

// Replace scroll event listeners with optimized versions
window.removeEventListener("scroll", handleNavbarScroll);
window.removeEventListener("scroll", updateActiveNavLink);
window.addEventListener("scroll", throttledScroll);
window.addEventListener("scroll", debouncedScroll);

// Lazy Loading for Images (if any are added later)
function setupLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Accessibility Enhancements
function setupAccessibility() {
  // Add keyboard navigation for carousel
  document.addEventListener("keydown", (e) => {
    if (e.target.closest(".testimonials-carousel")) {
      if (e.key === "ArrowLeft") {
        prevTestimonialSlide();
      } else if (e.key === "ArrowRight") {
        nextTestimonialSlide();
      }
    }
  });

  // Add focus management for modals
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        trapFocus(e, modal);
      }
    });
  });
}

function trapFocus(e, container) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
}

// Initialize accessibility features
setupAccessibility();

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error);
  // You could send this to an error tracking service
});

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment if you want to add a service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  });
}

// Analytics (placeholder for Google Analytics or similar)
function trackEvent(eventName, eventData = {}) {
  // Placeholder for analytics tracking
  console.log("Event tracked:", eventName, eventData);

  // Example: gtag('event', eventName, eventData);
}

// Track important interactions
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-primary")) {
    trackEvent("cta_click", { button: e.target.textContent.trim() });
  }

  if (e.target.matches(".social-link")) {
    trackEvent("social_click", { platform: e.target.className });
  }
});

// Page Load Performance
window.addEventListener("load", () => {
  // Hide loading spinner if present
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }

  // Track page load time
  const loadTime = performance.now();
  trackEvent("page_load", { load_time: Math.round(loadTime) });
});

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    openModal,
    closeModal,
    validateForm,
    isValidEmail
  };
}
