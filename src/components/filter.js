import AbstractComponent from './absctract-component.js';

export default class Filter extends AbstractComponent {
  constructor([all, overdue, today, favorites, repeating, tags, archive]) {
    super();
    this._all = all;
    this._overdue = overdue;
    this._today = today;
    this._favorites = favorites;
    this._repeating = repeating;
    this._tags = tags;
    this._archive = archive;
  }

  getTemplate() {
    return `
      <section class="main__filter filter container">
        <input
          type="radio"
          id="filter__all"
          class="filter__input visually-hidden"
          name="filter"
          checked
        />
        <label for="filter__all" class="filter__label">
          ${this._all.title} <span class="filter__all-count">${this._all.count}</span></label
        >
        <input
          type="radio"
          id="filter__overdue"
          class="filter__input visually-hidden"
          name="filter"
          ${this._overdue.count > 0 ? `` : `disabled`}
        />
        <label for="filter__overdue" class="filter__label"
          >${this._overdue.title} <span class="filter__overdue-count">${this._overdue.count}</span></label
        >
        <input
          type="radio"
          id="filter__today"
          class="filter__input visually-hidden"
          name="filter"
          ${this._today.count > 0 ? `` : `disabled`}
        />
        <label for="filter__today" class="filter__label"
          >${this._today.title} <span class="filter__today-count">${this._today.count}</span></label
        >
        <input
          type="radio"
          id="filter__favorites"
          class="filter__input visually-hidden"
          name="filter"
          ${this._favorites.count > 0 ? `` : `disabled`}
        />
        <label for="filter__favorites" class="filter__label"
          >${this._favorites.title} <span class="filter__favorites-count">${this._favorites.count}</span></label
        >
        <input
          type="radio"
          id="filter__repeating"
          class="filter__input visually-hidden"
          name="filter"
          ${this._repeating.count > 0 ? `` : `disabled`}
        />
        <label for="filter__repeating" class="filter__label"
          >${this._repeating.title} <span class="filter__repeating-count">${this._repeating.count}</span></label
        >
        <input
          type="radio"
          id="filter__tags"
          class="filter__input visually-hidden"
          name="filter"
          ${this._tags.count > 0 ? `` : `disabled`}
        />
        <label for="filter__tags" class="filter__label"
          >${this._tags.title} <span class="filter__tags-count">${this._tags.count}</span></label
        >
        <input
          type="radio"
          id="filter__archive"
          class="filter__input visually-hidden"
          name="filter"
          ${this._archive.count > 0 ? `` : `disabled`}
        />
        <label for="filter__archive" class="filter__label"
          >${this._archive.title} <span class="filter__archive-count">${this._archive.count}</span></label
        >
      </section>
    `;
  }
}
