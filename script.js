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

fetch("/.netlify/functions/create-preference", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Helado de Chocolate",
    quantity: 1,
    unit_price: 150,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Preferencia creada:", data);
    // Si data contiene "init_point", puedes redirigir al usuario:
    // window.location.href = data.init_point;
  })
  .catch((error) => console.error("Error:", error));

document.addEventListener("DOMContentLoaded", () => {
  const btnComprar = document.getElementById("btn-comprar");

  btnComprar.addEventListener("click", async (event) => {
    // Evita que el enlace recargue la página
    event.preventDefault();

    try {
      // Llamamos a la función serverless en Netlify
      const response = await fetch("/.netlify/functions/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Nombre del Producto",
          quantity: 1,
          unit_price: 99.99, // Ajusta el precio según tu producto
        }),
      });

      const data = await response.json();

      // Verifica si tenemos un enlace de pago (init_point o sandbox_init_point)
      if (data.init_point) {
        // Redirige al usuario al checkout de Mercado Pago
        window.location.href = data.init_point;
      } else if (data.sandbox_init_point) {
        // Si estás en modo sandbox, a veces el campo se llama "sandbox_init_point"
        window.location.href = data.sandbox_init_point;
      } else {
        console.error("No se recibió init_point en la respuesta:", data);
        alert("Ocurrió un problema al generar el enlace de pago.");
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      alert("Error al procesar la compra.");
    }
  });
});
