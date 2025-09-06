
// Tiempos verbales
const tiemposVerbos = {
    español: [
        'Presente',
        'Pretérito Perfecto Simple',
        'Pretérito Imperfecto',
        'Pretérito Perfecto Compuesto',
        'Futuro Simple',
        'Condicional Simple'
    ],
    francés: [
        'Présent',
        'Imparfait',
        'Passé Composé',
        'Plus-que-parfait',
        'Passé Simple',
        'Futur Simple',
        'Impératif Présent',
        'Futur Proche'
    ]
};

// Base de datos de conceptos para historias
const conceptos = {
    español: [
        'escuela', 'queso', 'sol', 'mar', 'árbol', 'casa', 'perro', 'gato', 'libro', 'coche',
        'flor', 'luna', 'estrella', 'nube', 'lluvia', 'nieve', 'montaña', 'río', 'puente', 'puerta',
        'ventana', 'mesa', 'silla', 'cama', 'cocina', 'baño', 'jardín', 'parque', 'calle', 'ciudad',
        'pueblo', 'país', 'mundo', 'universo', 'tiempo', 'amor', 'amistad', 'familia', 'trabajo',
        'música', 'arte', 'deporte', 'comida', 'agua', 'fuego', 'aire', 'tierra', 'color', 'forma',
        'sonido', 'silencio', 'luz', 'sombra', 'verdad', 'mentira', 'felicidad', 'tristeza', 'miedo',
        'valentía', 'sabiduría', 'conocimiento', 'imaginación', 'creatividad', 'libertad', 'justicia',
        'paz', 'guerra', 'vida', 'muerte', 'nacimiento', 'crecimiento', 'cambio', 'movimiento'
    ],
    francés: [
        'école', 'fromage', 'soleil', 'mer', 'arbre', 'maison', 'chien', 'chat', 'livre', 'voiture',
        'fleur', 'lune', 'étoile', 'nuage', 'pluie', 'neige', 'montagne', 'rivière', 'pont', 'porte',
        'fenêtre', 'table', 'chaise', 'lit', 'cuisine', 'salle de bain', 'jardin', 'parc', 'rue', 'ville',
        'village', 'pays', 'monde', 'univers', 'temps', 'amour', 'amitié', 'famille', 'travail',
        'musique', 'art', 'sport', 'nourriture', 'eau', 'feu', 'air', 'terre', 'couleur', 'forme',
        'son', 'silence', 'lumière', 'ombre', 'vérité', 'mensonge', 'bonheur', 'tristesse', 'peur',
        'courage', 'sagesse', 'connaissance', 'imagination', 'créativité', 'liberté', 'justice',
        'paix', 'guerre', 'vie', 'mort', 'naissance', 'croissance', 'changement', 'mouvement'
    ]
};


// Traducciones de la interfaz
const traducciones = {
    español: {
        titulo: '📚 CuentaHistorias',
        subtitulo: 'Genera frases y crea historias creativas',
        fraseMotivacional: 'Aprender el idioma es abrir la puerta a la verdadera integración',
        generarHistorias: '📖 Generar Historias',
        ayudaHistorias: 'Descubre 3 conceptos para tu historia',
        botonHistoriasEspanol: '🇪🇸 Generar Historia en Español',
        botonHistoriasFrances: '🇫🇷 Générer Histoire en Français',
        tusConceptos: 'Tus conceptos para la historia:',
        instrucciones: '📝 Instrucciones:',
        instruccion1: 'Crea una mini historia usando los 3 conceptos',
        instruccion2: 'Usa el tiempo verbal indicado',
        instruccion3: '¡Sé creativo y diviértete!',
        tiempoVerbal: 'Tiempo Verbal:',
        footer: 'Desarrollado por ocaranza.cl con ❤️ para todos los que siguen sus sueños',
        concepto: 'Concepto',
        cambiarIdioma: '🌐 Cambiar Idioma'
    },
    francés: {
        titulo: '📚 CompteHistoires',
        subtitulo: 'Générez des phrases et créez des histoires créatives',
        fraseMotivacional: 'Apprendre la langue, c\'est ouvrir la porte à la véritable intégration',
        generarHistorias: '📖 Générer des Histoires',
        ayudaHistorias: 'Découvre 3 concepts pour ton histoire',
        botonHistoriasEspanol: '🇪🇸 Generar Historia en Español',
        botonHistoriasFrances: '🇫🇷 Générer Histoire en Français',
        tusConceptos: 'Tes concepts pour l\'histoire:',
        instrucciones: '📝 Instructions:',
        instruccion1: 'Crée une mini histoire en utilisant les 3 concepts',
        instruccion2: 'Utilise le temps verbal indiqué',
        instruccion3: 'Sois créatif et amuse-toi !',
        tiempoVerbal: 'Temps Verbal:',
        footer: 'Développé par ocaranza.cl avec ❤️ pour tous ceux qui poursuivent leurs rêves',
        concepto: 'Concept',
        cambiarIdioma: '🌐 Changer de Langue'
    }
};

// Estado del idioma de la interfaz
let idiomaInterfaz = 'español';

// Elementos del DOM (se inicializarán en DOMContentLoaded)
let storyResult;
let conceptsContainer;

// Función para obtener elemento aleatorio de un array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}


// Función para generar conceptos para historia
function generarConceptos(idioma) {
    // Obtener 3 conceptos únicos aleatorios del idioma seleccionado
    const conceptosSeleccionados = [];
    const conceptosDisponibles = [...conceptos[idioma]];
    
    for (let i = 0; i < 3; i++) {
        const indice = Math.floor(Math.random() * conceptosDisponibles.length);
        conceptosSeleccionados.push(conceptosDisponibles[indice]);
        conceptosDisponibles.splice(indice, 1);
    }
    
    // Seleccionar tiempo verbal del idioma seleccionado
    const tiempoVerbal = getRandomElement(tiemposVerbos[idioma]);
    
    // Verificar que el contenedor existe
    if (!conceptsContainer) return;
    
    // Crear tarjetas para cada concepto
    conceptsContainer.innerHTML = '';
    conceptosSeleccionados.forEach((concepto, index) => {
        const conceptCard = document.createElement('div');
        conceptCard.className = 'concept-card';
        conceptCard.innerHTML = `
            <h4>${traducciones[idiomaInterfaz].concepto} ${index + 1}</h4>
            <p>${concepto}</p>
            <div class="validation-ticket">
                <div class="ticket-checkbox">
                    <input type="checkbox" id="concept-${index}" class="concept-checkbox">
                    <label for="concept-${index}" class="checkbox-label">
                        <span class="checkmark">✓</span>
                    </label>
                </div>
            </div>
        `;
        conceptsContainer.appendChild(conceptCard);
    });
    
    // Agregar tarjeta del tiempo verbal
    const tiempoCard = document.createElement('div');
    tiempoCard.className = 'concept-card tiempo-card';
    tiempoCard.innerHTML = `
        <h4>${traducciones[idiomaInterfaz].tiempoVerbal}</h4>
        <p>${tiempoVerbal}</p>
        <small>${idioma === 'español' ? '🇪🇸' : '🇫🇷'} ${idioma}</small>
        <div class="extra-points-badge">
            <span class="extra-points-text">${idiomaInterfaz === 'español' ? '⭐ Puntos Extra!' : '⭐ Points Bonus!'}</span>
        </div>
        <div class="validation-ticket">
            <div class="ticket-checkbox">
                <input type="checkbox" id="tiempo-${Date.now()}" class="concept-checkbox">
                <label for="tiempo-${Date.now()}" class="checkbox-label">
                    <span class="checkmark">✓</span>
                </label>
            </div>
        </div>
    `;
    conceptsContainer.appendChild(tiempoCard);
    
    // Mostrar resultado
    if (storyResult) {
        storyResult.classList.remove('hidden');
        
        // Scroll suave al resultado
        storyResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Agregar event listeners a los checkboxes
    agregarEventListenersConceptos();
}

// Función para agregar event listeners a los conceptos
function agregarEventListenersConceptos() {
    const checkboxes = document.querySelectorAll('.concept-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const conceptCard = this.closest('.concept-card');
            if (this.checked) {
                conceptCard.classList.add('completed');
            } else {
                conceptCard.classList.remove('completed');
            }
            
            // Verificar si se completaron los 3 conceptos principales
            verificarCompletado();
        });
    });
}

// Función para verificar si se completaron los 3 conceptos principales
function verificarCompletado() {
    const conceptCards = document.querySelectorAll('.concept-card:not(.tiempo-card)');
    const completedCards = document.querySelectorAll('.concept-card:not(.tiempo-card).completed');
    
    if (conceptCards.length === 3 && completedCards.length === 3) {
        // Mostrar mensaje de celebración
        mostrarMensajeCelebracion();
        
        // Lanzar confeti
        lanzarConfeti();
    }
}

// Función para mostrar mensaje de celebración
function mostrarMensajeCelebracion() {
    const mensaje = document.createElement('div');
    mensaje.className = 'celebration-message';
    mensaje.innerHTML = `
        <div class="celebration-content">
            <h3>🎉 ¡Excelente! 🎉</h3>
            <p>${idiomaInterfaz === 'español' ? '¡Has usado todos los conceptos en tu historia!' : 'Tu as utilisé tous les concepts dans ton histoire!'}</p>
            <div class="celebration-emoji">✨🌟✨</div>
        </div>
    `;
    
    // Insertar después de los conceptos
    if (conceptsContainer && conceptsContainer.parentNode) {
        conceptsContainer.parentNode.insertBefore(mensaje, conceptsContainer.nextSibling);
    }
    
    // Remover mensaje después de 4 segundos
    setTimeout(() => {
        if (mensaje.parentNode) {
            mensaje.parentNode.removeChild(mensaje);
        }
    }, 4000);
}

// Función para lanzar confeti
function lanzarConfeti() {
    // Configuración del confeti
    const count = 200;
    const defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }

    // Secuencia de confeti
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

// Función para cambiar idioma de la interfaz
function cambiarIdiomaInterfaz() {
    idiomaInterfaz = idiomaInterfaz === 'español' ? 'francés' : 'español';
    aplicarTraduccion();
}

// Función para aplicar traducción a la interfaz
function aplicarTraduccion() {
    const t = traducciones[idiomaInterfaz];
    
    // Header
    document.querySelector('header h1').textContent = t.titulo;
    document.querySelector('.subtitle').textContent = t.subtitulo; // Restaurar subtítulo
    document.querySelector('.motivational-quote').textContent = t.fraseMotivacional;
    
    
    // Sección de historias
    const storySectionH2 = document.querySelector('.story-section h2');
    if (storySectionH2) storySectionH2.textContent = t.generarHistorias;
    
    const storyHelpText = document.querySelector('.story-section .help-text');
    if (storyHelpText) storyHelpText.textContent = t.ayudaHistorias;
    
    const spanishStoryBtn = document.getElementById('generateStorySpanishBtn');
    if (spanishStoryBtn) spanishStoryBtn.textContent = t.botonHistoriasEspanol;
    
    const frenchStoryBtn = document.getElementById('generateStoryFrenchBtn');
    if (frenchStoryBtn) frenchStoryBtn.textContent = t.botonHistoriasFrances;
    
    const storySectionH3 = document.querySelector('.story-section h3');
    if (storySectionH3) storySectionH3.textContent = t.tusConceptos;
    
    const storyInstructionsH4 = document.querySelector('.story-instructions h4');
    if (storyInstructionsH4) storyInstructionsH4.textContent = t.instrucciones;
    
    // Instrucciones
    const instrucciones = document.querySelectorAll('.story-instructions li');
    if (instrucciones.length >= 3) {
        instrucciones[0].textContent = t.instruccion1;
        instrucciones[1].textContent = t.instruccion2;
        instrucciones[2].textContent = t.instruccion3;
    }
    
    // Footer
    const footerText = document.querySelector('.developer-credit p');
    if (footerText) {
        if (idiomaInterfaz === 'español') {
            footerText.innerHTML = 'Desarrollado por <a href="https://ocaranza.cl" target="_blank">ocaranza.cl</a> con ❤️ para todos los que siguen sus sueños';
        } else {
            footerText.innerHTML = 'Développé par <a href="https://ocaranza.cl" target="_blank">ocaranza.cl</a> avec ❤️ pour tous ceux qui poursuivent leurs rêves';
        }
    }
    
    // Botón de cambio de idioma
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.textContent = t.cambiarIdioma;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar elementos del DOM
    storyResult = document.getElementById('storyResult');
    conceptsContainer = document.getElementById('conceptsContainer');
    
    // Botón para generar conceptos de historia en español
    const spanishStoryBtn = document.getElementById('generateStorySpanishBtn');
    if (spanishStoryBtn) {
        spanishStoryBtn.addEventListener('click', () => {
            generarConceptos('español');
        });
    }
    
    // Botón para generar conceptos de historia en francés
    const frenchStoryBtn = document.getElementById('generateStoryFrenchBtn');
    if (frenchStoryBtn) {
        frenchStoryBtn.addEventListener('click', () => {
            generarConceptos('francés');
        });
    }
    
    // Botón para cambiar idioma de la interfaz
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', cambiarIdiomaInterfaz);
    }
    
    // Efectos de hover en las tarjetas de conceptos
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.concept-card')) {
            e.target.closest('.concept-card').style.transform = 'translateY(-3px)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.concept-card')) {
            e.target.closest('.concept-card').style.transform = 'translateY(0)';
        }
    });
    
    // Aplicar traducción inicial
    aplicarTraduccion();
});

// Función para agregar animación de entrada
function animateIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Aplicar animaciones cuando se muestran los resultados
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateIn(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.phrase-section, .story-section');
    sections.forEach(section => observer.observe(section));
}); 