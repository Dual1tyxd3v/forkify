import PrevieView from './previeView';

class ResultsView extends PrevieView {
  _parentContainer = document.querySelector('.results');
  _errorMessage = 'There are no results for your query! Try again later.'

}

export default new ResultsView();
