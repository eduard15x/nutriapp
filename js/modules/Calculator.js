/**
 * Calculator module for nutrition and calorie calculations
 */
class Calculator {
  /**
   * Initializes the Calculator with default user data
   */
  constructor() {
    this.storageKey = 'nutriapp-calculator-data';
    this.defaultData = {
      weight: 70,
      height: 180,
      age: 25,
      gender: 'male',
      activityLevel: 1.375,
      goal: 'maintain'
    };
    this.userData = this.loadData();
  }

  /**
   * Loads user data from localStorage or returns default data
   * @returns {Object} User data
   */
  loadData() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : this.defaultData;
  }

  /**
   * Saves user data to localStorage
   * @param {Object} data - User data to save
   */
  saveData(data) {
    this.userData = data;
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  /**
   * Gets current user data
   * @returns {Object} Current user data
   */
  getUserData() {
    return this.userData;
  }

  /**
   * Calculates Basal Metabolic Rate (BMR) using Mifflin-St Jeor equation
   * @param {number} weight - Weight in kg
   * @param {number} height - Height in cm
   * @param {number} age - Age in years
   * @param {string} gender - Gender (male/female)
   * @returns {number} BMR value
   */
  calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  /**
   * Calculates Total Daily Energy Expenditure (TDEE)
   * @param {number} bmr - Basal Metabolic Rate
   * @param {number} activityLevel - Activity level multiplier
   * @returns {number} TDEE value
   */
  calculateTDEE(bmr, activityLevel) {
    return bmr * activityLevel;
  }

  /**
   * Calculates macro nutrients based on TDEE and goal
   * @param {number} tdee - Total Daily Energy Expenditure
   * @param {string} goal - Fitness goal (maintain/bulk/cut/shred)
   * @returns {Object} Macronutrient breakdown
   */
  calculateMacros(tdee, goal) {
    const macroRatios = {
      maintain: { protein: 0.3, fat: 0.3, carbs: 0.4 },
      bulk: { protein: 0.3, fat: 0.3, carbs: 0.4 },
      cut: { protein: 0.35, fat: 0.25, carbs: 0.4 },
      shred: { protein: 0.4, fat: 0.2, carbs: 0.4 }
    };

    const ratios = macroRatios[goal] || macroRatios.maintain;
    const goalCalories = this.getGoalCalories(tdee, goal);

    return {
      calories: Math.round(goalCalories),
      proteins: Math.round((goalCalories * ratios.protein) / 4),
      fats: Math.round((goalCalories * ratios.fat) / 9),
      carbs: Math.round((goalCalories * ratios.carbs) / 4)
    };
  }

  /**
   * Gets adjusted calories based on fitness goal
   * @param {number} tdee - Total Daily Energy Expenditure
   * @param {string} goal - Fitness goal
   * @returns {number} Adjusted calorie target
   */
  getGoalCalories(tdee, goal) {
    const adjustments = {
      maintain: 0,
      bulk: 300,
      cut: -300,
      shred: -500
    };
    return tdee + (adjustments[goal] || 0);
  }

  /**
   * Calculates complete daily nutrition plan
   * @param {number} weight - Weight in kg
   * @param {number} height - Height in cm
   * @param {number} age - Age in years
   * @param {string} gender - Gender (male/female)
   * @param {number} activityLevel - Activity level multiplier
   * @param {string} goal - Fitness goal
   * @returns {Object} Complete nutrition plan
   */
  calculateDaily(weight, height, age, gender, activityLevel, goal) {
    const bmr = this.calculateBMR(weight, height, age, gender);
    const tdee = this.calculateTDEE(bmr, activityLevel);
    const macros = this.calculateMacros(tdee, goal);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      ...macros,
      goal,
      activityLevel
    };
  }

  /**
   * Gets human-readable activity level description
   * @param {number} level - Activity level multiplier
   * @returns {string} Activity level description
   */
  getActivityLevelText(level) {
    const levels = {
      1.2: 'Sedentary (little or no exercise)',
      1.375: 'Lightly Active (light exercise 1-3 days/week)',
      1.55: 'Moderately Active (moderate exercise 3-5 days/week)',
      1.725: 'Very Active (hard exercise 6-7 days/week)',
      1.9: 'Extremely Active (physical job or training twice per day)'
    };
    return levels[level] || 'Unknown';
  }

  /**
   * Gets human-readable goal description
   * @param {string} goal - Fitness goal
   * @returns {string} Goal description
   */
  getGoalDescription(goal) {
    const descriptions = {
      maintain: 'Maintain your current weight',
      bulk: 'Gain muscle mass (+300 cal/day)',
      cut: 'Lose fat gradually (-300 cal/day)',
      shred: 'Lose fat quickly for summer (-500 cal/day)'
    };
    return descriptions[goal] || 'Unknown goal';
  }
}

const calculator = new Calculator();
