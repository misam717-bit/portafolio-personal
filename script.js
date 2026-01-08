document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // LÓGICA DE CARGA (LOADER) Y VISIBILIDAD DE CONTENIDO
  // =========================================================
  const loader = document.getElementById("loader-container");
  const mainContent = document.getElementById("main-content");
  const DURATION_MS = 2800;

  const hideAndShowContent = () => {
    if (loader) {
      loader.classList.add("hidden");
    }

    if (mainContent) {
      mainContent.classList.add("loaded");
    }

    if (loader) {
      setTimeout(() => {
        loader.style.display = "none";
      }, 700);
    }
  };

  setTimeout(hideAndShowContent, DURATION_MS);

  // =========================================================
  // LÓGICA DEL BOTÓN "IR ARRIBA" (Scroll To Top)
  // =========================================================
  const btnScrollToTop = document.getElementById("btnScrollToTop");
  const scrollThreshold = 300;

  if (btnScrollToTop) {
    const toggleVisibility = () => {
      if (window.scrollY > scrollThreshold) {
        btnScrollToTop.classList.add("visible");
      } else {
        btnScrollToTop.classList.remove("visible");
      }
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("scroll", toggleVisibility);
    btnScrollToTop.addEventListener("click", scrollToTop);
    toggleVisibility();
  }

  // =========================================================
  // LÓGICA DE VIDEO Y CARGA DINÁMICA DEL MODAL
  // =========================================================
  const videoModal = document.getElementById("videoProyectoModal");
  const videoElement = document.getElementById("miVideo");
  const downloadLink = document.getElementById("enlaceDescargaVideo");

  if (videoModal && videoElement && downloadLink) {
    videoModal.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;
      const videoSrc = button.getAttribute("data-video-src");
      const posterSrc = button.getAttribute("data-video-poster");
      const sourceElement = videoElement.querySelector("source");
      const descargaSrc = button.getAttribute("data-descarga-src");
      const descargaTexto = button.getAttribute("data-descarga-texto");

      if (videoSrc) {
        sourceElement.src = "";
        videoElement.poster = posterSrc;
        sourceElement.src = videoSrc;
        sourceElement.type = "video/mp4";
        videoElement.load();
        videoElement.play().catch((error) => {
          console.log("Autoplay bloqueado:", error);
        });
      }

      if (descargaSrc) {
        downloadLink.href = descargaSrc;
        downloadLink.setAttribute(
          "download",
          descargaSrc.substring(descargaSrc.lastIndexOf("/") + 1)
        );
      }
      if (descargaTexto) {
        downloadLink.textContent = descargaTexto;
      }
    });

    videoModal.addEventListener("hide.bs.modal", function () {
      videoElement.pause();
      videoElement.currentTime = 0;
      const sourceElement = videoElement.querySelector("source");
      sourceElement.src = "";
      videoElement.load();
    });
  }

  // ===================================
  // Lógica para Re-inicializar el Carrusel
  // ===================================
  const carruselModal = document.getElementById("modalCatalogoFerreteria");

  if (carruselModal) {
    carruselModal.addEventListener("shown.bs.modal", () => {
      const carrusel = document.getElementById("carruselCapturas");

      if (carrusel) {
        const bsCarousel = new bootstrap.Carousel(carrusel, {
          interval: false,
          wrap: true,
        });
        bsCarousel.to(0);
      }
    });
  }

  // =========================================================
  // LEER MÁS / LEER MENOS - SOLUCIÓN COMPLETA
  // =========================================================
  const btnLeerMas = document.getElementById("btn-leer-mas-ferreteria");
  const contenedorDesc = document.getElementById("desc-ferreteria");

  if (btnLeerMas && contenedorDesc) {
    let expandido = false;

    btnLeerMas.addEventListener("click", () => {
      expandido = !expandido;

      if (expandido) {
        // EXPANDIR
        contenedorDesc.style.maxHeight = "3000px";
        contenedorDesc.style.overflow = "visible";
        contenedorDesc.classList.add("expandido"); // ← AGREGAR CLASE
        btnLeerMas.textContent = "Leer menos";
      } else {
        // CONTRAER
        contenedorDesc.style.maxHeight = "140px";
        contenedorDesc.style.overflow = "hidden";
        contenedorDesc.classList.remove("expandido"); // ← QUITAR CLASE
        btnLeerMas.textContent = "Leer más...";

        contenedorDesc.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    });
  }
});
