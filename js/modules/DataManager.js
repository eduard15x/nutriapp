/**
 * DataManager module for managing food data
 */
class DataManager {
  /**
   * Initializes the DataManager
   */
  constructor() {
    this.foodsData = [];
    this.initialized = false;
  }

  /**
   * Asynchronously loads foods data from JSON file
   * @async
   * @returns {Promise<Array>} Array of food items
   */
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

  /**
   * Gets all foods
   * @returns {Array} Array of all food items
   */
  getFoods() {
    return this.foodsData;
  }

  /**
   * Gets a food item by ID
   * @param {string|number} id - Food ID
   * @returns {Object|undefined} Food item or undefined if not found
   */
  getFoodById(id) {
    return this.foodsData.find(food => food.id === id);
  }

  /**
   * Gets foods filtered by category
   * @param {string} category - Food category
   * @returns {Array} Array of food items in category
   */
  getFoodsByCategory(category) {
    return this.foodsData.filter(food => food.category === category);
  }

  /**
   * Gets all unique food categories
   * @returns {Array} Array of category names
   */
  getCategories() {
    return [...new Set(this.foodsData.map(food => food.category))];
  }

  /**
   * Searches foods by name
   * @param {string} query - Search query
   * @returns {Array} Array of matching food items
   */
  searchFoods(query) {
    return this.foodsData.filter(food =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * Gets nutrition data for a specific serving of a food
   * @param {string|number} foodId - Food ID
   * @param {number} [servingIndex=0] - Serving index
   * @returns {Object|null} Nutrition data or null if not found
   */
  getFoodNutrition(foodId, servingIndex = 0) {
    const food = this.getFoodById(foodId);
    if (!food || !food.servings[servingIndex]) return null;
    return food.servings[servingIndex];
  }
}

const dataManager = new DataManager();
