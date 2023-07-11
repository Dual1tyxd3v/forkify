import { API_URL, MAX_SEARCH_RESULTS } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    page: 1,
    query: '',
    results: [],
    resPerPage: MAX_SEARCH_RESULTS
  },
  bookmarks: []
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(API_URL + id);
    state.recipe = { ...data.data.recipe };
    state.recipe.bookmarked = state.bookmarks.some(rec => rec.id === id)
      ? true : false;
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

export const addBookmark = (recipe) => {
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
}

export const deleteBookmark = (id) => {
  state.bookmarks.splice(state.bookmarks.findIndex(bookmark => bookmark.id === id), 1);
  state.recipe.bookmarked = false;
}
