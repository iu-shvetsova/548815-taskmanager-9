import {createElement} from '../utils/utils.js';

export class LoadButton {
  constructor() {

  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `
      <button class="load-more" type="button">load more</button>
    `;
  }
}
