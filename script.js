const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const overlay = document.getElementById("overlay");
const navItems = document.querySelectorAll(".nav-item");

function toggleMenu() {
  navLinks.classList.toggle("open");
  overlay.classList.toggle("open");

  if (navLinks.classList.contains("open")) {
    hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  } else {
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
}

hamburger.addEventListener("click", toggleMenu);

overlay.addEventListener("click", function () {
  navLinks.classList.remove("open");
  overlay.classList.remove("open");
  hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
});

navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
    navLinks.classList.remove("open");
    overlay.classList.remove("open");
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

document.querySelector(".cta").addEventListener("click", function (e) {
  e.preventDefault();
  const saboresSection = document.getElementById("helados");
  saboresSection.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-item");

  function onScroll() {
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((section) => {
      let sectionTop = section.offsetTop;
      let sectionHeight = section.offsetHeight;
      let sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll);
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
