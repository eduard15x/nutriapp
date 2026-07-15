/**
 * UIManager module for rendering and managing UI components
 */
class UIManager {
  /**
   * Initializes UIManager and caches DOM elements
   */
  constructor() {
    this.elements = {};
    this.cacheElements();
  }

  /**
   * Caches commonly used DOM elements
   */
  cacheElements() {
    this.elements.optionCards = document.querySelectorAll('.option-card');
  }

  /**
   * Renders a list of foods as HTML
   * @param {Array} foods - Array of food items to render
   * @returns {string} HTML string representing foods list
   */
  renderFoodsList(foods) {
    if (!foods || foods.length === 0) {
      return '<p>No foods found.</p>';
    }

    return foods.map(food => `
      <div class="card" style="margin-bottom: var(--spacing-lg);">
        <h3>${this.escapeHtml(food.name)}</h3>
        <span class="badge badge-primary">${this.escapeHtml(food.category)}</span>
        <p style="margin-top: var(--spacing-md); margin-bottom: 0;">
          <strong>Serving Options:</strong>
        </p>
        <ul style="margin-left: var(--spacing-lg); margin-top: var(--spacing-sm);">
          ${food.servings.map(serving => `
            <li>
              ${this.escapeHtml(serving.unit)}: ${serving.calories} cal |
              P: ${serving.proteins}g |
              F: ${serving.fats}g |
              C: ${serving.carbs}g
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  /**
   * Renders nutrition information
   * @param {Object} nutrition - Nutrition data object
   * @returns {string} HTML string with nutrition information
   */
  renderNutritionInfo(nutrition) {
    if (!nutrition) return '<p>No nutrition info available.</p>';

    return `
      <div class="card">
        <h3>Nutritional Information</h3>
        <div class="grid">
          <div style="text-align: center;">
            <h4 style="color: var(--color-secondary); margin-bottom: var(--spacing-sm);">
              ${nutrition.calories}
            </h4>
            <p style="margin-bottom: 0;">Calories</p>
          </div>
          <div style="text-align: center;">
            <h4 style="color: var(--color-accent-green); margin-bottom: var(--spacing-sm);">
              ${nutrition.proteins}g
            </h4>
            <p style="margin-bottom: 0;">Proteins</p>
          </div>
          <div style="text-align: center;">
            <h4 style="color: var(--color-accent-yellow); margin-bottom: var(--spacing-sm);">
              ${nutrition.fats}g
            </h4>
            <p style="margin-bottom: 0;">Fats</p>
          </div>
          <div style="text-align: center;">
            <h4 style="color: var(--color-accent-sky); margin-bottom: var(--spacing-sm);">
              ${nutrition.carbs}g
            </h4>
            <p style="margin-bottom: 0;">Carbs</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Shows a loading spinner in the specified element
   * @param {HTMLElement} element - Element to show spinner in
   */
  showLoading(element) {
    element.innerHTML = '<div class="spinner" style="margin: var(--spacing-xl) auto;"></div>';
  }

  /**
   * Shows an error message in the specified element
   * @param {HTMLElement} element - Element to show error in
   * @param {string} [message='An error occurred. Please try again.'] - Error message
   */
  showError(element, message = 'An error occurred. Please try again.') {
    element.innerHTML = `<div class="alert alert-error">${this.escapeHtml(message)}</div>`;
  }

  /**
   * Clears all content from the specified element
   * @param {HTMLElement} element - Element to clear
   */
  clearElement(element) {
    element.innerHTML = '';
  }

  /**
   * Escapes HTML special characters to prevent XSS attacks
   * @param {string} text - Text to escape
   * @returns {string} Escaped text safe for HTML
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, (char) => map[char]);
  }
}

const uiManager = new UIManager();
