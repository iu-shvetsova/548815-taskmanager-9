import AbstractComponent from './abstract-component.js';

export default class Board extends AbstractComponent {
  constructor(tasksCount) {
    super();
    this._tasksCount = tasksCount;
  }

  getTemplate() {
    if (this._tasksCount > 0) {
      return `
        <section class="board container"></section>
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
