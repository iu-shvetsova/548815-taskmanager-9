'use strict';

import {createTask} from './mocks/data.js';

import {Position, TASKS_COUNT, TASK_STEP} from './utils/constants.js';
import {getFilters} from './utils/filters.js';
import {render, unrender} from './utils/index.js';

import Menu from './components/menu.js';
import Search from './components/search.js';
import Filter from './components/filter.js';
import Board from './components/board.js';
import TaskEdit from './components/task-edit.js';
import Task from './components/task.js';
import LoadButton from './components/load-button.js';

const tasks = [];
let renderedTasksCount = 0;

const createTasks = () => {
  for (let i = 0; i < TASKS_COUNT; i++) {
    tasks[i] = createTask();
  }
};

const renderComponents = () => {
  const mainSection = document.querySelector(`.main`);
  const menuContainer = mainSection.querySelector(`.main__control`);

  const renderMenu = () => {
    const menu = new Menu();
    render(menuContainer, menu.getElement(), Position.BEFOREEND);
  };

  const renderSearch = () => {
    const search = new Search();
    render(mainSection, search.getElement(), Position.BEFOREEND);
  };

  const renderFilter = () => {
    const filter = new Filter(getFilters(tasks));
    render(mainSection, filter.getElement(), Position.BEFOREEND);
  }

  const renderBoard = (tasksCount) => {
    const board = new Board(tasksCount);
    render(mainSection, board.getElement(), Position.BEFOREEND);
  }

  const renderTask = (position, taskMock) => {
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

    render(position, task.getElement(), Position.BEFOREEND);
  };

  const renderTasks = () => {
    if (tasks.length > 0) {
      const boardSection = mainSection.querySelector(`.board`);
      const tasksContainer = boardSection.querySelector(`.board__tasks`);

      for (let i = renderedTasksCount; i < TASK_STEP; i++) {
        if (renderedTasksCount < TASKS_COUNT) {
          renderTask(tasksContainer, tasks[i]);
          renderedTasksCount++;
        } else {
          break;
        }
      }

      renderLoadButton(boardSection);
    }
  };

  const renderLoadButton = (container) => {
    const button = new LoadButton();

    button.getElement().addEventListener(`click`, () => {
      const tasksContainer = document.querySelector(`.board__tasks`);
      const currentCount = renderedTasksCount;
      for (let i = renderedTasksCount; i < TASK_STEP + currentCount; i++) {
        if (renderedTasksCount < TASKS_COUNT) {
          renderTask(tasksContainer, tasks[i]);
          renderedTasksCount++;
        } else {
          unrender(button.getElement());
          break;
        }
      }
    });

    render(container, button.getElement(), Position.BEFOREEND);
  }

  renderMenu();
  renderSearch();
  renderFilter();
  renderBoard(tasks.length);
  renderTasks();
};

createTasks();
renderComponents();
