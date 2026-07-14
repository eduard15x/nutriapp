class Calculator {
  constructor() {
    this.userData = {
      weight: 0,
      height: 0,
      age: 0,
      gender: 'male',
      activityLevel: 1.375,
      goal: 'maintain'
    };
  }

  calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  calculateTDEE(bmr, activityLevel) {
    return bmr * activityLevel;
  }

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

  getGoalCalories(tdee, goal) {
    const adjustments = {
      maintain: 0,
      bulk: 300,
      cut: -300,
      shred: -500
    };
    return tdee + (adjustments[goal] || 0);
  }

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
