'use strict';

import {getMenuComponent} from './components/site-menu.js';
import {getSearchComponent} from './components/search.js';
import {getFilterComponent} from './components/filter.js';
import {getBoardComponent} from './components/board.js';
import {getEditFormComponent} from './components/task-edit.js';
import {getCardComponent} from './components/task.js';
import {getLoadingComponent} from './components/load-more-button.js';

const mainSection = document.querySelector(`.main`);
const menuContainer = mainSection.querySelector(`.main__control`);

const renderComponent = (container, component) => container.insertAdjacentHTML(`beforeend`, component);

renderComponent(menuContainer, getMenuComponent());
renderComponent(mainSection, getSearchComponent());
renderComponent(mainSection, getFilterComponent());
renderComponent(mainSection, getBoardComponent());

const boardSection = mainSection.querySelector(`.board`);
const tasksContainer = boardSection.querySelector(`.board__tasks`);

renderComponent(tasksContainer, getEditFormComponent());
for (let i = 0; i < 3; i++) {
  renderComponent(tasksContainer, getCardComponent());
}
renderComponent(boardSection, getLoadingComponent());
