import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Model from './models';
import RenderView from './views/recipe';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import PaginationView from './views/pagination';
import BookmarkView from './views/bookmarkView';
import ModalView from './views/modalView';

const recipeController = async () => {
  try {
    const id = window.location.hash.slice(1);
    BookmarkView.render(Model.state.bookmarks);
    if (!id) return;

    RenderView.renderSpinner();
    ResultsView.update(Model.getSearchResult());
  
    await Model.loadRecipe(id);

    RenderView.render(Model.state.recipe);
  } catch (e) {
    RenderView.renderError();
  }
};

const recipeUpdateServings = (newServings) => {
  Model.updateIngredients(newServings);
  RenderView.update(Model.state.recipe);
};

const searchController = async() => {
  try {
    const query = SearchView.getQuery();

    if (!query) return;
    ResultsView.renderSpinner();

    await Model.searchRecipe(query);

    ResultsView.render(Model.getSearchResult());
    PaginationView.render(Model.state.search);
  } catch (e) {
    RenderView.renderError();
  }
};

const paginationController = (page) => {
  ResultsView.render(Model.getSearchResult(page));
  PaginationView.render(Model.state.search);
};

const controllerToggleBookmark = () => {
  Model.state.recipe.bookmarked
    ? Model.deleteBookmark(Model.state.recipe.id)
    : Model.addBookmark(Model.state.recipe);
  RenderView.update(Model.state.recipe);
  BookmarkView.render(Model.state.bookmarks);
}

const controllerAddRecipe = async (data) => {
  try {
    ModalView.renderSpinner();

    await Model.uploadRecipe(data);

    RenderView.render(Model.state.recipe);
    BookmarkView.render(Model.state.bookmarks);
    ModalView.toggleModal();
  } catch (e) {
    ModalView.renderError(e.message);
  }
}

const init = () => {
  RenderView.addEventHandler(recipeController);
  SearchView.addEventHandler(searchController);
  RenderView.addEventHandlerBookmark(controllerToggleBookmark);
  PaginationView.addEventHandler(paginationController);
  RenderView.addEventHandlerUpdateServings(recipeUpdateServings);
  ModalView.addEventHandlerSubmit(controllerAddRecipe);
}
init();
