import AbstractComponent from './absctract-component.js';

export default class TasksList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <div class="board__tasks"></div>
    `;
  }
}
