'use strict';

import {createTask} from './mocks/data.js';

import {Position, TASKS_COUNT} from './utils/constants.js';
import {getFilters} from './utils/filters.js';
import {render, unrender} from './utils/index.js';

import Menu from './components/menu.js';
import Search from './components/search.js';
import Filter from './components/filter.js';
import BoardController from './controllers/board-controller.js';

const tasks = [];

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

  const renderFilter = (tasks) => {
    const filter = new Filter(getFilters(tasks));
    render(mainSection, filter.getElement(), Position.BEFOREEND);
  };

  renderMenu();
  renderSearch();
  renderFilter(tasks);

  const boardController = new BoardController(mainSection, tasks, renderFilter);
  boardController.init();
};

createTasks();
renderComponents();
