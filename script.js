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

    // --- SOPORTE TÁCTIL Y MOUSE CON FRANJA CENTRAL PROTEGIDA ---
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    // Ancho de la zona central protegida en píxeles (aprox. 220px para scroll vertical fluido)
    const centralDeadZoneWidth = 220; 

    slider.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length !== 1) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - startX;
        const diffY = currentY - startY;

        const absX = Math.abs(diffX);
        const absY = Math.abs(diffY);

        // Verificamos si el toque inicial se encuentra dentro de la franja central de la pantalla
        const screenWidth = window.innerWidth;
        const centralZoneMin = (screenWidth - centralDeadZoneWidth) / 2;
        const centralZoneMax = (screenWidth + centralDeadZoneWidth) / 2;
        const isInCentralZone = (startX >= centralZoneMin && startX <= centralZoneMax);

        // Si estamos en la zona central y el usuario hace un movimiento vertical (o diagonal leve),
        // priorizamos el scroll vertical de la sección para que no cambie de página por error.
        if (isInCentralZone && (absY > absX || absX < 60)) {
            return; // Permite el comportamiento vertical nativo
        }
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        // Comprobamos si el gesto fue predominantemente horizontal fuera de la zona protegida
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
  if (!elementoFrase) return; 
  
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

// --- FORMULARIO DE CONTACTO ---
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const btnEnviar = document.getElementById('btnEnviar');
  const textareaMensaje = document.getElementById('mensaje');

  if (contactForm && textareaMensaje) {
    const placeholderOriginal = textareaMensaje.placeholder;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      btnEnviar.disabled = true;

      textareaMensaje.style.transition = 'color 0.3s ease';
      textareaMensaje.style.color = 'transparent'; 

      setTimeout(function() {
        contactForm.reset();
        textareaMensaje.value = "";
        textareaMensaje.placeholder = "¡Mensaje recibido con éxito!\nGracias por compartir tu idea. Nos pondremos en contacto muy pronto!";
        textareaMensaje.readOnly = true;
        
        textareaMensaje.style.color = ''; 

        setTimeout(function() {
          textareaMensaje.style.color = 'transparent'; 

          setTimeout(function() {
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

// --- BOTÓN / ÁREA PARA VOLVER AL HOME ---
document.querySelectorAll(".home-click-area").forEach(area => {
  area.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); 

    const zenitContainer = document.querySelector("#zenit") || document.querySelector("#pagina-central-zenit");
    if (zenitContainer) {
      zenitContainer.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center" 
      });
    }
  });
});
