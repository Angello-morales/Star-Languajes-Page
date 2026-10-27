
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

// Mostrar el año actual en el pie de página.
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Cerrar el menú móvil.
function closeMenu() {
  if (!menuToggle || !mainNav) return;

  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  menuToggle.textContent = "☰";
}

// Mostrar una sección sin recargar la página.
function showPage(pageId) {
  const selectedPage = document.getElementById(pageId);

  // Comprobar que la sección exista.
  if (!selectedPage || !selectedPage.classList.contains("page")) {
    return;
  }

  // Ocultar todas las secciones.
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  // Mostrar la sección seleccionada.
  selectedPage.classList.add("active");

  // Actualizar el menú.
  navLinks.forEach((link) => {
    const isActive = link.dataset.page === pageId;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // Cerrar el menú móvil.
  closeMenu();

  // Volver al inicio de la página.
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Cambiar de sección desde las opciones del menú.
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// El logo permite volver a Inicio.
document.querySelectorAll(".logo, .footer-logo").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("inicio");
  });
});

// Navegación entre las secciones.
function navigateTo(pageId) {
  const target = document.getElementById(pageId);

  if (!target || !target.classList.contains("page")) {
    return;
  }

  showPage(pageId);

  // Actualizar la dirección sin recargar.
  if (window.location.hash !== "#" + pageId) {
    history.pushState({ pageId }, "", "#" + pageId);
  }
}

// Botones que llevan a otras secciones.
document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    navigateTo(button.dataset.go);
  });
});

// Abrir y cerrar el menú en celulares.
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    mainNav.classList.toggle("open", !isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Abrir menú" : "Cerrar menú"
    );

    menuToggle.textContent = isOpen ? "☰" : "✕";
  });
}

// Botón de contacto.
const contactBtn = document.getElementById("contactBtn");
const contactMessage = document.getElementById("contactMessage");

if (contactBtn && contactMessage) {
  contactBtn.addEventListener("click", () => {
    // Escribe aquí el correo oficial cuando lo tengas.
    const email = "";

    if (email.trim() !== "") {
      window.location.href =
        "mailto:" + email +
        "?subject=" +
        encodeURIComponent("Contacto - Star Games Industry");
    } else {
      contactMessage.textContent =
        "¡Gracias por tu interés en Star Games Industry! " +
        "Pronto podrás contactarnos a través de nuestros canales oficiales.";
    }
  });
}

// Abrir la sección indicada en la dirección.
function loadPageFromHash() {
  const pageId = window.location.hash.slice(1) || "inicio";
  const selectedPage = document.getElementById(pageId);

  if (selectedPage && selectedPage.classList.contains("page")) {
    showPage(pageId);
  } else {
    showPage("inicio");
    history.replaceState(null, "", "#inicio");
  }
}

// Permitir usar los botones Atrás y Adelante del navegador.
window.addEventListener("popstate", loadPageFromHash);

// Ajustar el menú cuando cambia el tamaño de la ventana.
window.addEventListener("resize", () => {
  if (window.innerWidth > 720) {
    closeMenu();
  }
});

// Inicializar la página.
loadPageFromHash();
