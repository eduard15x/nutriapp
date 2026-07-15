document.addEventListener('DOMContentLoaded', async () => {
  await initializeApp();
});

/**
 * Initializes the application
 */
async function initializeApp() {
  try {
    if (!dataManager) {
      throw new Error('DataManager module not found');
    }
    if (!i18n) {
      throw new Error('i18n module not found');
    }

    await dataManager.loadFoods();

    initializeLanguage();
    attachEventListeners();
  } catch (error) {
    console.error('NutriApp - Initialization error:', error);
  }
}

/**
 * Initializes language settings and language switcher
 */
function initializeLanguage() {
  updatePageLanguage();

  const langDropdown = document.getElementById('language-switcher');
  if (langDropdown) {
    langDropdown.value = i18n.getLanguage();
    langDropdown.addEventListener('change', (e) => {
      const lang = e.target.value;
      i18n.setLanguage(lang);
      updatePageLanguage();
      langDropdown.value = lang;
      // Reload modal if food details is open
      const foodDetailsModal = document.getElementById('fooddetails-modal');
      if (foodDetailsModal && foodDetailsModal.classList.contains('active')) {
        loadFoodDetailsModal();
      }
    });
  }
}

/**
 * Updates all page text content based on current language
 */
function updatePageLanguage() {
  // Header & Navigation
  const updateElement = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = i18n.t(key);
  };

  updateElement('app-title', 'appTitle');
  updateElement('app-subtitle', 'appSubtitle');

  // Hero Section
  updateElement('welcome-text', 'welcome');
  updateElement('choose-text', 'chooseOption');

  // Option Cards
  updateElement('recipes-title', 'recipes');
  updateElement('recipes-desc', 'recipesDesc');
  updateElement('recipes-btn', 'exploreRecipes');

  updateElement('calculator-title', 'caloriesCalculator');
  updateElement('calculator-desc', 'caloriesCalcDesc');
  updateElement('calculator-btn', 'calculateNow');

  updateElement('practices-title', 'bestPractices');
  updateElement('practices-desc', 'bestPracticesDesc');
  updateElement('practices-btn', 'learnMore');

  updateElement('fooddetails-title', 'foodDetails');
  updateElement('fooddetails-desc', 'foodDetailsDesc');
  updateElement('fooddetails-btn', 'exploreFoods');

  // Modal Titles
  updateElement('recipes-modal-title', 'recipesModalTitle');
  updateElement('calculator-modal-title', 'caloriesModalTitle');
  updateElement('practices-modal-title', 'bestPracticesModalTitle');
  updateElement('fooddetails-modal-title', 'foodDetailsModalTitle');

  // Footer
  updateElement('footer-text', 'copyright');
}

/**
 * Attaches global event listeners
 */
function attachEventListeners() {
  document.addEventListener('modalOpened', handleModalOpened);
  document.addEventListener('modalClosed', handleModalClosed);
}

/**
 * Handles modal opened events
 * @param {Event} event - Custom modal event
 */
function handleModalOpened(event) {
  const { modalId } = event.detail;

  switch (modalId) {
    case 'recipes':
      loadRecipesModal();
      break;
    case 'calculator':
      loadCalculatorModal();
      break;
    case 'practices':
      loadBestPracticesModal();
      break;
    case 'fooddetails':
      loadFoodDetailsModal();
      break;
  }
}

/**
 * Handles modal closed events
 * @param {Event} event - Custom modal event
 */
function handleModalClosed(event) {
  // Cleanup handled per-modal
}

/**
 * Loads and renders recipes modal content
 */
function loadRecipesModal() {
  const contentArea = document.getElementById('recipes-content');
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-info';
  alertDiv.textContent = i18n.t('mockRecipesWarning');
  contentArea.innerHTML = '';
  contentArea.appendChild(alertDiv);
}

/**
 * Loads and renders calculator modal content
 */
function loadCalculatorModal() {
  if (!calculator) {
    console.error('Calculator module not found');
    return;
  }

  const contentArea = document.getElementById('calculator-content');
  const userData = calculator.getUserData();

  contentArea.innerHTML = `
    <form id="calculator-form">
      <div class="input-group">
        <label for="weight" id="label-weight">${i18n.t('weight')}</label>
        <input type="number" id="weight" name="weight" min="30" max="200" value="${userData.weight}" required>
      </div>

      <div class="input-group">
        <label for="height" id="label-height">${i18n.t('height')}</label>
        <input type="number" id="height" name="height" min="140" max="220" value="${userData.height}" required>
      </div>

      <div class="input-group">
        <label for="age" id="label-age">${i18n.t('age')}</label>
        <input type="number" id="age" name="age" min="16" max="100" value="${userData.age}" required>
      </div>

      <div class="input-group">
        <label for="gender" id="label-gender">${i18n.t('gender')}</label>
        <select id="gender" name="gender" required>
          <option value="male" ${userData.gender === 'male' ? 'selected' : ''}>${i18n.t('male')}</option>
          <option value="female" ${userData.gender === 'female' ? 'selected' : ''}>${i18n.t('female')}</option>
        </select>
      </div>

      <div class="input-group">
        <label for="activity" id="label-activity">${i18n.t('activityLevel')}</label>
        <select id="activity" name="activity" required>
          <option value="1.2" ${userData.activityLevel === 1.2 ? 'selected' : ''}>${i18n.t('sedentary')}</option>
          <option value="1.375" ${userData.activityLevel === 1.375 ? 'selected' : ''}>${i18n.t('lightlyActive')}</option>
          <option value="1.55" ${userData.activityLevel === 1.55 ? 'selected' : ''}>${i18n.t('moderatelyActive')}</option>
          <option value="1.725" ${userData.activityLevel === 1.725 ? 'selected' : ''}>${i18n.t('veryActive')}</option>
          <option value="1.9" ${userData.activityLevel === 1.9 ? 'selected' : ''}>${i18n.t('extremelyActive')}</option>
        </select>
      </div>

      <div class="input-group">
        <label for="goal" id="label-goal">${i18n.t('goal')}</label>
        <select id="goal" name="goal" required>
          <option value="maintain" ${userData.goal === 'maintain' ? 'selected' : ''}>${i18n.t('maintain')}</option>
          <option value="bulk" ${userData.goal === 'bulk' ? 'selected' : ''}>${i18n.t('bulk')}</option>
          <option value="cut" ${userData.goal === 'cut' ? 'selected' : ''}>${i18n.t('cut')}</option>
          <option value="shred" ${userData.goal === 'shred' ? 'selected' : ''}>${i18n.t('shred')}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">
        ${i18n.t('calculateMacros')}
      </button>
    </form>

    <div id="calculator-results"></div>
  `;

  const formElement = document.getElementById('calculator-form');
  if (formElement) {
    formElement.removeEventListener('submit', handleCalculatorSubmit);
    formElement.addEventListener('submit', handleCalculatorSubmit);
  }
}

/**
 * Handles calculator form submission
 * @param {Event} e - Form submission event
 */
function handleCalculatorSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const weight = parseFloat(formData.get('weight'));
  const height = parseFloat(formData.get('height'));
  const age = parseInt(formData.get('age'));
  const gender = formData.get('gender');
  const activityLevel = parseFloat(formData.get('activity'));
  const goal = formData.get('goal');

  // Validate inputs
  if (isNaN(weight) || weight < 30 || weight > 200) {
    console.error('Invalid weight value');
    return;
  }
  if (isNaN(height) || height < 140 || height > 220) {
    console.error('Invalid height value');
    return;
  }
  if (isNaN(age) || age < 16 || age > 100) {
    console.error('Invalid age value');
    return;
  }

  // Save to localStorage
  calculator.saveData({ weight, height, age, gender, activityLevel, goal });

  const results = calculator.calculateDaily(weight, height, age, gender, activityLevel, goal);

  const resultsDiv = document.getElementById('calculator-results');
  resultsDiv.innerHTML = `
    <div class="results-container">
      <h3>${i18n.t('yourDailyPlan')}</h3>

      <div class="results-info">
        <p><strong>${i18n.t('goal')}:</strong> ${escapeHtml(calculator.getGoalDescription(goal))}</p>
        <p><strong>${i18n.t('activityLevel')}:</strong> ${escapeHtml(calculator.getActivityLevelText(activityLevel))}</p>
      </div>

      <div class="results-grid">
        <div class="result-card">
          <h4 style="color: var(--color-secondary);">${results.calories}</h4>
          <p>${i18n.t('dailyCalories')}</p>
        </div>

        <div class="result-card">
          <h4 style="color: var(--color-accent-green);">${results.proteins}g</h4>
          <p>${i18n.t('proteins')}</p>
        </div>

        <div class="result-card">
          <h4 style="color: var(--color-accent-yellow);">${results.fats}g</h4>
          <p>${i18n.t('fats')}</p>
        </div>

        <div class="result-card">
          <h4 style="color: var(--color-accent-sky);">${results.carbs}g</h4>
          <p>${i18n.t('carbs')}</p>
        </div>
      </div>

      <div class="results-info" style="border-left: 4px solid var(--color-primary); padding-left: var(--spacing-md);">
        <p style="margin-bottom: var(--spacing-xs);"><strong>${i18n.t('bmr')}:</strong> ${results.bmr} ${i18n.t('caloriesPerDay')}</p>
        <p style="margin-bottom: 0;"><strong>${i18n.t('tdee')}:</strong> ${results.tdee} ${i18n.t('caloriesPerDay')}</p>
      </div>
    </div>
  `;
}

/**
 * Loads and renders best practices modal content
 */
function loadBestPracticesModal() {
  const contentArea = document.getElementById('practices-content');
  const practices = [
    { titleKey: 'hydration', descKey: 'hydrationDesc' },
    { titleKey: 'sleep', descKey: 'sleepDesc' },
    { titleKey: 'exercise', descKey: 'exerciseDesc' },
    { titleKey: 'wholefoods', descKey: 'wholefoodsDesc' },
    { titleKey: 'trackProgress', descKey: 'trackProgressDesc' }
  ];

  const practicesList = document.createElement('div');
  practicesList.className = 'practices-list';

  practices.forEach(practice => {
    const card = document.createElement('div');
    card.className = 'content-card';

    const title = document.createElement('h3');
    title.textContent = i18n.t(practice.titleKey);

    const desc = document.createElement('p');
    desc.textContent = i18n.t(practice.descKey);

    card.appendChild(title);
    card.appendChild(desc);
    practicesList.appendChild(card);
  });

  contentArea.innerHTML = '';
  contentArea.appendChild(practicesList);
}

/**
 * Loads and renders food details modal content
 */
function loadFoodDetailsModal() {
  if (!dataManager) {
    console.error('DataManager module not found');
    return;
  }

  const contentArea = document.getElementById('fooddetails-content');
  const foods = dataManager.getFoods();

  const container = document.createElement('div');
  container.className = 'food-details-container';

  const searchBox = document.createElement('div');
  searchBox.className = 'food-search-box';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'food-search';
  searchInput.className = 'food-search-input';
  searchInput.placeholder = i18n.t('foodName') + '...';
  searchInput.setAttribute('aria-label', i18n.t('foodName'));

  searchBox.appendChild(searchInput);

  const foodsList = document.createElement('div');
  foodsList.className = 'foods-list';
  foodsList.id = 'foods-list';

  foods.forEach(food => {
    const foodItem = document.createElement('div');
    foodItem.className = 'food-item-compact';
    // Store both language names for bilingual search
    foodItem.dataset.foodName = food.name.toLowerCase();
    foodItem.dataset.foodNameRo = (food.nameRo || '').toLowerCase();

    // Header with food name and category
    const header = document.createElement('div');
    header.className = 'food-item-header';

    const nameEl = document.createElement('h4');
    // Display food name in current language
    const currentLang = i18n.getLanguage();
    nameEl.textContent = currentLang === 'ro' && food.nameRo ? food.nameRo : food.name;

    const categoryEl = document.createElement('span');
    categoryEl.className = 'food-category';
    // Translate category based on food category
    const categoryKey = `category${food.category.charAt(0).toUpperCase() + food.category.slice(1)}`;
    categoryEl.textContent = i18n.t(categoryKey) || food.category;

    header.appendChild(nameEl);
    header.appendChild(categoryEl);

    // Nutrition per 100g (compact)
    foodItem.appendChild(header);

    if (food.servings && food.servings.length > 0) {
      // Find 100g serving or use first serving
      const per100g = food.servings.find(s => s.unit.includes('100g')) || food.servings[0];

      const nutrition = document.createElement('div');
      nutrition.className = 'food-nutrition-compact';

      const calVal = typeof per100g.calories === 'number' ? per100g.calories : 0;
      const proVal = typeof per100g.proteins === 'number' ? per100g.proteins.toFixed(1) : 0;
      const fatVal = typeof per100g.fats === 'number' ? per100g.fats.toFixed(1) : 0;
      const carbVal = typeof per100g.carbs === 'number' ? per100g.carbs.toFixed(1) : 0;

      const per100gLabel = i18n.t('per100g');
      nutrition.innerHTML = `<span class="nutrition-label">${per100gLabel}:</span> ${calVal}${i18n.t('calories_short')} | ${i18n.t('proteins_short')}: ${proVal}g | ${i18n.t('fats_short')}: ${fatVal}g | ${i18n.t('carbs_short')}: ${carbVal}g`;
      foodItem.appendChild(nutrition);
    }

    foodsList.appendChild(foodItem);
  });

  container.appendChild(searchBox);
  container.appendChild(foodsList);

  contentArea.innerHTML = '';
  contentArea.appendChild(container);

  // Add search functionality with proper cleanup
  const foodItems = document.querySelectorAll('.food-item-compact');

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    foodItems.forEach(item => {
      const foodNameEn = item.dataset.foodName;
      const foodNameRo = item.dataset.foodNameRo;
      // Search in both English and Romanian names
      const matches = foodNameEn.includes(query) || foodNameRo.includes(query);
      item.style.display = matches ? 'block' : 'none';
    });
  };

  // Remove previous listener before adding new one
  searchInput.removeEventListener('input', handleSearch);
  searchInput.addEventListener('input', handleSearch);
}

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text safe for HTML
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, (char) => map[char]);
}
