// =========================
// Owl Carousel - Services
// =========================
$(document).ready(function () {
  $('.services-carousel').owlCarousel({
    loop: true,
    margin: 24,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 }
    }
  });
});

// =========================
// Owl Carousel - Testimonials
// =========================
$(document).ready(function () {
  $('#testimonials').owlCarousel({
    loop: true,
    margin: 24,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  });
});

// =========================
// Before / After Slider Script
// =========================
const sliders = document.querySelectorAll('[data-slider]');
const afterImages = document.querySelectorAll('[data-after]');

let currentSlider = null;

// Initialize each slider
sliders.forEach((slider, index) => {
  const afterImage = document.querySelector(`[data-after="${index + 1}"]`);
  const comparisonBox = slider.closest('.dental-comparison-box');

  slider.addEventListener('mousedown', () => {
    currentSlider = { slider, afterImage, comparisonBox };
  });

  slider.addEventListener('touchstart', (e) => {
    e.preventDefault();
    currentSlider = { slider, afterImage, comparisonBox };
  });
});

document.addEventListener('mouseup', () => currentSlider = null);
document.addEventListener('touchend', () => currentSlider = null);

document.addEventListener('mousemove', (e) => {
  if (!currentSlider) return;
  updateSliderPosition(e.pageX);
});

document.addEventListener('touchmove', (e) => {
  if (!currentSlider) return;
  e.preventDefault();
  updateSliderPosition(e.touches[0].pageX);
});

function updateSliderPosition(xPosition) {
  if (!currentSlider) return;

  const { slider, afterImage, comparisonBox } = currentSlider;
  const rect = comparisonBox.getBoundingClientRect();
  let sliderPosition = ((xPosition - rect.left) / rect.width) * 100;

  sliderPosition = Math.max(0, Math.min(100, sliderPosition));

  slider.style.left = sliderPosition + '%';
  afterImage.style.clipPath = `inset(0 ${100 - sliderPosition}% 0 0)`;
}

// =========================
// Bootstrap Form Validation
// =========================
(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})();

// ========================
// Active and UnActive
// =========================

document.addEventListener("DOMContentLoaded", function () {
  // Get current file name from URL (e.g., 'about-us.html' or '' for root)
  let currentPage = window.location.pathname.split("/").pop();

  // Treat empty as home
  if (currentPage === "") {
    currentPage = "index.html";
  }

  const navLinks = document.querySelectorAll(".navbar .nav-link");

  navLinks.forEach(link => {
    // Get only the file part of href, so '/about-us.html' -> 'about-us.html'
    let href = link.getAttribute("href");
    let linkPage = href.split("/").pop();

    if (linkPage === "") {
      linkPage = "index.html";
    }

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// ========================
// Whats app and Phone
// ========================
// Scroll to Top button logic
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollTopBtn");

  // show / hide on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 250) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  // smooth scroll to top
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // For mobile: show QR on tap (since hover doesn't exist)
  const whatsappBtn = document.getElementById("whatsappBtn");
  const whatsappQr = document.getElementById("whatsappQr");

  if (whatsappBtn && whatsappQr) {
    whatsappBtn.addEventListener("click", function (e) {
      // on small screens, toggle QR instead of going directly
      if (window.innerWidth < 768) {
        e.preventDefault(); // prevent opening wa.me immediately
        const isVisible = whatsappQr.style.display === "block";
        whatsappQr.style.display = isVisible ? "none" : "block";
      }
      // on desktop it will still go to wa.me (hover shows QR)
    });
  }
});


// =========================
// Number Counting
// =========================


// COUNT-UP NUMBER ANIMATION
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".count-number");
  let countStarted = false;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countStarted) {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const current = +counter.innerText.replace("+", "");
          const increment = target / 60; // speed control

          if (current < target) {
            counter.innerText = Math.ceil(current + increment) + "+";
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target + "+";
          }
        };

        updateCount();
      });

      countStarted = true;
    }
  }, { threshold: 0.4 });

  observer.observe(document.querySelector(".stats"));
});


// =========================
// AOS
// =========================
AOS.init();