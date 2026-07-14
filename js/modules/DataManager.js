class DataManager {
  constructor() {
    this.foodsData = [];
    this.initialized = false;
  }

  async loadFoods() {
    try {
      const response = await fetch('./data/foods.json');
      if (!response.ok) throw new Error('Failed to load foods data');
      this.foodsData = await response.json();
      this.initialized = true;
      return this.foodsData;
    } catch (error) {
      console.error('DataManager - Error loading foods:', error);
      return [];
    }
  }

  getFoods() {
    return this.foodsData;
  }

  getFoodById(id) {
    return this.foodsData.find(food => food.id === id);
  }

  getFoodsByCategory(category) {
    return this.foodsData.filter(food => food.category === category);
  }

  getCategories() {
    return [...new Set(this.foodsData.map(food => food.category))];
  }

  searchFoods(query) {
    return this.foodsData.filter(food =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  getFoodNutrition(foodId, servingIndex = 0) {
    const food = this.getFoodById(foodId);
    if (!food || !food.servings[servingIndex]) return null;
    return food.servings[servingIndex];
  }
}

const dataManager = new DataManager();
