import {createElement} from '../utils/index.js';

export default class Board {
  constructor(tasksCount) {
    this._tasksCount = tasksCount;
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
    if (this._tasksCount > 0) {
      return `
        <section class="board container">
          <div class="board__filter-list">
            <a href="#" class="board__filter">SORT BY DEFAULT</a>
            <a href="#" class="board__filter">SORT BY DATE up</a>
            <a href="#" class="board__filter">SORT BY DATE down</a>
          </div>

          <div class="board__tasks"></div>
        </section>
      `;
    }

    return `
      <section class="board container">
        <p class="board__no-tasks">
          Congratulations, all tasks were completed! To create a new click on
          «add new task» button.
        </p>
      </section>
    `;
  }
}
