/**
 * Internationalization (i18n) module for language support
 */
class I18n {
  /**
   * Initializes i18n with supported languages and translations
   */
  constructor() {
    this.currentLanguage = localStorage.getItem('nutriapp-language') || 'ro';
    this.translations = {
      ro: {
        appTitle: 'NutriApp',
        appSubtitle: 'Asistentul tău personal pentru nutriție și planificare',
        welcome: 'Bun venit la NutriApp',
        chooseOption: 'Alege o opțiune de mai jos pentru a te apuca de călătoria ta nutrițională',
        recipes: 'Rețete',
        recipesDesc: 'Explorează idei de rețete delicioase și sănătoase',
        exploreRecipes: 'Explorează rețete',
        caloriesCalculator: 'Calculator calorii',
        caloriesCalcDesc: 'Calculează nevoile tale calorice zilnice în funcție de obiective',
        calculateNow: 'Calculează acum',
        bestPractices: 'Bune practici',
        bestPracticesDesc: 'Învață sfaturi nutriționale și obiceiuri de viață sănătoasă',
        learnMore: 'Afla mai mult',
        foodDetails: 'Detalii alimentare',
        foodDetailsDesc: 'Vezi specificații detaliate ale diferitelor alimente',
        exploreFoods: 'Explorează alimente',
        copyright: 'Copyright © 2026 NutriApp. Toate drepturile rezervate. | Mânânc bine, trăiesc mai bine.',
        weight: 'Greutate (kg)',
        height: 'Înălțime (cm)',
        age: 'Vârsta (ani)',
        gender: 'Sex',
        male: 'Bărbat',
        female: 'Femeie',
        activityLevel: 'Nivel de activitate',
        sedentary: 'Sedentar (puțin sau deloc exercițiu)',
        lightlyActive: 'Ușor activ (exercițiu ușor 1-3 zile/săptămână)',
        moderatelyActive: 'Moderat activ (exercițiu moderat 3-5 zile/săptămână)',
        veryActive: 'Foarte activ (exercițiu intens 6-7 zile/săptămână)',
        extremelyActive: 'Extrem de activ (job fizic sau antrenament de 2 ori pe zi)',
        goal: 'Obiectiv',
        maintain: 'Menține greutatea',
        bulk: 'Crește masă musculară (+300 cal/zi)',
        cut: 'Pierde grăsime treptat (-300 cal/zi)',
        shred: 'Pierde grăsime rapid pentru vară (-500 cal/zi)',
        calculateMacros: 'Calculează macronutrienții mei',
        yourDailyPlan: 'Planul tău zilnic de nutriție',
        dailyCalories: 'Calorii zilnice',
        proteins: 'Proteine',
        fats: 'Grasimi',
        carbs: 'Carbohidrați',
        bmr: 'Rata metabolică de bază (BMR)',
        tdee: 'Cheltuielile energetice zilnice totale (TDEE)',
        caloriesPerDay: 'cal/zi',
        hydration: 'Hidratare',
        hydrationDesc: 'Bea cel puțin 8 pahare de apă zilnic. O hidratare corespunzătoare susține metabolismul și sănătatea generală.',
        sleep: 'Somn de calitate',
        sleepDesc: 'Urmărește 7-9 ore de somn de calitate pe noapte. Somnul este esențial pentru recuperare și gestionarea greutății.',
        exercise: 'Exercițiu regulat',
        exerciseDesc: 'Combină cardio și antrenament cu greutăți 3-5 ori pe săptămână pentru rezultate optime.',
        wholefoods: 'Mânânc alimente integrale',
        wholefoodsDesc: 'Concentrează-te pe alimente întregi și neprocessate. Evită băuturile cu zahăr și snack-urile procesate.',
        trackProgress: 'Urmărește progresul',
        trackProgressDesc: 'Ține un jurnal alimentar și măsoară rezultatele săptămânal. Consistența este cheia succesului pe termen lung.',
        mockRecipesWarning: 'Secțiunea rețete este momentan în dezvoltare. Va fi disponibilă în curând!',
        foodName: 'Aliment',
        servingSize: 'Porție',
        servingOptions: 'Opțiuni de porție',
        category: 'Categorie',
        protein: 'Proteină',
        fat: 'Grăsime',
        carb: 'Carbohidrat',
        calorie: 'Calorie',
        close: 'Închide',
        per100g: 'per 100g',
        proteins_short: 'P',
        fats_short: 'F',
        carbs_short: 'C',
        calories_short: 'cal',
        chickenBreast: 'Piept de pui',
        egg: 'Ou',
        brownRice: 'Orez brun',
        broccoli: 'Broccoli',
        banana: 'Banană',
        categoryProtein: 'Proteină',
        categoryCarbs: 'Carbohidrați',
        categoryVegetables: 'Legume',
        categoryFruits: 'Fructe',
        categoryDairy: 'Lactate',
        categoryNuts: 'Fructe uscate',
        categoryOils: 'Uleiuri'
      },
      en: {
        appTitle: 'NutriApp',
        appSubtitle: 'Your Personal Nutrition & Planning Assistant',
        welcome: 'Welcome to NutriApp',
        chooseOption: 'Choose an option below to get started with your nutrition journey',
        recipes: 'Recipes',
        recipesDesc: 'Explore delicious and healthy recipe ideas',
        exploreRecipes: 'Explore Recipes',
        caloriesCalculator: 'Calories Calculator',
        caloriesCalcDesc: 'Calculate your daily calorie needs based on your goals',
        calculateNow: 'Calculate Now',
        bestPractices: 'Best Practices',
        bestPracticesDesc: 'Learn nutrition tips and healthy lifestyle habits',
        learnMore: 'Learn More',
        foodDetails: 'Food Details',
        foodDetailsDesc: 'View detailed specifications of different foods',
        exploreFoods: 'Explore Foods',
        copyright: 'Copyright © 2026 NutriApp. All rights reserved. | Eat well, live better.',
        weight: 'Weight (kg)',
        height: 'Height (cm)',
        age: 'Age (years)',
        gender: 'Gender',
        male: 'Male',
        female: 'Female',
        activityLevel: 'Activity Level',
        sedentary: 'Sedentary (little or no exercise)',
        lightlyActive: 'Lightly Active (light exercise 1-3 days/week)',
        moderatelyActive: 'Moderately Active (moderate exercise 3-5 days/week)',
        veryActive: 'Very Active (hard exercise 6-7 days/week)',
        extremelyActive: 'Extremely Active (physical job or training twice per day)',
        goal: 'Goal',
        maintain: 'Maintain Weight',
        bulk: 'Bulk (+300 cal/day)',
        cut: 'Cut (-300 cal/day)',
        shred: 'Shred (-500 cal/day)',
        calculateMacros: 'Calculate My Macros',
        yourDailyPlan: 'Your Daily Nutrition Plan',
        dailyCalories: 'Daily Calories',
        proteins: 'Proteins',
        fats: 'Fats',
        carbs: 'Carbs',
        bmr: 'Basal Metabolic Rate (BMR)',
        tdee: 'Total Daily Energy Expenditure (TDEE)',
        caloriesPerDay: 'cal/day',
        hydration: 'Stay Hydrated',
        hydrationDesc: 'Drink at least 8 glasses of water daily. Proper hydration supports metabolism and overall health.',
        sleep: 'Get Quality Sleep',
        sleepDesc: 'Aim for 7-9 hours of quality sleep per night. Sleep is crucial for recovery and weight management.',
        exercise: 'Exercise Regularly',
        exerciseDesc: 'Combine cardio and strength training 3-5 times per week for optimal results.',
        wholefoods: 'Eat Whole Foods',
        wholefoodsDesc: 'Focus on whole, minimally processed foods. Avoid sugary drinks and processed snacks.',
        trackProgress: 'Track Progress',
        trackProgressDesc: 'Keep a food journal and measure results weekly. Consistency is key to long-term success.',
        mockRecipesWarning: 'The recipes section is currently under development. It will be available soon!',
        foodName: 'Food',
        servingSize: 'Serving Size',
        servingOptions: 'Serving Options',
        category: 'Category',
        protein: 'Protein',
        fat: 'Fat',
        carb: 'Carbs',
        calorie: 'Calories',
        close: 'Close',
        per100g: 'per 100g',
        proteins_short: 'P',
        fats_short: 'F',
        carbs_short: 'C',
        calories_short: 'cal',
        chickenBreast: 'Chicken Breast',
        egg: 'Egg',
        brownRice: 'Brown Rice',
        broccoli: 'Broccoli',
        banana: 'Banana',
        categoryProtein: 'Protein',
        categoryCarbs: 'Carbs',
        categoryVegetables: 'Vegetables',
        categoryFruits: 'Fruits',
        categoryDairy: 'Dairy',
        categoryNuts: 'Nuts & Seeds',
        categoryOils: 'Oils'
      }
    };
  }

  /**
   * Gets the current language
   * @returns {string} Current language code (e.g., 'en', 'ro')
   */
  getLanguage() {
    return this.currentLanguage;
  }

  /**
   * Sets the current language
   * @param {string} lang - Language code to set
   * @returns {boolean} True if language was set successfully, false otherwise
   */
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('nutriapp-language', lang);
      return true;
    }
    return false;
  }

  /**
   * Gets a translated string for the given key
   * @param {string} key - Translation key
   * @returns {string} Translated string or key if translation not found
   */
  t(key) {
    const translation = this.translations[this.currentLanguage][key];
    return translation || key;
  }

  /**
   * Gets all available languages
   * @returns {Array<string>} Array of language codes
   */
  getAllLanguages() {
    return Object.keys(this.translations);
  }
}

const i18n = new I18n();
