import icons from "url:../../img/icons.svg";
import View from "./View";

export default class PreviewView extends View {

  _generateMarkUp() {
    const curId = window.location.hash.slice(1);

    return this._data.map(rec => 
      `<li class="preview">
        <a class="preview__link ${curId === rec.id ? 'preview__link--active' : ''}" href="#${rec.id}">
          <figure class="preview__fig">
            <img src="${rec.image_url}" alt="${rec.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
            <div class="preview__user-generated ${rec.key ? '' : 'hidden'}">
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
