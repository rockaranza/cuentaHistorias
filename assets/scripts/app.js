/**
 * Placoteurs - Aplicación principal
 * Generador de historias creativas con consultas tipo API
 */

class PlacoteursApp {
    constructor() {
        this.elementos = {};
        this.isCountdownRunning = false; // Control para evitar múltiples ejecuciones
        this.currentAudio = null; // Control para evitar superposición de sonidos
        this.lastSoundTime = 0; // Control de timing para evitar sonidos duplicados
        this.isSoundPlaying = false; // Control para evitar reproducción simultánea
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
        
        // Escuchar redimensionamiento de ventana
        this.setupResizeListener();
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
        // Evitar múltiples ejecuciones simultáneas
        if (this.isCountdownRunning) {
            return;
        }

        try {
            this.isCountdownRunning = true;
            
            // Deshabilitar botón durante la cuenta regresiva
            if (this.elementos.playBtn) {
                this.elementos.playBtn.disabled = true;
                this.elementos.playBtn.style.opacity = '0.6';
            }
            
            // Iniciar cuenta regresiva
            await this.iniciarCuentaRegresiva(idioma);

            // Consultar solo conceptos usando la API
            const conceptos = await dataAPI.getRandomElements('conceptos', idioma, 3);

            // Renderizar resultados
            this.renderizarConceptos(conceptos, idioma);
            
            // Mostrar resultado con animación
            this.mostrarResultado();

        } catch (error) {
            console.error('Error generando conceptos:', error);
            this.mostrarError('Error al generar conceptos. Inténtalo de nuevo.');
        } finally {
            this.isCountdownRunning = false;
            
            // Re-habilitar botón
            if (this.elementos.playBtn) {
                this.elementos.playBtn.disabled = false;
                this.elementos.playBtn.style.opacity = '1';
            }
        }
    }

    /**
     * Inicia la cuenta regresiva espectacular
     */
    async iniciarCuentaRegresiva(idioma) {
        const countdownOverlay = document.getElementById('countdownOverlay');
        const countdownText = document.getElementById('countdownText');
        
        // Asegurar que el languageManager esté inicializado
        if (!languageManager.translations) {
            await languageManager.init();
        }
        
        const translations = languageManager.getCurrentTranslations();
        
        if (!countdownOverlay || !countdownText) return;

        // Mostrar overlay
        countdownOverlay.classList.remove('hidden');
        countdownOverlay.classList.add('show');

        // Secuencia de cuenta regresiva
        const sequence = [
            { text: translations.countdown3, duration: 1000, sound: true },
            { text: translations.countdown2, duration: 1000, sound: false },
            { text: translations.countdown1, duration: 1000, sound: false },
            { text: translations.countdownPlacote, duration: 800, special: true }
        ];

        for (let i = 0; i < sequence.length; i++) {
            const step = sequence[i];
            
            // Aplicar clase especial para "Placote!"
            if (step.special) {
                countdownText.classList.add('placote');
            } else {
                countdownText.classList.remove('placote');
            }
            
            // Actualizar texto primero
            countdownText.textContent = step.text;
            
            // Reproducir sonido de countdown para los números (solo una vez)
            if (step.sound) {
                console.log('🎵 Llamando sonido para:', step.text);
                this.reproducirSonidoCountdown();
            }
            
            // Esperar la duración especificada
            await new Promise(resolve => setTimeout(resolve, step.duration));
        }

        // Ocultar overlay con animación
        countdownOverlay.classList.remove('show');
        
        // Esperar a que termine la animación de salida
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Ocultar completamente
        countdownOverlay.classList.add('hidden');
        countdownText.classList.remove('placote');
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
                this.actualizarEfectosTemblor();
                this.verificarCompletado();
            });
        });
    }

    /**
     * Actualiza los efectos de temblor según el progreso
     */
    actualizarEfectosTemblor() {
        // Solo aplicar efectos en escritorio
        if (window.innerWidth < 769) return;

        const conceptCards = document.querySelectorAll('.concept-card');
        const completedCards = document.querySelectorAll('.concept-card.completed');
        const completedCount = completedCards.length;

        // Remover todas las clases de temblor
        conceptCards.forEach(card => {
            card.classList.remove('shake-light', 'shake-medium', 'shake-intense');
        });

        // Aplicar efectos según el progreso
        if (completedCount === 2) {
            // Tercer concepto empieza a temblar cuando las tarjetas 1 y 2 están completadas
            const thirdCard = conceptCards[2];
            if (thirdCard && !thirdCard.classList.contains('completed')) {
                thirdCard.classList.add('shake-light');
            }
        }
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
     * Reproduce el sonido de popping
     */
    reproducirSonidoPopping() {
        try {
            const audio = new Audio('assets/sounds/popping.mp3');
            audio.volume = 0.7; // Volumen moderado
            audio.play().catch(error => {
                console.log('No se pudo reproducir el sonido:', error);
            });
        } catch (error) {
            console.log('Error al cargar el sonido:', error);
        }
    }

    /**
     * Reproduce el sonido de countdown (solo una vez por llamada)
     */
    reproducirSonidoCountdown() {
        const now = Date.now();
        console.log('🔊 Reproduciendo sonido countdown - Timestamp:', now);
        
        // Evitar sonidos duplicados en menos de 500ms
        if (now - this.lastSoundTime < 500) {
            console.log('🚫 Sonido bloqueado - muy reciente');
            return;
        }
        
        // Evitar reproducción si ya hay un sonido activo
        if (this.isSoundPlaying) {
            console.log('🚫 Sonido bloqueado - ya se está reproduciendo');
            return;
        }
        
        this.lastSoundTime = now;
        this.isSoundPlaying = true;
        
        try {
            // Detener y limpiar sonido anterior si existe
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
                this.currentAudio = null;
            }
            
            // Crear nuevo sonido con configuración estricta
            this.currentAudio = new Audio('assets/sounds/countdown.wav');
            this.currentAudio.volume = 0.6; // Volumen moderado
            this.currentAudio.loop = false; // Asegurar que no se repita
            this.currentAudio.preload = 'auto'; // Precargar para evitar delays
            
            // Event listener para limpiar cuando termine
            this.currentAudio.addEventListener('ended', () => {
                console.log('🎵 Sonido terminado');
                this.currentAudio = null;
                this.isSoundPlaying = false;
            });
            
            this.currentAudio.play().catch(error => {
                console.log('No se pudo reproducir el sonido de countdown:', error);
                this.isSoundPlaying = false;
            });
        } catch (error) {
            console.log('Error al cargar el sonido de countdown:', error);
            this.isSoundPlaying = false;
        }
    }

    /**
     * Lanza animación de confeti
     */
    lanzarConfeti() {
        if (typeof confetti === 'undefined') return;

        // Reproducir sonido de popping
        this.reproducirSonidoPopping();

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

    /**
     * Configura listener para redimensionamiento de ventana
     */
    setupResizeListener() {
        window.addEventListener('resize', () => {
            // Si cambia a móvil, remover todos los efectos de temblor
            if (window.innerWidth < 769) {
                const conceptCards = document.querySelectorAll('.concept-card');
                conceptCards.forEach(card => {
                    card.classList.remove('shake-light', 'shake-medium', 'shake-intense');
                });
            } else {
                // Si cambia a escritorio, actualizar efectos
                this.actualizarEfectosTemblor();
            }
        });
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
