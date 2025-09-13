/**
 * Placoteurs - Aplicación principal
 * Generador de historias creativas con consultas tipo API
 */

class PlacoteursApp {
    constructor() {
        this.elementos = {};
        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    async init() {
        try {
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
    async initDOM() {
        // Cachear elementos del DOM
        this.elementos = {
            conceptsContainer: document.getElementById('conceptsContainer'),
            playBtn: document.getElementById('playBtn')
        };

        // Inicializar gestor de idiomas
        await languageManager.init();

        // Configurar event listeners
        this.setupEventListeners();
        
        // Configurar observador para animaciones
        this.setupAnimationObserver();
        
        // Escuchar cambios de idioma
        this.setupLanguageListeners();
    }

    /**
     * Configura todos los event listeners
     */
    setupEventListeners() {
        // Botón de jugar
        if (this.elementos.playBtn) {
            this.elementos.playBtn.addEventListener('click', () => {
                const currentLanguage = languageManager.getCurrentLanguage();
                this.generarConceptos(currentLanguage);
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
     * Configura listeners para eventos de cambio de idioma
     */
    setupLanguageListeners() {
        // Escuchar cambios de idioma del languageManager
        document.addEventListener('languageChanged', (event) => {
            const { newLanguage, translations } = event.detail;
            console.log(`✅ Idioma cambiado a: ${newLanguage}`);
            
            // Actualizar cualquier contenido específico de la app si es necesario
            this.onLanguageChanged(newLanguage, translations);
        });
    }

    /**
     * Maneja cambios de idioma específicos de la aplicación
     */
    onLanguageChanged(newLanguage, translations) {
        // Limpiar resultados si existen para evitar contenido mixto
        if (this.elementos.conceptsContainer && !this.elementos.conceptsContainer.classList.contains('hidden')) {
            // Opcional: Limpiar o mantener resultados según UX deseada
            this.elementos.conceptsContainer.classList.add('hidden');
        }
    }

    /**
     * Genera conceptos para historia usando la API
     */
    async generarConceptos(idioma) {
        try {
            // Mostrar loading (opcional)
            this.mostrarLoading();

            // Consultar solo conceptos usando la API
            const conceptos = await dataAPI.getRandomElements('conceptos', idioma, 3);

            // Renderizar resultados
            this.renderizarConceptos(conceptos, idioma);
            
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
    renderizarConceptos(conceptos, idioma) {
        if (!this.elementos.conceptsContainer) return;

        // Limpiar contenedor
        this.elementos.conceptsContainer.innerHTML = '';

        // Crear tarjetas para cada concepto
        conceptos.forEach((concepto, index) => {
            const conceptCard = this.crearTarjetaConcepto(concepto, index);
            this.elementos.conceptsContainer.appendChild(conceptCard);
        });

        // Configurar event listeners para checkboxes
        this.configurarCheckboxes();
    }

    /**
     * Crea una tarjeta de concepto
     */
    crearTarjetaConcepto(concepto, index) {
        const conceptCard = document.createElement('div');
        conceptCard.className = 'concept-card';
        const translations = languageManager.getCurrentTranslations();
        conceptCard.innerHTML = `
            <h4>${translations.concepto} ${index + 1}</h4>
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
        const conceptCards = document.querySelectorAll('.concept-card');
        const completedCards = document.querySelectorAll('.concept-card.completed');

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
        const translations = languageManager.getCurrentTranslations();
        
        mensaje.innerHTML = `
            <div class="celebration-content">
                <h3>${translations.excelente}</h3>
                <p>${translations.mensajeCelebracion}</p>
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
     * Muestra el resultado con animación
     */
    mostrarResultado() {
        if (this.elementos.conceptsContainer) {
            this.elementos.conceptsContainer.classList.remove('hidden');
            // Los conceptos aparecen arriba del botón en el mismo contenedor
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
const app = new PlacoteursApp();

// Funcionalidad del formulario de contacto (solo en about.html)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Obtener traducciones actuales
            const translations = languageManager.getCurrentTranslations();
            
            // Validar datos
            if (!data.name || !data.email || !data.subject || !data.message) {
                const errorMessage = translations.contactValidationError || 'Por favor, completa todos los campos del formulario.';
                alert(errorMessage);
                return;
            }
            
            // Simular envío (aquí podrías integrar con un servicio real)
            const submitBtn = contactForm.querySelector('.btn-contact');
            const originalText = submitBtn.textContent;
            
            const sendingText = translations.contactSending || 'Enviando...';
            const successMessage = translations.contactSuccess || '¡Mensaje enviado con éxito! Te responderemos pronto.';
            
            submitBtn.textContent = sendingText;
            submitBtn.disabled = true;
            
            // Simular delay de envío
            setTimeout(() => {
                // Aquí podrías hacer una petición real a tu servidor
                console.log('Datos del formulario:', data);
                
                // Mostrar mensaje de éxito
                alert(successMessage);
                
                // Resetear formulario
                contactForm.reset();
                
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});
