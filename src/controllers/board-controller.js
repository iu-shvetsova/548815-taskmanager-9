import {render, unrender} from '../utils/index.js';
import {Position, TASK_STEP} from '../utils/constants.js';
import Board from '../components/board.js';
import Sort from '../components/sort.js';
import TasksList from '../components/tasks-list.js';
import Task from '../components/task.js';
import TaskEdit from '../components/task-edit.js';
import LoadButton from '../components/load-button.js';

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._unsortedTasks = tasks.slice();
    this._tasks = tasks;
    this._renderedTasksCount = 0;
    this._board = new Board(tasks.length);
    this._sort = new Sort();
    this._tasksList = new TasksList();
    this._button = new LoadButton();
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

  _renderButton() {
    if (this._renderedTasksCount < this._tasks.length) {
      render(this._tasksList.getElement(), this._button.getElement(), Position.AFTEREND);
      this._button.getElement().addEventListener(`click`, () => this._renderTasks(this._tasks));
    }
  }

  _renderTasks(tasks) {
    if (this._tasks.length <= TASK_STEP) {
      if (this._renderedTasksCount === 0) {
        this._tasks.forEach((task) => this._renderTask(task));
        this._renderedTasksCount = this._tasks.length;
      }
    } else {
      const currentCount = this._renderedTasksCount;
      for (let i = this._renderedTasksCount; i < TASK_STEP + currentCount; i++) {
        if (this._renderedTasksCount < this._tasks.length) {
          this._renderTask(tasks[i]);
          this._renderedTasksCount++;
        } else {
          unrender(this._button.getElement());
          break;
        }
      }
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._tasksList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        this._tasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
      case `date-down`:
        this._tasks.sort((a, b) => b.dueDate - a.dueDate);
        break;
      case `default`:
        this._tasks = this._unsortedTasks.slice();
        break;
    }

    for (let i = 0; i < this._renderedTasksCount; i++) {
      this._renderTask(this._tasks[i]);
    }
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);

    if (this._tasks.length > 0) {
      const boardSection = document.querySelector(`.board`);

      render(boardSection, this._sort.getElement(), Position.BEFOREEND);
      render(boardSection, this._tasksList.getElement(), Position.BEFOREEND);
      this._renderTasks(this._tasks);
      this._renderButton();

      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }
  }
}

