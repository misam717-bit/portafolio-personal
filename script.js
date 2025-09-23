document.addEventListener('DOMContentLoaded', () => {
  const enlaces = document.querySelectorAll('nav a[href^="#"]');
  
  for (let enlace of enlaces) {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      destino.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const botonSubir = document.getElementById('boton-subir');

  // Muestra u oculta el botón al desplazarse
  window.addEventListener('scroll', () => {
    // Si la posición de desplazamiento es mayor a 200px, muestra el botón
    if (window.scrollY > 200) {
      botonSubir.style.opacity = '1';
      botonSubir.style.visibility = 'visible';
    } else {
      botonSubir.style.opacity = '0';
      botonSubir.style.visibility = 'hidden';
    }
  });

  // Desplaza la página hacia arriba al hacer clic
  botonSubir.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Desplazamiento suave
    });
  });
});
