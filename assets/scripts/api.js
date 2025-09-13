/**
 * API de Datos para Placoteurs
 * Simula consultas a una base de datos para facilitar migración futura a API real
 */

class DataAPI {
    constructor() {
        this.cache = new Map();
        this.baseURL = './assets/db/';
    }

    /**
     * Simula una consulta a la base de datos
     * @param {string} table - Nombre de la tabla/archivo
     * @param {Object} filters - Filtros de consulta
     * @returns {Promise} Datos solicitados
     */
    async query(table, filters = {}) {
        try {
            // Simular delay de red (opcional)
            await this.simulateNetworkDelay();
            
            const data = await this.loadData(table);
            return this.applyFilters(data, filters);
        } catch (error) {
            console.error(`Error en consulta a ${table}:`, error);
            throw new Error(`No se pudieron cargar los datos de ${table}`);
        }
    }

    /**
     * Carga datos desde archivo JSON
     * @param {string} table - Nombre del archivo
     * @returns {Promise} Datos del archivo
     */
    async loadData(table) {
        // Usar cache si está disponible
        if (this.cache.has(table)) {
            return this.cache.get(table);
        }

        try {
            const response = await fetch(`${this.baseURL}${table}.json`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Guardar en cache
            this.cache.set(table, data);
            
            return data;
        } catch (error) {
            console.error(`Error cargando ${table}:`, error);
            throw error;
        }
    }

    /**
     * Aplica filtros a los datos
     * @param {Object} data - Datos originales
     * @param {Object} filters - Filtros a aplicar
     * @returns {Object} Datos filtrados
     */
    applyFilters(data, filters) {
        let result = data;

        // Filtro por idioma
        if (filters.language) {
            result = data[filters.language] || [];
        }

        // Filtro por cantidad (para obtener elementos aleatorios)
        if (filters.limit && Array.isArray(result)) {
            result = this.getRandomElementsFromArray(result, filters.limit);
        }

        return result;
    }

    /**
     * Obtiene elementos aleatorios de un array
     * @param {Array} array - Array original
     * @param {number} count - Cantidad de elementos
     * @returns {Array} Elementos aleatorios únicos
     */
    getRandomElementsFromArray(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    /**
     * Simula delay de red (opcional para testing)
     * @param {number} ms - Milisegundos de delay
     */
    async simulateNetworkDelay(ms = 100) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Limpia el cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Obtiene un elemento aleatorio de una tabla
     * @param {string} table - Nombre de la tabla
     * @param {string} language - Idioma
     * @returns {Promise} Elemento aleatorio
     */
    async getRandomElement(table, language) {
        const data = await this.query(table, { language });
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error(`No hay datos disponibles para ${table} en ${language}`);
        }
        return data[Math.floor(Math.random() * data.length)];
    }

    /**
     * Obtiene múltiples elementos aleatorios únicos
     * @param {string} table - Nombre de la tabla
     * @param {string} language - Idioma
     * @param {number} count - Cantidad de elementos
     * @returns {Promise} Array de elementos únicos
     */
    async getRandomElements(table, language, count) {
        const data = await this.query(table, { language });
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error(`No hay datos disponibles para ${table} en ${language}`);
        }
        return this.getRandomElementsFromArray(data, count);
    }

    /**
     * Obtiene todas las traducciones para un idioma
     * @param {string} language - Idioma
     * @returns {Promise} Objeto con traducciones
     */
    async getTranslations(language) {
        const data = await this.query('traducciones');
        return data[language] || {};
    }
}

// Instancia global de la API
const dataAPI = new DataAPI();

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataAPI;
}
