import {createElement} from '../utils/index.js';

export default class Search {
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
      <section class="main__search search container">
        <input
          type="text"
          id="search__input"
          class="search__input"
          placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
        />
        <label class="visually-hidden" for="search__input">Search</label>
      </section>
    `;
  }
}
