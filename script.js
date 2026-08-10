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
  const currentPath = window.location.pathname;

  document.querySelectorAll(".nav-7").forEach((link) => {
    const href = link.getAttribute("href");

    link.classList.remove("nav-8");

    if (
      (currentPath === "/" || currentPath.endsWith("/index.html")) &&
      href === "/index.html"
    ) {
      link.classList.add("nav-8");
    }

    if (currentPath.endsWith("/about.html") && href === "/about.html") {
      link.classList.add("nav-8");
    }

    if (currentPath.endsWith("/produk.html") && href === "/produk.html") {
      link.classList.add("nav-8");
    }

    if (currentPath.endsWith("/harga.html") && href === "/harga.html") {
      link.classList.add("nav-8");
    }

    if (currentPath.endsWith("/blog.html") && href === "/blog.html") {
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

  // ACCORDION
  document.querySelectorAll(".ac-5").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.closest(".ac-4");
      const icon = header.querySelector(".ac-7");

      const isActive = item.classList.toggle("active");

      if (icon) {
        icon.classList.toggle("fa-chevron-up", isActive);
        icon.classList.toggle("fa-chevron-down", !isActive);
      }
    });
  });

  // TRUCK SWITCHER
  const image = document.getElementById("carImage");
  const title = document.getElementById("truckName");
  const buttons = document.querySelectorAll(".truck-btn");

  if (image && title && buttons.length > 0) {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // Jika tombol yang sama diklik, hentikan
        if (button.classList.contains("active")) return;

        const newImage = button.dataset.image?.trim();
        const newName = button.dataset.name?.trim();

        if (!newImage) return;

        // Nonaktifkan semua tombol
        buttons.forEach((btn) => btn.classList.remove("active"));

        // Aktifkan tombol sekarang
        button.classList.add("active");

        // Efek fade
        image.classList.add("fade");

        // Preload gambar
        const preload = new Image();

        preload.onload = () => {
          image.src = newImage;

          if (newName) {
            title.textContent = newName;
          }

          image.onload = () => {
            image.classList.remove("fade");
          };
        };

        preload.onerror = () => {
          console.error("Gagal memuat gambar:", newImage);

          image.classList.remove("fade");
        };

        preload.src = newImage;
      });
    });
  }

  // POPUP PROMO
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  // Pastikan elemen tersedia
  if (!popup || !closePopup) {
    return;
  }

  // Tampilkan popup setelah 5 detik
  if (!localStorage.getItem("popupShown")) {
    setTimeout(function () {
      popup.classList.remove("hide");
      localStorage.setItem("popupShown", "true");
    }, 5000);
  }

  // TUTUP POPUP HANYA DENGAN TOMBOL CLOSE
  closePopup.addEventListener("click", function () {
    popup.classList.add("hide");
  });
});
