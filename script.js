// Base de datos de verbos
const verbos = {
    español: [
        'ser', 'estar', 'tener', 'hacer', 'decir', 'ir', 'ver', 'dar', 'saber', 'querer',
        'llegar', 'pasar', 'deber', 'poner', 'parecer', 'quedar', 'creer', 'hablar', 'llevar',
        'dejar', 'seguir', 'encontrar', 'llamar', 'venir', 'pensar', 'salir', 'volver', 'tomar',
        'conocer', 'vivir', 'sentir', 'tratar', 'mirar', 'esperar', 'contar', 'empezar', 'buscar',
        'existir', 'entrar', 'trabajar', 'escribir', 'perder', 'producir', 'ocurrir', 'entender',
        'pedir', 'recibir', 'mantener', 'resultar', 'leer', 'caer', 'cambiar', 'presentar'
    ],
    francés: [
        'être', 'avoir', 'faire', 'dire', 'aller', 'voir', 'savoir', 'vouloir', 'pouvoir',
        'devoir', 'venir', 'suivre', 'parler', 'prendre', 'regarder', 'appeler', 'arriver',
        'rester', 'entrer', 'sortir', 'partir', 'revenir', 'devenir', 'recevoir', 'répondre',
        'comprendre', 'apprendre', 'permettre', 'demander', 'chercher', 'trouver', 'donner',
        'mettre', 'passer', 'commencer', 'continuer', 'finir', 'ouvrir', 'fermer', 'monter',
        'descendre', 'attendre', 'servir', 'vivre', 'mourir', 'naître', 'grandir', 'vieillir',
        'travailler', 'étudier', 'enseigner', 'apprendre', 'écrire', 'lire'
    ]
};

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

// Pronombres
const pronombres = {
    español: ['yo', 'tú', 'él', 'ella', 'usted', 'nosotros', 'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'ustedes'],
    francés: ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles']
};

// Traducciones de la interfaz
const traducciones = {
    español: {
        titulo: '📚 CuentaHistorias',
        subtitulo: 'Genera frases y crea historias creativas',
        fraseMotivacional: 'Aprender el idioma es abrir la puerta a la verdadera integración',
        generarFrases: '🎯 Generar Frases',
        generarHistorias: '📖 Generar Historias',
        ayudaFrases: 'Crea una frase a partir de un verbo y un tiempo verbal. Animate y dilo en voz alta',
        ayudaHistorias: 'Descubre 3 conceptos para tu historia',
        botonEspanol: '🇪🇸 Frase en Español',
        botonFrances: '🇫🇷 Phrase en Français',
        botonHistoriasEspanol: '🇪🇸 Generar Historia en Español',
        botonHistoriasFrances: '🇫🇷 Générer Histoire en Français',
        tuFrase: 'Tu frase:',
        tusConceptos: 'Tus conceptos para la historia:',
        instrucciones: '📝 Instrucciones:',
        instruccion1: 'Crea una mini historia usando los 3 conceptos',
        instruccion2: 'Usa el tiempo verbal indicado',
        instruccion3: '¡Sé creativo y diviértete!',
        verConjugacion: '🔗 Ver conjugación completa',
        verConjugacionFR: '🔗 Voir la conjugaison complète',
        tiempoVerbal: 'Tiempo Verbal:',
        footer: 'Desarrollado por ocaranza.cl con ❤️ para todos los que siguen sus sueños',
        concepto: 'Concepto',
        cambiarIdioma: '🌐 Cambiar Idioma'
    },
    francés: {
        titulo: '📚 CompteHistoires',
        subtitulo: 'Générez des phrases et créez des histoires créatives',
        fraseMotivacional: 'Apprendre la langue, c\'est ouvrir la porte à la véritable intégration',
        generarFrases: '🎯 Générer des Phrases',
        generarHistorias: '📖 Générer des Histoires',
        ayudaFrases: 'Crée une phrase à partir d\'un verbe et d\'un temps verbal. Ose et dis-la à voix haute',
        ayudaHistorias: 'Découvre 3 concepts pour ton histoire',
        botonEspanol: '🇪🇸 Phrase en Espagnol',
        botonFrances: '🇫🇷 Phrase en Français',
        botonHistoriasEspanol: '🇪🇸 Generar Historia en Español',
        botonHistoriasFrances: '🇫🇷 Générer Histoire en Français',
        tuFrase: 'Ta phrase:',
        tusConceptos: 'Tes concepts pour l\'histoire:',
        instrucciones: '📝 Instructions:',
        instruccion1: 'Crée une mini histoire en utilisant les 3 concepts',
        instruccion2: 'Utilise le temps verbal indiqué',
        instruccion3: 'Sois créatif et amuse-toi !',
        verConjugacion: '🔗 Voir la conjugaison complète',
        verConjugacionFR: '🔗 Voir la conjugaison complète',
        tiempoVerbal: 'Temps Verbal:',
        footer: 'Développé par ocaranza.cl avec ❤️ pour tous ceux qui poursuivent leurs rêves',
        concepto: 'Concept',
        cambiarIdioma: '🌐 Changer de Langue'
    }
};

// Estado del idioma de la interfaz
let idiomaInterfaz = 'español';

// Elementos del DOM
const spanishBtn = document.getElementById('spanishBtn');
const frenchBtn = document.getElementById('frenchBtn');
const phraseResult = document.getElementById('phraseResult');
const phraseText = document.getElementById('phraseText');
const conjugatorLink = document.getElementById('conjugatorLink');
const storyResult = document.getElementById('storyResult');
const conceptsContainer = document.getElementById('conceptsContainer');

// Función para obtener elemento aleatorio de un array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Función para generar frase
function generarFrase(idioma) {
    const pronombre = getRandomElement(pronombres[idioma]);
    const verbo = getRandomElement(verbos[idioma]);
    const tiempoVerbal = getRandomElement(tiemposVerbos[idioma]);
    
    // Mostrar resultado en el formato solicitado
    phraseText.innerHTML = `<strong>"${pronombre}" + "${verbo}"</strong><br><span class="tiempo-verbal">(${tiempoVerbal})</span>`;
    phraseResult.classList.remove('hidden');
    
    // Configurar enlace al conjugador
    if (idioma === 'francés') {
        conjugatorLink.href = `https://conjugador.reverso.net/conjugacion-frances.html`;
        conjugatorLink.textContent = traducciones[idiomaInterfaz].verConjugacionFR;
    } else {
        conjugatorLink.href = `https://conjugador.reverso.net/conjugacion-espanol.html`;
        conjugatorLink.textContent = traducciones[idiomaInterfaz].verConjugacion;
    }
    
    // Scroll suave al resultado
    phraseResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    
    // Crear tarjetas para cada concepto
    conceptsContainer.innerHTML = '';
    conceptosSeleccionados.forEach((concepto, index) => {
        const conceptCard = document.createElement('div');
        conceptCard.className = 'concept-card';
        conceptCard.innerHTML = `
            <h4>${traducciones[idiomaInterfaz].concepto} ${index + 1}</h4>
            <p>${concepto}</p>
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
    `;
    conceptsContainer.appendChild(tiempoCard);
    
    // Mostrar resultado
    storyResult.classList.remove('hidden');
    
    // Scroll suave al resultado
    storyResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    
    // Sección de frases
    document.querySelector('.phrase-section h2').textContent = t.generarFrases;
    document.querySelector('.phrase-section .help-text').textContent = t.ayudaFrases;
    document.getElementById('spanishBtn').textContent = t.botonEspanol;
    document.getElementById('frenchBtn').textContent = t.botonFrances;
    document.querySelector('.phrase-section h3').textContent = t.tuFrase;
    
    // Sección de historias
    document.querySelector('.story-section h2').textContent = t.generarHistorias;
    document.querySelector('.story-section .help-text').textContent = t.ayudaHistorias;
    document.getElementById('generateStorySpanishBtn').textContent = t.botonHistoriasEspanol;
    document.getElementById('generateStoryFrenchBtn').textContent = t.botonHistoriasFrances;
    document.querySelector('.story-section h3').textContent = t.tusConceptos;
    document.querySelector('.story-instructions h4').textContent = t.instrucciones;
    
    // Instrucciones
    const instrucciones = document.querySelectorAll('.story-instructions li');
    instrucciones[0].textContent = t.instruccion1;
    instrucciones[1].textContent = t.instruccion2;
    instrucciones[2].textContent = t.instruccion3;
    
    // Footer
    const footerText = document.querySelector('.developer-credit p');
    if (idiomaInterfaz === 'español') {
        footerText.innerHTML = 'Desarrollado por <a href="https://ocaranza.cl" target="_blank">ocaranza.cl</a> con ❤️ para todos los que siguen sus sueños';
    } else {
        footerText.innerHTML = 'Développé par <a href="https://ocaranza.cl" target="_blank">ocaranza.cl</a> avec ❤️ pour tous ceux qui poursuivent leurs rêves';
    }
    
    // Botón de cambio de idioma
    document.getElementById('languageToggle').textContent = t.cambiarIdioma;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botón para generar frase en español
    spanishBtn.addEventListener('click', () => {
        generarFrase('español');
    });
    
    // Botón para generar frase en francés
    frenchBtn.addEventListener('click', () => {
        generarFrase('francés');
    });
    
    // Botón para generar conceptos de historia en español
    document.getElementById('generateStorySpanishBtn').addEventListener('click', () => {
        generarConceptos('español');
    });
    
    // Botón para generar conceptos de historia en francés
    document.getElementById('generateStoryFrenchBtn').addEventListener('click', () => {
        generarConceptos('francés');
    });
    
    // Botón para cambiar idioma de la interfaz
    document.getElementById('languageToggle').addEventListener('click', cambiarIdiomaInterfaz);
    
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