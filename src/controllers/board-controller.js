import {render, unrender} from '../utils/index.js';
import {Position, TASK_STEP} from '../utils/constants.js';
import Board from '../components/board.js';
import Sort from '../components/sort.js';
import TasksList from '../components/tasks-list.js';
import Task from '../components/task.js';
import TaskEdit from '../components/task-edit.js';
import LoadButton from '../components/load-button.js';
import TaskController from './task-controller.js';

export default class BoardController {
  constructor(container, tasks, onTasksUpdate) {
    this._container = container;
    this._tasks = tasks;
    this._filteredTasks = tasks;
    this._renderedTasksCount = 0;
    this._board = new Board(tasks.length);
    this._sort = new Sort();
    this._tasksList = new TasksList();
    this._button = new LoadButton();

    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _renderTask(taskMock) {
    const taskController = new TaskController(this._tasksList, taskMock, this._onDataChange, this._onChangeView, () => this._updateTasks());
    console.log()
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _renderButton() {
    if ((this._filteredTasks.length > TASK_STEP) && (this._renderedTasksCount < this._filteredTasks.length)) {
      render(this._tasksList.getElement(), this._button.getElement(), Position.AFTEREND);
      this._button.getElement().addEventListener(`click`, () => this._renderTasks(this._filteredTasks));
    }
  }

  _filterTasks(option) {
    switch (option) {
      case `actual`:
        this._filteredTasks = this._tasks.filter((task) => !task.isArchive);
        return this._filteredTasks;
      case `archive`:
        this._filteredTasks = this._tasks.filter((task) => task.isArchive);
        return this._filteredTasks;
      // потом наверняка нужно будет добавить ещё что-то :/
    }
  }

  _updateTasksAfterArchive() {

  }

  _renderTasks(tasks) {
    if (tasks.length <= TASK_STEP) {
      if (this._renderedTasksCount === 0) {
        tasks.forEach((task) => this._renderTask(task));
        this._renderedTasksCount = tasks.length;
      }
    } else {
      const currentCount = this._renderedTasksCount;
      for (let i = this._renderedTasksCount; i < TASK_STEP + currentCount; i++) {
        if (this._renderedTasksCount < tasks.length) {
          this._renderTask(tasks[i]);
          this._renderedTasksCount++;
        } else {
          unrender(this._button.getElement());
          break;
        }
      }
    }
  }

  _updateTasks() {
    this._filterTasks(`actual`);
    this._tasksList.getElement().innerHTML = ``;
    for (let i = 0; i < this._renderedTasksCount; i++) {
      this._renderTask(this._filteredTasks[i]);
    }
    onTasksUpdate(this._tasks);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        this._filteredTasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
      case `date-down`:
        this._filteredTasks.sort((a, b) => b.dueDate - a.dueDate);
        break;
      case `default`:
        this._filteredTasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
    }

    this._updateTasks();
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((task) => task === oldData)] = newData;
    this._updateTasks();
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);

    if (this._tasks.length > 0) {
      const boardSection = document.querySelector(`.board`);

      render(boardSection, this._sort.getElement(), Position.BEFOREEND);
      render(boardSection, this._tasksList.getElement(), Position.BEFOREEND);
      this._renderTasks(this._filterTasks(`actual`));
      this._renderButton();

      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }
  }
}

