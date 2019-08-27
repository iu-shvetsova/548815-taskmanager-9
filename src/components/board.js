import {render, unrender} from '../utils/index.js';
import {Position, TASKS_COUNT, TASK_STEP} from '../utils/constants.js';
import AbstractComponent from './absctract-component.js';
import Sorting from './sorting.js';
import TasksList from './tasks-list.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import LoadButton from './load-button.js';

export class Board extends AbstractComponent {
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

export class BoardController {
  constructor(container, tasks, renderedTasksCount) {
    this._container = container;
    this._tasks = tasks;
    this._renderedTasksCount = renderedTasksCount;
    this._board = new Board(tasks.length);
    this._sorting = new Sorting();
    this._tasksList = new TasksList();
  }

  _renderTask(taskMock) {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock);

    const onEscPress = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        taskEdit.getElement().replaceWith(task.getElement());
        document.removeEventListener(`keydown`, onEscPress);
      }
    };

    task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      task.getElement().replaceWith(taskEdit.getElement());
      document.addEventListener(`keydown`, onEscPress);
    });

    taskEdit.getElement().addEventListener(`submit`, () => {
      taskEdit.getElement().replaceWith(task.getElement());
      document.addEventListener(`keydown`, onEscPress);
    });

    taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscPress);
    });

    taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscPress);
    });

    render(this._tasksList.getElement(), task.getElement(), Position.BEFOREEND);
  }

  _renderLoadButton() {
    const button = new LoadButton();

    button.getElement().addEventListener(`click`, () => {
      const currentCount = this._renderedTasksCount;
      for (let i = this._renderedTasksCount; i < TASK_STEP + currentCount; i++) {
        if (this._renderedTasksCount < TASKS_COUNT) {
          this._renderTask(this._tasks[i]);
          this._renderedTasksCount++;
        } else {
          unrender(button.getElement());
          break;
        }
      }
    });

    render(this._tasksList.getElement(), button.getElement(), Position.BEFOREEND);
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    if (this._tasks.length > 0) {
      const boardSection = document.querySelector(`.board`);

      render(boardSection, this._sorting.getElement(), Position.BEFOREEND);
      render(boardSection, this._tasksList.getElement(), Position.BEFOREEND);

      for (let i = this._renderedTasksCount; i < TASK_STEP; i++) {
        if (this._renderedTasksCount < TASKS_COUNT) {
          this._renderTask(this._tasks[i]);
          this._renderedTasksCount++;
        } else {
          break;
        }
      }

      this._renderLoadButton();
    }
  }
}

