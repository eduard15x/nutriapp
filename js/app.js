document.addEventListener('DOMContentLoaded', async () => {
  await initializeApp();
});

async function initializeApp() {
  console.log('NutriApp - Initializing...');

  try {
    await dataManager.loadFoods();
    console.log('NutriApp - Foods loaded:', dataManager.getFoods().length);

    initializeLanguage();
    attachEventListeners();
    console.log('NutriApp - Ready!');
  } catch (error) {
    console.error('NutriApp - Initialization error:', error);
  }
}

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
    });
  }
}

function updatePageLanguage() {
  // Header & Navigation
  document.getElementById('app-title').textContent = i18n.t('appTitle');
  document.getElementById('app-subtitle').textContent = i18n.t('appSubtitle');

  // Hero Section
  document.getElementById('welcome-text').textContent = i18n.t('welcome');
  document.getElementById('choose-text').textContent = i18n.t('chooseOption');

  // Option Cards
  document.getElementById('recipes-title').textContent = i18n.t('recipes');
  document.getElementById('recipes-desc').textContent = i18n.t('recipesDesc');
  document.getElementById('recipes-btn').textContent = i18n.t('exploreRecipes');

  document.getElementById('calculator-title').textContent = i18n.t('caloriesCalculator');
  document.getElementById('calculator-desc').textContent = i18n.t('caloriesCalcDesc');
  document.getElementById('calculator-btn').textContent = i18n.t('calculateNow');

  document.getElementById('practices-title').textContent = i18n.t('bestPractices');
  document.getElementById('practices-desc').textContent = i18n.t('bestPracticesDesc');
  document.getElementById('practices-btn').textContent = i18n.t('learnMore');

  document.getElementById('fooddetails-title').textContent = i18n.t('foodDetails');
  document.getElementById('fooddetails-desc').textContent = i18n.t('foodDetailsDesc');
  document.getElementById('fooddetails-btn').textContent = i18n.t('exploreFoods');

  // Footer
  document.getElementById('footer-text').textContent = i18n.t('copyright');
}

function attachEventListeners() {
  document.addEventListener('modalOpened', handleModalOpened);
  document.addEventListener('modalClosed', handleModalClosed);
}

function handleModalOpened(event) {
  const { modalId } = event.detail;
  console.log('Modal opened:', modalId);

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

function handleModalClosed(event) {
  const { modalId } = event.detail;
  console.log('Modal closed:', modalId);
}

function loadRecipesModal() {
  const contentArea = document.getElementById('recipes-content');
  contentArea.innerHTML = `
    <div class="alert alert-info">
      ${i18n.t('mockRecipesWarning')}
    </div>
  `;
}

function loadCalculatorModal() {
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

  document.getElementById('calculator-form').addEventListener('submit', handleCalculatorSubmit);
}

function handleCalculatorSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const weight = parseFloat(formData.get('weight'));
  const height = parseFloat(formData.get('height'));
  const age = parseInt(formData.get('age'));
  const gender = formData.get('gender');
  const activityLevel = parseFloat(formData.get('activity'));
  const goal = formData.get('goal');

  // Save to localStorage
  calculator.saveData({ weight, height, age, gender, activityLevel, goal });

  const results = calculator.calculateDaily(weight, height, age, gender, activityLevel, goal);

  const resultsDiv = document.getElementById('calculator-results');
  resultsDiv.innerHTML = `
    <div class="results-container">
      <h3>${i18n.t('yourDailyPlan')}</h3>

      <div class="results-info">
        <p><strong>${i18n.t('goal')}:</strong> ${calculator.getGoalDescription(goal)}</p>
        <p><strong>${i18n.t('activityLevel')}:</strong> ${calculator.getActivityLevelText(activityLevel)}</p>
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

function loadBestPracticesModal() {
  const contentArea = document.getElementById('practices-content');
  contentArea.innerHTML = `
    <div class="practices-list">
      <div class="content-card" style="background: #f5f3ff; border-left-color: #8b5cf6;">
        <h3>${i18n.t('hydration')}</h3>
        <p>${i18n.t('hydrationDesc')}</p>
      </div>

      <div class="content-card" style="background: #f5f3ff; border-left-color: #8b5cf6;">
        <h3>${i18n.t('sleep')}</h3>
        <p>${i18n.t('sleepDesc')}</p>
      </div>

      <div class="content-card" style="background: #f5f3ff; border-left-color: #8b5cf6;">
        <h3>${i18n.t('exercise')}</h3>
        <p>${i18n.t('exerciseDesc')}</p>
      </div>

      <div class="content-card" style="background: #f5f3ff; border-left-color: #8b5cf6;">
        <h3>${i18n.t('wholefoods')}</h3>
        <p>${i18n.t('wholefoodsDesc')}</p>
      </div>

      <div class="content-card" style="background: #f5f3ff; border-left-color: #8b5cf6;">
        <h3>${i18n.t('trackProgress')}</h3>
        <p>${i18n.t('trackProgressDesc')}</p>
      </div>
    </div>
  `;
}

function loadFoodDetailsModal() {
  const contentArea = document.getElementById('fooddetails-content');
  const foods = dataManager.getFoods();

  let html = `
    <div class="food-details-container">
      <div class="food-search-box">
        <input type="text" id="food-search" class="food-search-input" placeholder="${i18n.t('foodName')}...">
      </div>
      <div class="foods-list" id="foods-list">
  `;

  foods.forEach(food => {
    html += `
      <div class="food-item-compact" data-food-name="${food.name.toLowerCase()}">
        <div class="food-item-header">
          <h4>${food.name}</h4>
          <span class="food-category">${food.category}</span>
        </div>
        <div class="food-item-nutrition">
          ${food.servings[0] ? `
            <span class="nutrition-badge">${food.servings[0].calories} cal</span>
            <span class="nutrition-badge">P: ${food.servings[0].proteins}g</span>
            <span class="nutrition-badge">F: ${food.servings[0].fats}g</span>
            <span class="nutrition-badge">C: ${food.servings[0].carbs}g</span>
          ` : ''}
        </div>
      </div>
    `;
  });

  html += '</div></div>';
  contentArea.innerHTML = html;

  // Add search functionality
  const searchInput = document.getElementById('food-search');
  const foodItems = document.querySelectorAll('.food-item-compact');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    foodItems.forEach(item => {
      const foodName = item.dataset.foodName;
      if (foodName.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}
