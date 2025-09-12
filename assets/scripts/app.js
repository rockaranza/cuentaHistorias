/**
 * CuentaHistorias - Aplicación principal
 * Generador de historias creativas con consultas tipo API
 */

class CuentaHistoriasApp {
    constructor() {
        this.idiomaInterfaz = 'español';
        this.elementos = {};
        this.traducciones = {};
        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    async init() {
        try {
            // Cargar traducciones iniciales
            await this.cargarTraducciones();
            
            // Inicializar cuando el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initDOM());
            } else {
                this.initDOM();
            }
        } catch (error) {
            console.error('Error inicializando la aplicación:', error);
            this.mostrarError('Error al cargar la aplicación');
        }
    }

    /**
     * Inicializa elementos del DOM y event listeners
     */
    initDOM() {
        // Cachear elementos del DOM
        this.elementos = {
            storyResult: document.getElementById('storyResult'),
            conceptsContainer: document.getElementById('conceptsContainer'),
            generateStorySpanishBtn: document.getElementById('generateStorySpanishBtn'),
            generateStoryFrenchBtn: document.getElementById('generateStoryFrenchBtn'),
            languageToggle: document.getElementById('languageToggle')
        };

        // Configurar event listeners
        this.setupEventListeners();
        
        // Aplicar traducción inicial
        this.aplicarTraduccion();
        
        // Configurar observador para animaciones
        this.setupAnimationObserver();
    }

    /**
     * Configura todos los event listeners
     */
    setupEventListeners() {
        // Botones de generación de historias
        if (this.elementos.generateStorySpanishBtn) {
            this.elementos.generateStorySpanishBtn.addEventListener('click', () => {
                this.generarConceptos('español');
            });
        }

        if (this.elementos.generateStoryFrenchBtn) {
            this.elementos.generateStoryFrenchBtn.addEventListener('click', () => {
                this.generarConceptos('francés');
            });
        }

        // Botón de cambio de idioma
        if (this.elementos.languageToggle) {
            this.elementos.languageToggle.addEventListener('click', () => {
                this.cambiarIdiomaInterfaz();
            });
        }

        // Efectos hover en tarjetas de conceptos
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.concept-card')) {
                e.target.closest('.concept-card').style.transform = 'translateY(-3px)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.concept-card')) {
                e.target.closest('.concept-card').style.transform = 'translateY(0)';
            }
        });
    }

    /**
     * Carga traducciones desde la API
     */
    async cargarTraducciones() {
        try {
            this.traducciones = {
                español: await dataAPI.getTranslations('español'),
                francés: await dataAPI.getTranslations('francés')
            };
        } catch (error) {
            console.error('Error cargando traducciones:', error);
            // Fallback a traducciones básicas
            this.traducciones = {
                español: { titulo: '📚 CuentaHistorias', error: 'Error al cargar traducciones' },
                francés: { titulo: '📚 CompteHistoires', error: 'Erreur de chargement des traductions' }
            };
        }
    }

    /**
     * Genera conceptos para historia usando la API
     */
    async generarConceptos(idioma) {
        try {
            // Mostrar loading (opcional)
            this.mostrarLoading();

            // Consultar conceptos y tiempo verbal usando la API
            const [conceptos, tiempoVerbal] = await Promise.all([
                dataAPI.getRandomElements('conceptos', idioma, 3),
                dataAPI.getRandomElement('tiempos-verbales', idioma)
            ]);

            // Renderizar resultados
            this.renderizarConceptos(conceptos, tiempoVerbal, idioma);
            
            // Mostrar resultado con animación
            this.mostrarResultado();

        } catch (error) {
            console.error('Error generando conceptos:', error);
            this.mostrarError('Error al generar conceptos. Inténtalo de nuevo.');
        }
    }

    /**
     * Renderiza los conceptos en el DOM
     */
    renderizarConceptos(conceptos, tiempoVerbal, idioma) {
        if (!this.elementos.conceptsContainer) return;

        // Limpiar contenedor
        this.elementos.conceptsContainer.innerHTML = '';

        // Crear tarjetas para cada concepto
        conceptos.forEach((concepto, index) => {
            const conceptCard = this.crearTarjetaConcepto(concepto, index);
            this.elementos.conceptsContainer.appendChild(conceptCard);
        });

        // Agregar tarjeta del tiempo verbal
        const tiempoCard = this.crearTarjetaTiempo(tiempoVerbal, idioma);
        this.elementos.conceptsContainer.appendChild(tiempoCard);

        // Configurar event listeners para checkboxes
        this.configurarCheckboxes();
    }

    /**
     * Crea una tarjeta de concepto
     */
    crearTarjetaConcepto(concepto, index) {
        const conceptCard = document.createElement('div');
        conceptCard.className = 'concept-card';
        conceptCard.innerHTML = `
            <h4>${this.traducciones[this.idiomaInterfaz].concepto} ${index + 1}</h4>
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
        return conceptCard;
    }

    /**
     * Crea la tarjeta del tiempo verbal
     */
    crearTarjetaTiempo(tiempoVerbal, idioma) {
        const tiempoCard = document.createElement('div');
        tiempoCard.className = 'concept-card tiempo-card';
        tiempoCard.innerHTML = `
            <h4>${this.traducciones[this.idiomaInterfaz].tiempoVerbal}</h4>
            <p>${tiempoVerbal}</p>
            <small>${idioma === 'español' ? '🇪🇸' : '🇫🇷'} ${idioma}</small>
            <div class="extra-points-badge">
                <span class="extra-points-text">${this.traducciones[this.idiomaInterfaz].puntosExtra}</span>
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
        return tiempoCard;
    }

    /**
     * Configura event listeners para checkboxes
     */
    configurarCheckboxes() {
        const checkboxes = document.querySelectorAll('.concept-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const conceptCard = e.target.closest('.concept-card');
                if (e.target.checked) {
                    conceptCard.classList.add('completed');
                } else {
                    conceptCard.classList.remove('completed');
                }
                this.verificarCompletado();
            });
        });
    }

    /**
     * Verifica si se completaron todos los conceptos
     */
    verificarCompletado() {
        const conceptCards = document.querySelectorAll('.concept-card:not(.tiempo-card)');
        const completedCards = document.querySelectorAll('.concept-card:not(.tiempo-card).completed');

        if (conceptCards.length === 3 && completedCards.length === 3) {
            this.mostrarCelebracion();
            this.lanzarConfeti();
        }
    }

    /**
     * Muestra mensaje de celebración
     */
    mostrarCelebracion() {
        const mensaje = document.createElement('div');
        mensaje.className = 'celebration-message';
        mensaje.innerHTML = `
            <div class="celebration-content">
                <h3>${this.traducciones[this.idiomaInterfaz].excelente}</h3>
                <p>${this.traducciones[this.idiomaInterfaz].mensajeCelebracion}</p>
                <div class="celebration-emoji">✨🌟✨</div>
            </div>
        `;

        // Insertar después de los conceptos
        if (this.elementos.conceptsContainer && this.elementos.conceptsContainer.parentNode) {
            this.elementos.conceptsContainer.parentNode.insertBefore(mensaje, this.elementos.conceptsContainer.nextSibling);
        }

        // Remover mensaje después de 4 segundos
        setTimeout(() => {
            if (mensaje.parentNode) {
                mensaje.parentNode.removeChild(mensaje);
            }
        }, 4000);
    }

    /**
     * Lanza animación de confeti
     */
    lanzarConfeti() {
        if (typeof confetti === 'undefined') return;

        const count = 200;
        const defaults = { origin: { y: 0.7 } };

        const fire = (particleRatio, opts) => {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        };

        // Secuencia de confeti
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }

    /**
     * Cambia el idioma de la interfaz
     */
    async cambiarIdiomaInterfaz() {
        this.idiomaInterfaz = this.idiomaInterfaz === 'español' ? 'francés' : 'español';
        await this.aplicarTraduccion();
    }

    /**
     * Aplica las traducciones a la interfaz
     */
    async aplicarTraduccion() {
        const t = this.traducciones[this.idiomaInterfaz];
        if (!t) return;

        // Header
        const headerH1 = document.querySelector('header h1');
        if (headerH1) headerH1.textContent = t.titulo;

        const subtitle = document.querySelector('.subtitle');
        if (subtitle) subtitle.textContent = t.subtitulo;

        const motivationalQuote = document.querySelector('.motivational-quote');
        if (motivationalQuote) motivationalQuote.textContent = t.fraseMotivacional;

        // Sección de historias
        const storySectionH2 = document.querySelector('.story-section h2');
        if (storySectionH2) storySectionH2.textContent = t.generarHistorias;

        // Botones
        if (this.elementos.generateStorySpanishBtn) {
            this.elementos.generateStorySpanishBtn.textContent = t.botonHistoriasEspanol;
        }
        if (this.elementos.generateStoryFrenchBtn) {
            this.elementos.generateStoryFrenchBtn.textContent = t.botonHistoriasFrances;
        }
        if (this.elementos.languageToggle) {
            this.elementos.languageToggle.textContent = t.cambiarIdioma;
        }

        // Contenido dinámico
        const storySectionH3 = document.querySelector('.story-section h3');
        if (storySectionH3) storySectionH3.textContent = t.tusConceptos;

        const storyInstructionsH4 = document.querySelector('.story-instructions h4');
        if (storyInstructionsH4) storyInstructionsH4.textContent = t.instrucciones;

        // Instrucciones
        const instrucciones = document.querySelectorAll('.story-instructions li');
        if (instrucciones.length >= 4) {
            instrucciones[0].textContent = t.instruccion1;
            instrucciones[1].textContent = t.instruccion2;
            instrucciones[2].textContent = t.instruccion3;
            instrucciones[3].textContent = t.instruccion4;
        }

        // Footer
        const footerText = document.querySelector('.developer-credit p');
        if (footerText) {
            footerText.innerHTML = t.footer.includes('ocaranza.cl') 
                ? t.footer 
                : `${t.footer} <a href="https://ocaranza.cl" target="_blank">ocaranza.cl</a>`;
        }
    }

    /**
     * Muestra el resultado con animación
     */
    mostrarResultado() {
        if (this.elementos.storyResult) {
            this.elementos.storyResult.classList.remove('hidden');
            this.elementos.storyResult.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    /**
     * Muestra indicador de carga
     */
    mostrarLoading() {
        if (this.elementos.conceptsContainer) {
            this.elementos.conceptsContainer.innerHTML = `
                <div class="loading-indicator">
                    <p>⏳ Generando conceptos...</p>
                </div>
            `;
        }
    }

    /**
     * Muestra mensaje de error
     */
    mostrarError(mensaje) {
        if (this.elementos.conceptsContainer) {
            this.elementos.conceptsContainer.innerHTML = `
                <div class="error-message">
                    <p>❌ ${mensaje}</p>
                </div>
            `;
        }
    }

    /**
     * Configura observador para animaciones de entrada
     */
    setupAnimationObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateIn(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const sections = document.querySelectorAll('.phrase-section, .story-section');
        sections.forEach(section => observer.observe(section));
    }

    /**
     * Anima la entrada de un elemento
     */
    animateIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Inicializar la aplicación
const app = new CuentaHistoriasApp();
