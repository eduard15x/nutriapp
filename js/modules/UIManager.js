class UIManager {
  constructor() {
    this.elements = {};
    this.cacheElements();
  }

  cacheElements() {
    this.elements.optionCards = document.querySelectorAll('.option-card');
  }

  renderFoodsList(foods) {
    if (!foods || foods.length === 0) {
      return '<p>No foods found.</p>';
    }

    return foods.map(food => `
      <div class="card" style="margin-bottom: var(--spacing-lg);">
        <h3>${food.name}</h3>
        <span class="badge badge-primary">${food.category}</span>
        <p style="margin-top: var(--spacing-md); margin-bottom: 0;">
          <strong>Serving Options:</strong>
        </p>
        <ul style="margin-left: var(--spacing-lg); margin-top: var(--spacing-sm);">
          ${food.servings.map(serving => `
            <li>
              ${serving.unit}: ${serving.calories} cal |
              P: ${serving.proteins}g |
              F: ${serving.fats}g |
              C: ${serving.carbs}g
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

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

  showLoading(element) {
    element.innerHTML = '<div class="spinner" style="margin: var(--spacing-xl) auto;"></div>';
  }

  showError(element, message = 'An error occurred. Please try again.') {
    element.innerHTML = `<div class="alert alert-error">${message}</div>`;
  }

  clearElement(element) {
    element.innerHTML = '';
  }
}

const uiManager = new UIManager();
