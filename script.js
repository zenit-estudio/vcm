document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const slider = document.querySelector('.slider-container');
  const sections = Array.from(document.querySelectorAll('.section'));

  let currentIndex = 2; // Arranca en 2 (Zenit / Centro)

  function goToSection(index) {
    if (index < 0) index = 0;
    if (index >= sections.length) index = sections.length - 1;

    currentIndex = index;
    const offset = currentIndex * -20; // 20% por cada una de las 5 secciones
    slider.style.transform = `translateX(${offset}%)`;

    // Actualizar clase active en la botonera
    navItems.forEach(nav => nav.classList.remove('active'));
    if (navItems[currentIndex]) {
      navItems[currentIndex].classList.add('active');
    }
  }

  // Posicionar inicialmente en Zenit (Centro)
  goToSection(2);

  // Navegación por clic en la barra superior
  navItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      goToSection(index);
    });
  });

  // Soporte Táctil (Swipe / Deslizar con el dedo) y Mouse
  let startX = 0;
  let isDragging = false;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slider.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex > 0) {
        goToSection(currentIndex - 1); // Desliza a la derecha (anterior)
      } else if (diff < 0 && currentIndex < sections.length - 1) {
        goToSection(currentIndex + 1); // Desliza a la izquierda (siguiente)
      }
    }
  });

  slider.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 70) {
      if (diff > 0 && currentIndex > 0) {
        goToSection(currentIndex - 1);
      } else if (diff < 0 && currentIndex < sections.length - 1) {
        goToSection(currentIndex + 1);
      }
    }
  });
});
// --- ANIMACIÓN DE FRASES EN EL HOME ---
const frases = [
  "Creatividad, entusiasmo, perseverancia y actitud positiva.",
  "Emprender es convertir una idea en una oportunidad.",
  "Experiencias, aprendizaje, compromiso y dedicación.",
  "Escuchar con empatía es la ventaja competitiva más difícil de copiar.",
  "La flexibilidad para adaptarse convierte los cambios en oportunidades.",
  "Los detalles no son solo detalles; ellos hacen al diseño.",
  "Los desafíos son nuevas posibilidades para el aprendizaje y el crecimiento.",
];

let indiceActual = 0;
const elementoFrase = document.getElementById("frase-animada");

function cambiarFrase() {
  if (!elementoFrase) return; // Si no está en esta vista, no hace nada y evita errores
  
  elementoFrase.classList.remove("visible");

  setTimeout(() => {
    elementoFrase.textContent = frases[indiceActual];
    elementoFrase.classList.add("visible");
    indiceActual = (indiceActual + 1) % frases.length;
  }, 2000);
}

if (elementoFrase) {
  cambiarFrase();
  setInterval(cambiarFrase, 5000); 
}

document.addEventListener("DOMContentLoaded", function() {
  const encuestaForm = document.getElementById("encuestaForm");

  encuestaForm.addEventListener("submit", function(e) {
    // Evitamos que recargue la página o vaya al Home
    e.preventDefault();

    const checkboxesSeleccionados = encuestaForm.querySelectorAll("input[type='checkbox']:checked");
    
    if (checkboxesSeleccionados.length === 0) {
      alert("Por favor selecciona al menos una opción para enviar la encuesta.");
      return;
    }

    // 1. ANIMACIÓN: Iluminamos los tildes seleccionados con brillo
    checkboxesSeleccionados.forEach(function(cb) {
      const checkmark = cb.nextElementSibling;
      if (checkmark) {
        checkmark.classList.add("iluminar-tilde");
      }
    });

    // 2. Desvanecimiento suave (fade out) de toda la encuesta
    setTimeout(function() {
      encuestaForm.style.transition = "opacity 0.5s ease";
      encuestaForm.style.opacity = "0";

      // 3. Reseteamos los valores y restauramos la opacidad (fade in) con la encuesta limpia
      setTimeout(function() {
        encuestaForm.reset(); // Desmarca todo y vuelve al principio
        
        // Quitamos la clase de iluminación de los tildes
        checkboxesSeleccionados.forEach(function(cb) {
          const checkmark = cb.nextElementSibling;
          if (checkmark) {
            checkmark.classList.remove("iluminar-tilde");
          }
        });

        encuestaForm.style.opacity = "1"; // Vuelve a aparecer suavemente
      }, 500); // Tiempo que dura el desvanecimiento

    }, 800); // Tiempo que se quedan brillando los tildes antes de desvanecerse
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const btnEnviar = document.getElementById('btnEnviar');
  const textareaMensaje = document.getElementById('mensaje');

  if (contactForm && textareaMensaje) {
    const placeholderOriginal = textareaMensaje.placeholder;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      btnEnviar.disabled = true;

      // Hacemos que el texto interno se desvanezca sutilmente cambiando su color o estado
      textareaMensaje.style.transition = 'color 0.3s ease';
      textareaMensaje.style.color = 'transparent'; // Oculta el texto escribiendo sin tocar la caja

      setTimeout(function() {
        // Cambiamos el contenido por el mensaje de éxito
        contactForm.reset();
        textareaMensaje.value = "";
        textareaMensaje.placeholder = "¡Mensaje recibido con éxito!\nGracias por compartir tu idea. Nos pondremos en contacto muy pronto!";
        textareaMensaje.readOnly = true;
        
        // Volvemos a mostrar el texto del nuevo placeholder/valor
        textareaMensaje.style.color = ''; // Restaura el color original del texto

        // De 4 segundos visibles pasamos a limpiar
        setTimeout(function() {
          textareaMensaje.style.color = 'transparent'; // Desvanece el texto de éxito

          setTimeout(function() {
            // Restauramos todo al estado inicial sin que la caja parpadee jamás
            textareaMensaje.placeholder = placeholderOriginal;
            textareaMensaje.readOnly = false;
            textareaMensaje.style.color = '';
            
            btnEnviar.disabled = false;
          }, 300);

        }, 4000);

      }, 300);
    });
  }
});

document.querySelectorAll(".home-click-area").forEach(area => {
  area.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // Evita que propague eventos extra al carrusel

    // Lógica para volver al contenedor central de Zenit de forma fluida
    const zenitContainer = document.querySelector("#zenit") || document.querySelector("#pagina-central-zenit");
    if (zenitContainer) {
      zenitContainer.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center" // Por si tu carrusel es horizontal
      });
    }
  });
});