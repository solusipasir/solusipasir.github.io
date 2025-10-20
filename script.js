// Dark Mode
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const themeToggle = document.querySelector(".head-5");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  function setTheme(isDark) {
    if (isDark) {
      body.classList.add("dark");
      if (themeIcon) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }
    } else {
      body.classList.remove("dark");
      if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  function loadTheme() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme === "dark");
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark);
    }
  }

  loadTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(!body.classList.contains("dark"));
    });
  }

  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (!localStorage.getItem("theme")) {
          setTheme(event.matches);
        }
      });
  }

  slideTimeout = setTimeout(autoShowSlides, 10000);
  showSlides(0);
});
// End Dark Mode

// Navbar Active Link
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-7");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("nav-8");
    }
  });
});

// === Navbar Blur On Scroll ===
window.addEventListener("scroll", function () {
  const nav = document.querySelector(".nav-1");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// === Navbar Responsive Toggle ===
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".nav-5");
  const menu = document.querySelector(".nav-6");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
      toggle.querySelector("i").classList.toggle("fa-bars");
      toggle.querySelector("i").classList.toggle("fa-xmark");
    });
  }
});

// Carousel Img
let slideIndex = 0;
let slideTimeout;

function currentSlide(n) {
  clearTimeout(slideTimeout);
  showSlides(n - 1);
  slideTimeout = setTimeout(autoShowSlides, 10000);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("cl-3");
  let dots = document.getElementsByClassName("cl-5");

  if (slides.length === 0) return;

  if (n >= slides.length) {
    slideIndex = 0;
  } else if (n < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex = n;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    if (dots[i]) {
      dots[i].className = dots[i].className.replace(" cl-6", "");
    }
  }

  slides[slideIndex].style.display = "block";
  if (dots[slideIndex]) {
    dots[slideIndex].className += " cl-6";
  }
}

function autoShowSlides() {
  showSlides(slideIndex + 1);
  slideTimeout = setTimeout(autoShowSlides, 10000);
}
// End Carousel Img
