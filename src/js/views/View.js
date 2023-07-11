import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  _parentContainer;

  render(data) {
    if (!data || (Array.isArray(data) && !data.length)) return this.renderError();

    this._data = data;
    this._clearContainer();
    this._parentContainer.insertAdjacentHTML('afterbegin', this._generateMarkUp());
  }

  _clearContainer() {
    this._parentContainer.innerHTML = '';
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkUp();
    const newElts = Array.from(document.createRange().createContextualFragment(newMarkup).querySelectorAll('*'));
    const curElts = Array.from(this._parentContainer.querySelectorAll('*'));
    if (!newElts.length || !curElts.length) return;

    curElts.forEach((curEl, i) => {
      const newEl = newElts[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });
  }

  renderSpinner() {
    const markUp = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clearContainer();
    this._parentContainer.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError(message = this._errorMessage) {
    const markUp = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clearContainer();
    this._parentContainer.insertAdjacentHTML('afterbegin', markUp);
  }
}
