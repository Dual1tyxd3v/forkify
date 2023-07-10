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

  renderSpinner() {
    const markUp = `
    <div class="spinner">
      <svg>
        <use href="${icons}_icon-loader"></use>
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
          <use href="${icons}_icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clearContainer();
    this._parentContainer.insertAdjacentHTML('afterbegin', markUp);
  }
}
