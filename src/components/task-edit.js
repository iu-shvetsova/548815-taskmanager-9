import {ESC_KEYCODE, SPACE_KEYCODE} from '../utils/constants.js';
import AbstractComponent from './abstract-component.js';

export default class TaskEdit extends AbstractComponent {
  constructor({description, dueDate, repeatingDays, tags, color}) {
    super();
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
    this._currentColor = color;

    this._subscribeOnEvents();
  }

  _setRepeat() {
    this.getElement().querySelector(`.card__repeat-toggle`).addEventListener(`click`, () => {
      const repeatStatus = this.getElement().querySelector(`.card__repeat-status`);
      const repeatField = this.getElement().querySelector(`.card__repeat-days`);

      if (repeatStatus.innerText.toLowerCase() === `yes`) {
        repeatStatus.innerText = `no`;
        repeatField.style.display = `none`;
        this._repeatingDays = {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        };
        this.getElement().classList.remove(`card--repeat`);
      } else {
        repeatStatus.innerText = `yes`;
        repeatField.style.display = `block`;
        this.getElement().classList.add(`card--repeat`);
      }
    });
  }

  _setDeadline() {
    this.getElement().querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, () => {
      const dateStatus = this.getElement().querySelector(`.card__date-status`);
      const dateField = this.getElement().querySelector(`.card__date-deadline`);

      if (dateStatus.innerText.toLowerCase() === `yes`) {
        dateStatus.innerText = `no`;
        dateField.style.display = `none`;
        this._dueDate = null;
      } else {
        dateStatus.innerText = `yes`;
        dateField.style.display = `inline-block`;
      }
    });
  }

  _setColor() {
    this.getElement().querySelectorAll(`.card__color-input`).forEach((color) => {
      color.addEventListener(`click`, () => {
        this.getElement().classList.remove(`card--${this._currentColor}`);
        this.getElement().classList.add(`card--${color.value}`);
        this._currentColor = color.value;
      });
    });
  }

  _removeTag() {
    this.getElement().querySelectorAll(`.card__hashtag-delete`).forEach((button) => {
      button.addEventListener(`click`, () => {
        console.log(this._tags);
        const tag = button.closest(`.card__hashtag-inner`);
        this._tags.delete(tag.innerText.slice(1));
        tag.remove();
        console.log(this._tags);
      });
    });
  }

  _addTag() {
    const tagsList = this.getElement().querySelector(`.card__hashtag-list`);
    const tagField = this.getElement().querySelector(`.card__hashtag-input`);

    tagField.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === SPACE_KEYCODE) {
        evt.preventDefault();
        this._tags.add(tagField.value);
        tagsList.insertAdjacentHTML(`beforeend`, `
          <span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="${tagField.value}"
              class="card__hashtag-hidden-input"
            />
            <p class="card__hashtag-name">
              #${tagField.value}
            </p>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>
        `);
        tagField.value = ``;
      }
    });
  }

  _subscribeOnEvents() {
    this._setRepeat();
    this._setDeadline();
    this._setColor();
    this._addTag();
    this._removeTag();
  }

  getTemplate() {
    return `
      <article class="card card--edit card--${this._color} card--${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `repeat` : ``}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites card__btn--disabled"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._description}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">yes</span>
                  </button>

                  <fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder=""
                        name="date"
                        value="${this._dueDate.toDateString()}"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `yes` : `no`}</span>
                  </button>
                  <fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-mo-4"
                        name="repeat"
                        value="mo"
                        ${this._repeatingDays[`mo`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-mo-4"
                        >mo</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-tu-4"
                        name="repeat"
                        value="tu"
                        ${this._repeatingDays[`tu`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-tu-4"
                        >tu</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-we-4"
                        name="repeat"
                        value="we"
                        ${this._repeatingDays[`we`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-we-4"
                        >we</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-th-4"
                        name="repeat"
                        value="th"
                        ${this._repeatingDays[`th`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-th-4"
                        >th</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-fr-4"
                        name="repeat"
                        value="fr"
                        ${this._repeatingDays[`fr`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-fr-4"
                        >fr</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        name="repeat"
                        value="sa"
                        id="repeat-sa-4"
                        ${this._repeatingDays[`sa`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-sa-4"
                        >sa</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-su-4"
                        name="repeat"
                        value="su"
                        ${this._repeatingDays[`su`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-su-4"
                        >su</label
                      >
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${Array.from(this._tags).map((tag) => `
                    <span class="card__hashtag-inner">
                      <input
                        type="hidden"
                        name="hashtag"
                        value="${tag}"
                        class="card__hashtag-hidden-input"
                      />
                      <p class="card__hashtag-name">
                        #${tag}
                      </p>
                      <button type="button" class="card__hashtag-delete">
                        delete
                      </button>
                    </span>
                    `).join(``)}
                  </div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  <input
                    type="radio"
                    id="color-black-4"
                    class="card__color-input card__color-input--black visually-hidden"
                    name="color"
                    value="black"
                    ${this._color === `black` ? `checked` : ``}
                  />
                  <label
                    for="color-black-4"
                    class="card__color card__color--black"
                    >black</label
                  >
                  <input
                    type="radio"
                    id="color-yellow-4"
                    class="card__color-input card__color-input--yellow visually-hidden"
                    name="color"
                    value="yellow"
                    ${this._color === `yellow` ? `checked` : ``}
                  />
                  <label
                    for="color-yellow-4"
                    class="card__color card__color--yellow"
                    >yellow</label
                  >
                  <input
                    type="radio"
                    id="color-blue-4"
                    class="card__color-input card__color-input--blue visually-hidden"
                    name="color"
                    value="blue"
                    ${this._color === `blue` ? `checked` : ``}
                  />
                  <label
                    for="color-blue-4"
                    class="card__color card__color--blue"
                    >blue</label
                  >
                  <input
                    type="radio"
                    id="color-green-4"
                    class="card__color-input card__color-input--green visually-hidden"
                    name="color"
                    value="green"
                    ${this._color === `green` ? `checked` : ``}
                  />
                  <label
                    for="color-green-4"
                    class="card__color card__color--green"
                    >green</label
                  >
                  <input
                    type="radio"
                    id="color-pink-4"
                    class="card__color-input card__color-input--pink visually-hidden"
                    name="color"
                    value="pink"
                    ${this._color === `pink` ? `checked` : ``}
                  />
                  <label
                    for="color-pink-4"
                    class="card__color card__color--pink"
                    >pink</label
                  >
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `;
  }
}
