// =========================================================
// LÓGICA DE CARGA (LOADER) Y VISIBILIDAD DE CONTENIDO
// =========================================================

const loader = document.getElementById('loader-container');
const mainContent = document.getElementById('main-content');
const DURATION_MS = 3000; // Tiempo total que estará visible el loader (3.5 segundos)

// La función que oculta el loader y muestra el contenido.
const hideAndShowContent = () => {
    // 1. Oculta el Loader añadiendo la clase 'hidden'
    if (loader) {
        loader.classList.add('hidden');
    }

    // 2. Muestra el Contenido Principal añadiendo la clase 'loaded'
    if (mainContent) {
        mainContent.classList.add('loaded');
    }

    // 3. Elimina el Loader completamente del DOM después de su transición CSS (0.7s)
    if (loader) {
        // Usamos un retraso basado en la duración de la transición CSS (0.7s)
        setTimeout(() => {
             loader.style.display = 'none';
        }, 700); 
    }
};

// Se ejecuta esta función cuando el DOM (estructura HTML) está listo.
document.addEventListener('DOMContentLoaded', () => {
    // Retrasamos la ejecución de la función para mostrar la animación
    // de carga durante la DURATION_MS establecida.
    setTimeout(hideAndShowContent, DURATION_MS);
});


// =========================================================
// LÓGICA DEL BOTÓN "IR ARRIBA" (Scroll To Top)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const btnScrollToTop = document.getElementById('btnScrollToTop');
    const scrollThreshold = 300; 

    // Función que maneja la visibilidad al hacer scroll
    const toggleVisibility = () => {
        if (window.scrollY > scrollThreshold) {
            btnScrollToTop.classList.add('visible'); 
        } else {
            btnScrollToTop.classList.remove('visible'); 
        }
    };

    // Función que realiza el scroll suave
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    // Asignar eventos
    window.addEventListener('scroll', toggleVisibility);
    btnScrollToTop.addEventListener('click', scrollToTop);
    
    // Ejecutar una vez al inicio
    toggleVisibility();
});
// ===================================
// Lógica para Re-inicializar el Carrusel de Bootstrap en el Modal
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener la referencia al elemento Modal
    const proyectoModal = document.getElementById('proyectoModal');
    
    // 2. Verificar que el modal exista y añadir un 'listener' al evento 'shown.bs.modal'
    if (proyectoModal) {
        // Este evento se dispara DESPUÉS de que el modal ha terminado de abrirse.
        proyectoModal.addEventListener('shown.bs.modal', () => {
            
            // 3. Obtener la referencia al carrusel dentro del modal
            const carrusel = document.getElementById('carruselCapturas');
            
            if (carrusel) {
                // 4. Inicializar (o re-inicializar) el carrusel.
                // Esto fuerza a Bootstrap a "despertar" sus controles.
                const bsCarousel = new bootstrap.Carousel(carrusel, {
                    // Opciones de configuración (opcional):
                    interval: false, // Desactivar el avance automático para que sea manual
                    wrap: true // Permite ir del último slide al primero
                });
                
                // 5. Opcional: Asegurarse de que siempre inicie en el primer slide
                bsCarousel.to(0);
            }
        });
    }
});

// ===================================
// Lógica del Botón "Ir Arriba" (Debe mantenerse igual)
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el elemento del botón
    const btnScrollToTop = document.getElementById('btnScrollToTop');
    
    // ... el resto de tu código para el botón flotante ...
    const scrollThreshold = 300; 

    const toggleVisibility = () => {
        if (window.scrollY > scrollThreshold) {
            btnScrollToTop.classList.add('visible'); 
        } else {
            btnScrollToTop.classList.remove('visible'); 
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    window.addEventListener('scroll', toggleVisibility);
    btnScrollToTop.addEventListener('click', scrollToTop);
    
    toggleVisibility();
});