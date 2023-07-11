import { API_URL, MAX_SEARCH_RESULTS } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    page: 1,
    query: '',
    results: [],
    resPerPage: MAX_SEARCH_RESULTS
  }
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(API_URL + id);
    state.recipe = { ...data.data.recipe };
  } catch (e) {
    throw e;
  }
};

export const searchRecipe = async (query) => {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.query = query;
    state.search.results = data.data.recipes;
    state.search.page = 1;
  } catch (e) {
    throw e;
  }
};

export const getSearchResult = (page = state.search.page) => {
  state.search.page = page;
  return state.search.results.slice(
    (page - 1) * MAX_SEARCH_RESULTS, page * MAX_SEARCH_RESULTS
  );
};

export const updateIngredients = (newServings) => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
