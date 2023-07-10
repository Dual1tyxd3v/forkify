import icons from "url:../../img/icons.svg";
import View from "./View";

class ResultsView extends View {
  _parentContainer = document.querySelector('.results');
  _errorMessage = 'There are no results for your query! Try again later.'

  _generateMarkUp() {
    return this._data.map(rec => 
      `<li class="preview">
        <a class="preview__link preview__link--active" href="#${rec.id}">
          <figure class="preview__fig">
            <img src="${rec.image_url}" alt="${rec.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`
    ).join('');
  }
}

export default new ResultsView();
