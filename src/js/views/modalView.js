import View from "./View";

class ModalView extends View {
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _parentContainer = document.querySelector('.upload');

  constructor() {
    super();

    this._addEventHandlerCloseModal();
    this._addEventHandlerOpenModal();
  }

  addEventHandlerSubmit(callback) {
    this._parentContainer.addEventListener('submit', function(e) {
      e.preventDefault();

      const data = new FormData(this);
      callback(Object.fromEntries(data));
    });
  }

  _addEventHandlerOpenModal() {
    this._btnOpen.addEventListener('click', this.toggleModal.bind(this));
  }

  _addEventHandlerCloseModal() {
    this._btnClose.addEventListener('click', this.toggleModal.bind(this));
    this._overlay.addEventListener('click', this.toggleModal.bind(this));
  }

  toggleModal() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _generateMarkUp() {

  }
}

export default new ModalView();
