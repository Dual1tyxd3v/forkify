class SearchView {
  #parentContainer = document.querySelector('.search');

  getQuery() {
    const query = this.#parentContainer.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentContainer.querySelector('.search__field').value = '';
  }

  addEventHandler(callback) {
    this.#parentContainer.addEventListener('submit', (e) => {
      e.preventDefault();
      callback();
    });
  }
}

export default new SearchView();
