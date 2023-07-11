import PrevieView from './previeView';

class BookmarkView extends PrevieView {
  _parentContainer = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)'

}

export default new BookmarkView();
