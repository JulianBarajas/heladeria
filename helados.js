const heladosImagesData = [
  "img/banner.jpg",
  "img/BubbleWaffleRockstar.jpg",
  "img/CocoMalteadas.jpg",
  "img/HeladoCocktail.jpg",
];

function loadHeladosImages() {
  const container = document.getElementById("reservacion-images");

  heladosImagesData.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Helado";
    container.appendChild(img);
  });
}

document.addEventListener("DOMContentLoaded", loadHeladosImages);

const experiencesData = [
  {
    img: "img/ShowsHelados.jpg",
    description: "Conoce nuestros shows de helados únicos.",
    whatsappLink:
      "https://api.whatsapp.com/send?phone=573045354056&text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20las%20experiencias%20",
  },
  {
    img: "img/PiñataChocolate.jpg",
    description: "Diviertete con nuestras divertidas piñatas de chocolate.",
    whatsappLink:
      "https://api.whatsapp.com/send?phone=573045354056&text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20las%20experiencia%20",
  },
  {
    img: "img/FotoRecuerdo.jpg",
    description: "Llevate las mejores fotos de recuerdo en nuestra Retroplaya.",
    whatsappLink:
      "https://api.whatsapp.com/send?phone=573045354056&text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20las%20experiencia%20",
  },
];

function loadExperiences() {
  const container = document.getElementById("experiences-grid");

  experiencesData.forEach((exp) => {
    const card = document.createElement("div");
    card.classList.add("experiencia-card");

    const img = document.createElement("img");
    img.src = exp.img;
    img.alt = "Experiencia";
    card.appendChild(img);

    const desc = document.createElement("p");
    desc.textContent = exp.description;
    card.appendChild(desc);

    const link = document.createElement("a");
    link.href = exp.whatsappLink;
    link.target = "_blank";
    link.classList.add("whatsapp-btn");
    link.textContent = "Quiero saber más";
    card.appendChild(link);

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadExperiences);
