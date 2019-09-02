import {Position, TASK_STEP, ESC_KEYCODE} from '../utils/constants.js';
import {render} from '../utils/index.js';
import Task from '../components/task.js';
import TaskEdit from '../components/task-edit.js';

export default class TaskController {
  constructor(container, data, onDataChange, onChangeView, onArchiveCb) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._onArchiveCb = onArchiveCb;
    this._taskView = new Task(data);
    this._taskEdit = new TaskEdit(data);

    this.init();
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
        this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }

  init() {
    const onEscPress = (evt) => {
      if (evt.keyCode === ESC_KEYCODE) {
        this._taskEdit.getElement().replaceWith(this._taskView.getElement());
        document.removeEventListener(`keydown`, onEscPress);
      }
    };

    this._taskView.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._onChangeView();
      this._taskView.getElement().replaceWith(this._taskEdit.getElement());
      document.addEventListener(`keydown`, onEscPress);
    });

    this._taskView.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, () => {
      this._data.isArchive = true;
      this._onArchiveCb();
    });

    this._taskEdit.getElement().addEventListener(`submit`, () => {
      this._taskEdit.getElement().replaceWith(this._taskView.getElement());
      document.addEventListener(`keydown`, onEscPress);
    });

    this._taskEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));

      const entry = {
        description: formData.get(`text`),
        dueDate: new Date(formData.get(`date`)),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, day) => {
          acc[day] = true;
          return acc;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        }),
        tags: new Set(formData.getAll('hashtag')),
        color: formData.get(`color`),
        // isFavorite: this._taskEdit.isFavorite,
        // isArchive: this._taskEdit.isArchive, // как вообще это сюда передать :с
      };

      this._onDataChange(entry, this._data);

      console.log(entry);

      document.removeEventListener(`keydown`, onEscPress);
    });

    this._taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscPress);
    });

    this._taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscPress);
    });

    render(this._container.getElement(), this._taskView.getElement(), Position.BEFOREEND);
  }
}
