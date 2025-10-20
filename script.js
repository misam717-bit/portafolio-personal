document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // LÓGICA DE CARGA (LOADER) Y VISIBILIDAD DE CONTENIDO
  // =========================================================
  const loader = document.getElementById("loader-container");
  const mainContent = document.getElementById("main-content");
  const DURATION_MS = 2800; // Duración del loader en milisegundos

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

  // Ejecutar el cargador
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
  // LÓGICA DE VIDEO Y CARGA DINÁMICA DEL MODAL (Corregida)
  // =========================================================
  const videoModal = document.getElementById("videoProyectoModal");
  const videoElement = document.getElementById("miVideo");
  // Asegúrate de que el enlace de descarga tenga este ID en tu HTML
  const downloadLink = document.getElementById("enlaceDescargaVideo");

  if (videoModal && videoElement && downloadLink) {
    // 1. EVENTO PARA CARGAR EL VIDEO Y DESCARGA AL ABRIR EL MODAL
    videoModal.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;

      // ATRIBUTOS PARA EL VIDEO
      const videoSrc = button.getAttribute("data-video-src");
      const posterSrc = button.getAttribute("data-video-poster");
      const sourceElement = videoElement.querySelector("source");

      // ATRIBUTOS PARA LA DESCARGA
      const descargaSrc = button.getAttribute("data-descarga-src");
      const descargaTexto = button.getAttribute("data-descarga-texto");

      // CARGAR VIDEO (Esto resuelve que siempre se muestre el mismo video)
      if (videoSrc) {
        // **PASO CLAVE:** Limpiar la fuente para forzar al navegador a recargar el nuevo SRC
        sourceElement.src = "";
        videoElement.poster = posterSrc;
        sourceElement.src = videoSrc;
        sourceElement.type = "video/mp4";

        videoElement.load();

        // 💡 SOLUCIÓN 1: INICIAR LA REPRODUCCIÓN AUTOMÁTICAMENTE
        // Utilizamos catch para evitar un error si el navegador bloquea el autoplay (política de Chrome/Safari)
        videoElement.play().catch((error) => {
          console.log(
            "Autoplay bloqueado (requiere interacción del usuario o video sin audio):",
            error
          );
        });
      }

      // ACTUALIZAR BOTÓN DESCARGA
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

    // 2. EVENTO PARA DETENER EL VIDEO AL CERRAR EL MODAL (Resuelve el video que sigue sonando)
    videoModal.addEventListener("hide.bs.modal", function () {
      videoElement.pause();
      videoElement.currentTime = 0;

      // **PASO CLAVE:** Limpiar la fuente para liberar recursos
      const sourceElement = videoElement.querySelector("source");
      sourceElement.src = "";
      videoElement.load();
    });
  }

  // ===================================
  // Lógica para Re-inicializar el Carrusel de Bootstrap
  // ===================================
  const carruselModal = document.getElementById("modalCatalogoFerreteria"); // Asumo que este es tu modal del carrusel

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
}); // FIN DEL ÚNICO document.addEventListener('DOMContentLoaded', ...)
