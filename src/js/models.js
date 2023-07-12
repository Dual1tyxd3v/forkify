import { API_URL, MAX_SEARCH_RESULTS, KEY } from "./config";
import { ajax } from "./helpers";

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

const init = () => {
  const bookmarks = localStorage.getItem('bookmarks');

  if (!bookmarks) return;

  state.bookmarks = JSON.parse(bookmarks);
};

init();

export const loadRecipe = async (id) => {
  try {
    const data = await ajax(`${API_URL}${id}?key=${KEY}`);
    state.recipe = { ...data.data.recipe };
    state.recipe.bookmarked = state.bookmarks.some(rec => rec.id === id)
      ? true : false;
  } catch (e) {
    throw e;
  }
};

export const searchRecipe = async (query) => {
  try {
    const data = await ajax(`${API_URL}?search=${query}&key=${KEY}`);
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

const saveBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = (recipe) => {
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
  saveBookmarks();
}

export const deleteBookmark = (id) => {
  state.bookmarks.splice(state.bookmarks.findIndex(bookmark => bookmark.id === id), 1);
  state.recipe.bookmarked = false;
  saveBookmarks();
}

export const uploadRecipe = async (data) => {
  try {
    const ingredients = Object.entries(data)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1].length > 0)
      .map(ing => {
        const ingArr = ing[1].trim().split(',');
        if (ingArr.length !== 3) throw new Error('Incorrect input data!');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: data.title,
      ingredients,
      image_url: data.image_url,
      source_url: data.source_url,
      publisher: data.publisher,
      servings: data.servings,
      cooking_time: data.cooking_time,
    };

    const newRecipe = await ajax(`${API_URL}?key=${KEY}`, recipe);
    newRecipe.data.recipe.bookmarked = true;
    addBookmark(newRecipe.data.recipe);

    state.recipe = newRecipe.data.recipe;
  } catch (e) {
    throw e;
  }
};
