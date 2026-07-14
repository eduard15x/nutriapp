document.addEventListener('DOMContentLoaded', async () => {
  await initializeApp();
});

async function initializeApp() {
  console.log('NutriApp - Initializing...');

  try {
    await dataManager.loadFoods();
    console.log('NutriApp - Foods loaded:', dataManager.getFoods().length);

    attachEventListeners();
    console.log('NutriApp - Ready!');
  } catch (error) {
    console.error('NutriApp - Initialization error:', error);
  }
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
  }
}

function handleModalClosed(event) {
  const { modalId } = event.detail;
  console.log('Modal closed:', modalId);
}

function loadRecipesModal() {
  const modal = modalManager.getModal('recipes');
  const contentArea = modal.querySelector('.modal-content');
  const content = contentArea.innerHTML;

  const foodsList = uiManager.renderFoodsList(dataManager.getFoods());
  contentArea.innerHTML = content + `
    <div style="margin-top: var(--spacing-lg);">
      ${foodsList}
    </div>
  `;
}

function loadCalculatorModal() {
  const modal = modalManager.getModal('calculator');
  const contentArea = modal.querySelector('.modal-content');
  const content = contentArea.innerHTML;

  contentArea.innerHTML = content + `
    <form id="calculator-form">
      <div class="input-group">
        <label for="weight">Weight (kg)</label>
        <input type="number" id="weight" name="weight" min="30" max="200" value="70" required>
      </div>

      <div class="input-group">
        <label for="height">Height (cm)</label>
        <input type="number" id="height" name="height" min="140" max="220" value="180" required>
      </div>

      <div class="input-group">
        <label for="age">Age (years)</label>
        <input type="number" id="age" name="age" min="16" max="100" value="25" required>
      </div>

      <div class="input-group">
        <label for="gender">Gender</label>
        <select id="gender" name="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div class="input-group">
        <label for="activity">Activity Level</label>
        <select id="activity" name="activity" required>
          <option value="1.2">Sedentary (little or no exercise)</option>
          <option value="1.375" selected>Lightly Active (1-3 days/week)</option>
          <option value="1.55">Moderately Active (3-5 days/week)</option>
          <option value="1.725">Very Active (6-7 days/week)</option>
          <option value="1.9">Extremely Active (twice per day)</option>
        </select>
      </div>

      <div class="input-group">
        <label for="goal">Goal</label>
        <select id="goal" name="goal" required>
          <option value="maintain">Maintain Weight</option>
          <option value="bulk">Bulk (+300 cal/day)</option>
          <option value="cut">Cut (-300 cal/day)</option>
          <option value="shred">Shred (-500 cal/day)</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">
        Calculate My Macros
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

  const results = calculator.calculateDaily(weight, height, age, gender, activityLevel, goal);

  const resultsDiv = document.getElementById('calculator-results');
  resultsDiv.innerHTML = `
    <div class="results-container">
      <h3>Your Daily Nutrition Plan</h3>

      <div class="results-info">
        <p><strong>Goal:</strong> ${calculator.getGoalDescription(goal)}</p>
        <p><strong>Activity Level:</strong> ${calculator.getActivityLevelText(activityLevel)}</p>
      </div>

      <div class="results-grid">
        <div class="result-card">
          <h4 style="color: var(--color-secondary);">${results.calories}</h4>
          <p>Daily Calories</p>
        </div>

        <div class="result-card">
          <h4 style="color: var(--color-accent-green);">${results.proteins}g</h4>
          <p>Proteins</p>
        </div>

        <div class="result-card">
          <h4 style="color: var(--color-accent-yellow);">${results.fats}g</h4>
          <p>Fats</p>
        </div>

        <div class="result-card">
          <h4 style="color: var(--color-accent-sky);">${results.carbs}g</h4>
          <p>Carbs</p>
        </div>
      </div>

      <div class="results-info" style="border-left: 4px solid var(--color-primary); padding-left: var(--spacing-md);">
        <p style="margin-bottom: var(--spacing-xs);"><strong>BMR (Basal Metabolic Rate):</strong> ${results.bmr} cal/day</p>
        <p style="margin-bottom: 0;"><strong>TDEE (Total Daily Energy Expenditure):</strong> ${results.tdee} cal/day</p>
      </div>
    </div>
  `;
}

function loadBestPracticesModal() {
  const modal = modalManager.getModal('practices');
  const contentArea = modal.querySelector('.modal-content');
  const content = contentArea.innerHTML;

  contentArea.innerHTML = content + `
    <div class="practices-list">
      <div class="content-card" style="background: rgba(144, 238, 144, 0.1);">
        <h3>💧 Stay Hydrated</h3>
        <p>Drink at least 8 glasses of water daily. Proper hydration supports metabolism and overall health.</p>
      </div>

      <div class="content-card" style="background: rgba(135, 206, 235, 0.1); border-left-color: var(--color-accent-sky);">
        <h3>😴 Get Quality Sleep</h3>
        <p>Aim for 7-9 hours of quality sleep per night. Sleep is crucial for recovery and weight management.</p>
      </div>

      <div class="content-card" style="background: rgba(255, 215, 0, 0.1); border-left-color: var(--color-accent-yellow);">
        <h3>🏃 Exercise Regularly</h3>
        <p>Combine cardio and strength training 3-5 times per week for optimal results.</p>
      </div>

      <div class="content-card" style="background: rgba(238, 90, 111, 0.1); border-left-color: var(--color-secondary);">
        <h3>🥗 Eat Whole Foods</h3>
        <p>Focus on whole, minimally processed foods. Avoid sugary drinks and processed snacks.</p>
      </div>

      <div class="content-card" style="background: rgba(255, 159, 67, 0.1);">
        <h3>📊 Track Progress</h3>
        <p>Keep a food journal and measure results weekly. Consistency is key to long-term success.</p>
      </div>
    </div>
  `;
}
