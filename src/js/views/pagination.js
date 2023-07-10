import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentContainer = document.querySelector('.pagination');

  _generateMarkUp() {
    const currentPage = this._data.page;
    const pagesCount = Math.ceil(this._data.results.length / this._data.resPerPage);

    if (currentPage === 1 && pagesCount > 1 ) {
      return this._generateNextBtn(currentPage + 1);
    }
    if (currentPage === pagesCount && pagesCount > 1) {
      return this._generatePrevBtn(currentPage - 1);
    }
    if (pagesCount > 1) {
      return `${this._generatePrevBtn(currentPage - 1)}${this._generateNextBtn(currentPage + 1)}`;
    }
    return '';
  }

  addEventHandler(callback) {
    this._parentContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const page = +btn.dataset.page;
      callback(page);
    });
  }

  _generateNextBtn(page) {
    return ` 
    <button class="btn--inline pagination__btn--next" data-page="${page}">
      <span>Page ${page}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }

  _generatePrevBtn(page) {
    return `
    <button class="btn--inline pagination__btn--prev" data-page="${page}">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${page}</span>
    </button>`;
  }
}

export default new PaginationView();
