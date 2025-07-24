import axios from "axios";

const SPOONACULAR_API_KEY = "YOUR_NEW_API_KEY_HERE"; // Replace after quota reset
const BASE_URL = "https://api.spoonacular.com";
const DB_URL = "http://localhost:3001"; // JSON server URL

const handleApiError = (error) => {
  console.error("API Error Details:", {
    message: error.message,
    response: error.response ? {
      status: error.response.status,
      data: error.response.data,
    } : null,
    request: error.request,
  });
  if (error.response?.status === 401) {
    throw new Error("Invalid API key. Please check your Spoonacular API key.");
  }
  if (error.response?.status === 402) {
    throw new Error("API quota exceeded. Please wait until tomorrow or use a new API key.");
  }
  if (error.response?.status === 404) {
    throw new Error("API endpoint not found. Check the URL or contact Spoonacular support.");
  }
  throw new Error("Failed to fetch data: " + error.message);
};

export const getRecipes = async (query = "", cuisine = "", number = 12) => {
  try {
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      number: number.toString(),
      addRecipeInformation: "true",
      fillIngredients: "true",
    });

    if (query) params.append("query", query);
    if (cuisine && cuisine !== "all") params.append("cuisine", cuisine);

    console.log("API Request URL:", `${BASE_URL}/recipes/complexSearch?${params}`);

    const response = await axios.get(`${BASE_URL}/recipes/complexSearch?${params}`);

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.data;

    if (data.status === "failure") {
      throw new Error(data.message || "API request failed");
    }

    console.log("API Response Data:", data);

    return (
      data.results?.map((recipe) => ({
        id: recipe.id,
        title: recipe.title || "Untitled Recipe",
        imageUrl: recipe.image || "/placeholder.svg?height=300&width=400",
        cuisine: recipe.cuisines?.[0] || "International",
        description: recipe.summary
          ? recipe.summary.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
          : "A delicious recipe to try",
        prepTime: recipe.readyInMinutes || 30,
        ingredients: recipe.extendedIngredients?.map((ing) => ing.original) || [],
        instructions: recipe.analyzedInstructions?.[0]?.steps?.map((step) => step.step) || [],
        isUserRecipe: false
      })) || []
    );
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=false`
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const recipe = response.data;

    if (recipe.status === "failure") {
      throw new Error(recipe.message || "Recipe not found");
    }

    return {
      id: recipe.id,
      title: recipe.title,
      imageUrl: recipe.image,
      cuisine: recipe.cuisines?.[0] || "International",
      description: recipe.summary ? recipe.summary.replace(/<[^>]*>/g, "") : "Delicious recipe",
      prepTime: recipe.readyInMinutes || 30,
      ingredients: recipe.extendedIngredients?.map((ing) => ing.original) || [],
      instructions: recipe.analyzedInstructions?.[0]?.steps?.map((step) => step.step) || [],
      isUserRecipe: false
    };
  } catch (error) {
    handleApiError(error);
  }
};

export const getRecipeDetails = async (id) => {
  try {
    if (id.toString().startsWith("user-")) {
      const response = await axios.get(`${DB_URL}/recipes/${id}`);
      return response.data;
    }
    return await getRecipeById(id);
  } catch (error) {
    handleApiError(error);
  }
};

export const getCuisines = async () => {
  return [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];
};

export const saveRecipe = async (recipe) => {
  try {
    const newRecipe = {
      ...recipe,
      isUserRecipe: true,
      imageUrl: recipe.imageUrl || "/placeholder.svg?height=300&width=400"
    };
    console.log("Saving recipe to db.json:", newRecipe);
    const response = await axios.post(`${DB_URL}/recipes`, newRecipe);
    console.log("Saved recipe response:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateRecipe = async (id, recipe) => {
  try {
    const response = await axios.put(`${DB_URL}/recipes/${id}`, { 
      ...recipe, 
      id, 
      isUserRecipe: true 
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const deleteRecipe = async (id) => {
  try {
    await axios.delete(`${DB_URL}/recipes/${id}`);
    return id;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getUserRecipes = async () => {
  try {
    console.log("Fetching user recipes from db.json");
    const response = await axios.get(`${DB_URL}/recipes`);
    const recipes = response.data.filter((recipe) => recipe.isUserRecipe) || [];
    console.log("Fetched user recipes:", recipes);
    return recipes;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

export const searchByIngredients = async (ingredients) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/recipes/findByIngredients?apiKey=${SPOONACULAR_API_KEY}&ingredients=${ingredients}&number=12`
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.data;

    return data.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      imageUrl: recipe.image,
      cuisine: "International",
      description: `Recipe using ${recipe.usedIngredientCount} of your ingredients`,
      prepTime: 30,
      ingredients: [],
      instructions: [],
      isUserRecipe: false
    }));
  } catch (error) {
    handleApiError(error);
  }
};