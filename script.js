document.addEventListener("DOMContentLoaded", function () {
  // DARK MODE
  const body = document.body;
  const themeToggle = document.querySelector(".head-5");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  function setTheme(isDark) {
    body.classList.toggle("dark", isDark);
    if (themeIcon) {
      themeIcon.classList.toggle("fa-moon", isDark);
      themeIcon.classList.toggle("fa-sun", !isDark);
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  function loadTheme() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme === "dark");
    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }

  loadTheme();

  themeToggle?.addEventListener("click", () => {
    setTheme(!body.classList.contains("dark"));
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches);
      }
    });

  // NAVBAR ACTIVE LINK
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-7").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("nav-8");
    }
  });

  // NAVBAR BLUR ON SCROLL
  const nav = document.querySelector(".nav-1");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 50);
  });

  // NAVBAR RESPONSIVE
  const toggle = document.querySelector(".nav-5");
  const menu = document.querySelector(".nav-6");

  toggle?.addEventListener("click", () => {
    menu?.classList.toggle("show");
    toggle.querySelector("i")?.classList.toggle("fa-bars");
    toggle.querySelector("i")?.classList.toggle("fa-xmark");
  });

  // Carousel
  const slides = document.querySelectorAll(".cl-3");
  let index = 0;
  const SLIDE_DURATION = 12000;

  function showSlide(i) {
    slides.forEach((slide) => {
      slide.classList.remove("active");

      // reset zoom animation
      const img = slide.querySelector("img");
      if (img) {
        img.style.animation = "none";
        img.offsetHeight;
        img.style.animation = "";
      }

      // reset focus tombol WA
      slide.querySelector(".cl-5")?.blur();
    });

    slides[i]?.classList.add("active");
  }

  if (slides.length > 0) {
    showSlide(0);
    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, SLIDE_DURATION);
  }
});
