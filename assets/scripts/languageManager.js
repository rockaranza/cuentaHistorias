/**
 * Gestor de Idiomas para Placoteurs
 * Maneja la lógica de selección, cambio y aplicación de idiomas
 */

class LanguageManager {
    constructor() {
        this.currentLanguage = 'español';
        this.availableLanguages = ['español', 'francés', 'english'];
        this.translations = {};
        this.isInitialized = false;
        
        // Referencias DOM
        this.elements = {
            languageSelector: null,
            languageDropdown: null
        };
    }

    /**
     * Inicializa el gestor de idiomas
     */
    async init() {
        try {
            await this.loadAllTranslations();
            this.initializeLanguageSelector();
            this.detectBrowserLanguage();
            this.isInitialized = true;
            
            // Aplicar idioma inicial
            await this.applyLanguage(this.currentLanguage);
            
            // Actualizar botón según dispositivo
            this.updateLanguageButton();
            
            // Ya no necesitamos listener de resize porque el formato es el mismo para todas las vistas
            
            console.log('✅ LanguageManager inicializado correctamente');
        } catch (error) {
            console.error('❌ Error inicializando LanguageManager:', error);
        }
    }

    /**
     * Detecta si es dispositivo móvil
     */
    isMobile() {
        return window.innerWidth <= 768;
    }

    /**
     * Actualiza el botón de idioma - formato compacto para todas las vistas
     */
    updateLanguageButton() {
        const languageBtn = document.getElementById('languageDropdown');
        if (!languageBtn) return;

        const siglas = {
            'español': 'ES',
            'francés': 'FR', 
            'english': 'EN'
        };

        // Formato compacto para todas las vistas: Bandera + Sigla
        languageBtn.innerHTML = `
            <span class="language-flag">${this.getLanguageFlag(this.currentLanguage)}</span>
            <span class="language-code">${siglas[this.currentLanguage] || 'ES'}</span>
        `;
    }

    /**
     * Carga todas las traducciones de la API
     */
    async loadAllTranslations() {
        try {
            const [spanishTranslations, frenchTranslations, englishTranslations] = await Promise.all([
                dataAPI.getTranslations('español'),
                dataAPI.getTranslations('francés'),
                dataAPI.getTranslations('english')
            ]);

            this.translations = {
                español: spanishTranslations,
                francés: frenchTranslations,
                english: englishTranslations
            };
        } catch (error) {
            console.error('Error cargando traducciones:', error);
            // Fallback a traducciones básicas
            this.translations = {
                español: { titulo: '📚 CuentaHistorias', error: 'Error al cargar traducciones' },
                francés: { titulo: '📚 CompteHistoires', error: 'Erreur de chargement' },
                english: { titulo: '📚 StoryTeller', error: 'Translation loading error' }
            };
        }
    }

    /**
     * Inicializa el selector de idioma en el DOM
     */
    initializeLanguageSelector() {
        // Buscar el selector existente
        this.elements.languageSelector = document.getElementById('languageToggle');
        
        if (this.elements.languageSelector) {
            // Reemplazar el botón simple por un dropdown
            this.createLanguageDropdown();
        }
    }

    /**
     * Crea el dropdown de selección de idioma
     */
    createLanguageDropdown() {
        const container = this.elements.languageSelector.parentNode;
        
        // Formato compacto: Bandera + Sigla para todas las vistas
        const siglas = {
            'español': 'ES',
            'francés': 'FR', 
            'english': 'EN'
        };
        
        const buttonContent = `
            <span class="language-flag">${this.getLanguageFlag(this.currentLanguage)}</span>
            <span class="language-code">${siglas[this.currentLanguage] || 'ES'}</span>
        `;
        
        // Crear el nuevo dropdown
        const dropdownHTML = `
            <div class="language-selector">
                <button class="language-toggle" id="languageDropdown">
                    ${buttonContent}
                </button>
                <div class="language-options hidden" id="languageOptions">
                    ${this.availableLanguages.map(lang => {
                        const siglas = {
                            'español': 'ES',
                            'francés': 'FR', 
                            'english': 'EN'
                        };
                        return `
                        <div class="language-option ${lang === this.currentLanguage ? 'active' : ''}" 
                             data-language="${lang}">
                            <span class="language-flag">${this.getLanguageFlag(lang)}</span>
                            <span class="language-code">${siglas[lang] || 'ES'}</span>
                        </div>
                    `;
                    }).join('')}
                </div>
            </div>
        `;

        // Reemplazar el botón original
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = dropdownHTML;
        const newElement = tempDiv.firstElementChild;
        
        container.replaceChild(newElement, this.elements.languageSelector);
        
        // Actualizar referencias
        this.elements.languageSelector = newElement;
        this.elements.languageDropdown = document.getElementById('languageDropdown');
        
        // Configurar event listeners
        this.setupLanguageEvents();
    }

    /**
     * Configura los event listeners para el selector de idioma
     */
    setupLanguageEvents() {
        const dropdown = this.elements.languageDropdown;
        const options = document.getElementById('languageOptions');
        
        if (!dropdown || !options) return;

        // Toggle dropdown
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            options.classList.toggle('hidden');
            dropdown.classList.toggle('active');
        });

        // Selección de idioma
        options.addEventListener('click', (e) => {
            const option = e.target.closest('.language-option');
            if (option) {
                const selectedLanguage = option.dataset.language;
                this.changeLanguage(selectedLanguage);
                options.classList.add('hidden');
                dropdown.classList.remove('active');
            }
        });

        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', () => {
            options.classList.add('hidden');
            dropdown.classList.remove('active');
        });
    }

    /**
     * Detecta el idioma del navegador y lo establece si está disponible
     */
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        
        const languageMap = {
            'es': 'español',
            'es-ES': 'español',
            'fr': 'francés',
            'fr-FR': 'francés',
            'en': 'english',
            'en-US': 'english',
            'en-GB': 'english'
        };

        const detectedLanguage = languageMap[browserLang] || languageMap[browserLang.split('-')[0]];
        
        if (detectedLanguage && this.availableLanguages.includes(detectedLanguage)) {
            this.currentLanguage = detectedLanguage;
        }
    }

    /**
     * Cambia el idioma actual
     */
    async changeLanguage(newLanguage) {
        if (!this.availableLanguages.includes(newLanguage)) {
            console.warn(`Idioma no disponible: ${newLanguage}`);
            return;
        }

        const oldLanguage = this.currentLanguage;
        this.currentLanguage = newLanguage;

        try {
            await this.applyLanguage(newLanguage);
            this.updateLanguageSelector();
            this.updateLanguageButton();
            
            // Emitir evento personalizado
            this.emitLanguageChangeEvent(oldLanguage, newLanguage);
            
        } catch (error) {
            console.error('Error cambiando idioma:', error);
            // Revertir en caso de error
            this.currentLanguage = oldLanguage;
        }
    }

    /**
     * Aplica las traducciones del idioma seleccionado
     */
    async applyLanguage(language) {
        const t = this.translations[language];
        if (!t) {
            console.warn(`Traducciones no encontradas para: ${language}`);
            return;
        }

        try {
            // Hero section
            const heroTitle = document.querySelector('.title-main');
            if (heroTitle) heroTitle.textContent = t.titulo;

            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) heroSubtitle.textContent = t.subtitulo;

            // Tips rápidos
            const tipTexts = document.querySelectorAll('.tip-text');
            if (tipTexts.length >= 3) {
                tipTexts[0].textContent = t.instruccion1;
                tipTexts[1].textContent = t.instruccion2;
                tipTexts[2].textContent = t.instruccion3;
            }

            // Botón de jugar
            const playBtn = document.getElementById('playBtn');
            if (playBtn) playBtn.textContent = t.botonJugar;

            // Contenido dinámico
            const conceptsTitle = document.querySelector('.concepts-title');
            if (conceptsTitle) conceptsTitle.textContent = t.tusConceptos;

            // Footer
            const footerText = document.querySelector('.developer-credit p');
            if (footerText) {
                footerText.innerHTML = t.footer;
            }

            // Traducciones para página About
            this.translateAboutPage(t);

        } catch (error) {
            console.error('Error aplicando traducciones:', error);
        }
    }

    /**
     * Traduce todos los elementos de la página About
     */
    translateAboutPage(t) {
        // Título de la página about
        const aboutTitle = document.querySelector('.title-main');
        if (aboutTitle && window.location.pathname.includes('about.html')) {
            aboutTitle.textContent = 'Sobre Placoteurs';
        }

        // Subtítulo de about
        const aboutSubtitle = document.querySelector('[data-translate="aboutSubtitle"]');
        if (aboutSubtitle) aboutSubtitle.textContent = t.aboutSubtitle;

        // Títulos de secciones
        const aboutTitleH2 = document.querySelector('[data-translate="aboutTitle"]');
        if (aboutTitleH2) aboutTitleH2.textContent = t.aboutTitle;

        const aboutHowItWorks = document.querySelector('[data-translate="aboutHowItWorks"]');
        if (aboutHowItWorks) aboutHowItWorks.textContent = t.aboutHowItWorks;

        const contactTitle = document.querySelector('[data-translate="contactTitle"]');
        if (contactTitle) contactTitle.textContent = t.contactTitle;

        const supportTitle = document.querySelector('[data-translate="supportTitle"]');
        if (supportTitle) supportTitle.textContent = t.supportTitle;

        const otherProjectsTitle = document.querySelector('[data-translate="otherProjectsTitle"]');
        if (otherProjectsTitle) otherProjectsTitle.textContent = t.otherProjectsTitle;

        // Descripciones
        const aboutDesc1 = document.querySelector('[data-translate="aboutDescription1"]');
        if (aboutDesc1) aboutDesc1.textContent = t.aboutDescription1;

        const aboutDesc2 = document.querySelector('[data-translate="aboutDescription2"]');
        if (aboutDesc2) aboutDesc2.textContent = t.aboutDescription2;

        const contactDesc = document.querySelector('[data-translate="contactDescription"]');
        if (contactDesc) contactDesc.textContent = t.contactDescription;

        const supportDesc = document.querySelector('[data-translate="supportDescription"]');
        if (supportDesc) supportDesc.textContent = t.supportDescription;

        const otherProjectsDesc = document.querySelector('[data-translate="otherProjectsDescription"]');
        if (otherProjectsDesc) otherProjectsDesc.textContent = t.otherProjectsDescription;

        // Pasos del proceso
        const step1 = document.querySelector('[data-translate="step1"]');
        if (step1) step1.textContent = t.step1;

        const step2 = document.querySelector('[data-translate="step2"]');
        if (step2) step2.textContent = t.step2;

        const step3 = document.querySelector('[data-translate="step3"]');
        if (step3) step3.textContent = t.step3;

        // Formulario de contacto
        const contactName = document.querySelector('[data-translate="contactName"]');
        if (contactName) contactName.textContent = t.contactName;

        const contactEmail = document.querySelector('[data-translate="contactEmail"]');
        if (contactEmail) contactEmail.textContent = t.contactEmail;

        const contactSubject = document.querySelector('[data-translate="contactSubject"]');
        if (contactSubject) contactSubject.textContent = t.contactSubject;

        const contactMessage = document.querySelector('[data-translate="contactMessage"]');
        if (contactMessage) contactMessage.textContent = t.contactMessage;

        const sendMessage = document.querySelector('[data-translate="sendMessage"]');
        if (sendMessage) sendMessage.textContent = t.sendMessage;

        // Placeholder del textarea
        const contactMessagePlaceholder = document.querySelector('[data-translate="contactMessagePlaceholder"]');
        if (contactMessagePlaceholder) {
            contactMessagePlaceholder.placeholder = t.contactMessagePlaceholder;
        }

        // Opciones del select
        const selectSubject = document.querySelector('[data-translate="selectSubject"]');
        if (selectSubject) selectSubject.textContent = t.selectSubject;

        const feedback = document.querySelector('[data-translate="feedback"]');
        if (feedback) feedback.textContent = t.feedback;

        const bugReport = document.querySelector('[data-translate="bugReport"]');
        if (bugReport) bugReport.textContent = t.bugReport;

        const contribution = document.querySelector('[data-translate="contribution"]');
        if (contribution) contribution.textContent = t.contribution;

        const other = document.querySelector('[data-translate="other"]');
        if (other) other.textContent = t.other;

        // Botón de regreso
        const backToApp = document.querySelector('[data-translate="backToApp"]');
        if (backToApp) backToApp.textContent = t.backToApp;

        // Botón about en la página principal
        const aboutButton = document.querySelector('[data-translate="aboutButton"]');
        if (aboutButton) aboutButton.textContent = t.aboutButton;

        // Botón "Invítame un café"
        const coffeeButtons = document.querySelectorAll('[data-translate="buyMeCoffee"]');
        coffeeButtons.forEach(button => {
            button.textContent = t.buyMeCoffee;
        });

        // Mensajes del formulario (se actualizan dinámicamente cuando se necesitan)
        // No necesitamos traducir estos aquí porque se obtienen dinámicamente en el JavaScript del formulario
    }

    /**
     * Actualiza el selector de idioma con el idioma actual
     */
    updateLanguageSelector() {
        if (!this.elements.languageSelector) return;

        const currentLangSpan = this.elements.languageSelector.querySelector('.current-language');
        if (currentLangSpan) {
            currentLangSpan.innerHTML = `
                <span class="language-flag">${this.getLanguageFlag(this.currentLanguage)}</span>
                <span class="language-name">${this.getLanguageName(this.currentLanguage)}</span>
            `;
        }

        // Actualizar opciones activas
        const options = document.querySelectorAll('.language-option');
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.language === this.currentLanguage);
        });
    }

    /**
     * Obtiene la bandera emoji para un idioma
     */
    getLanguageFlag(language) {
        const flags = {
            español: '🇪🇸',
            francés: '🇫🇷',
            english: '🇺🇸'
        };
        return flags[language] || '🌐';
    }

    /**
     * Obtiene el nombre del idioma
     */
    getLanguageName(language) {
        const names = {
            español: 'Español',
            francés: 'Français',
            english: 'English'
        };
        return names[language] || language;
    }

    /**
     * Emite un evento personalizado cuando cambia el idioma
     */
    emitLanguageChangeEvent(oldLanguage, newLanguage) {
        const event = new CustomEvent('languageChanged', {
            detail: {
                oldLanguage,
                newLanguage,
                translations: this.translations[newLanguage]
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Obtiene las traducciones del idioma actual
     */
    getCurrentTranslations() {
        return this.translations[this.currentLanguage] || {};
    }

    /**
     * Obtiene el idioma actual
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Verifica si el gestor está inicializado
     */
    isReady() {
        return this.isInitialized;
    }
}

// Instancia global del gestor de idiomas
const languageManager = new LanguageManager();

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}
