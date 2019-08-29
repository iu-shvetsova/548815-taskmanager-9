import {Position} from '../utils/constants.js';

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

export const render = (container, element, position) => {
  switch (position) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.insertAdjacentElement(Position.AFTEREND, element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
    element.removeElement();
  }
};
