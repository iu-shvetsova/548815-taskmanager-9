'use strict';

import {createTask} from './mocks/data.js';

import {TASKS_COUNT, TASK_STEP} from './utils/constants.js';
import {getFilters} from './utils/filters.js';

import {getMenuComponent} from './components/site-menu.js';
import {getSearchComponent} from './components/search.js';
import {getFilterComponent} from './components/filter.js';
import {getBoardComponent} from './components/board.js';
import {getEditTaskComponent} from './components/task-edit.js';
import {getTaskComponent} from './components/task.js';
import {getLoadingComponent} from './components/load-more-button.js';

const tasks = [];
let renderedTasksCount = 0;

const createTasks = () => {
  for (let i = 0; i < TASKS_COUNT; i++) {
    tasks[i] = createTask();
  }
};

const renderComponent = (container, component, position) => container.insertAdjacentHTML(position, component);

const renderComponents = () => {
  const mainSection = document.querySelector(`.main`);
  const menuContainer = mainSection.querySelector(`.main__control`);

  renderComponent(menuContainer, getMenuComponent(), `beforeend`);
  renderComponent(mainSection, getSearchComponent(), `beforeend`);
  renderComponent(mainSection, getFilterComponent(getFilters(tasks)), `beforeend`);
  renderComponent(mainSection, getBoardComponent(), `beforeend`);

  const boardSection = mainSection.querySelector(`.board`);
  const tasksContainer = boardSection.querySelector(`.board__tasks`);

  renderComponent(tasksContainer, getEditTaskComponent(tasks[0]), `beforeend`);
  renderedTasksCount++;

  for (let i = renderedTasksCount; i < TASK_STEP; i++) {
    if (renderedTasksCount < TASKS_COUNT) {
      renderComponent(tasksContainer, getTaskComponent(tasks[i]), `beforeend`);
      renderedTasksCount++;
    } else {
      break;
    }
  }

  renderComponent(boardSection, getLoadingComponent(), `beforeend`);
};

const setEventListeners = () => {
  const loadButton = boardSection.querySelector(`.load-more`);

  loadButton.addEventListener(`click`, () => {
    const currentCount = renderedTasksCount;
    for (let i = renderedTasksCount; i < TASK_STEP + currentCount; i++) {
      if (renderedTasksCount < TASKS_COUNT) {
        renderComponent(tasksContainer, getTaskComponent(tasks[i]), `beforeend`);
        renderedTasksCount++;
      } else {
        loadButton.remove();
        break;
      }
    }
  });
};

createTasks();
renderComponents();
setEventListeners();


