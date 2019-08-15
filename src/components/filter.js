export const getFilterComponent = ([all, overdue, today, favorites, repeating, tags, archive]) => `
  <section class="main__filter filter container">
    <input
      type="radio"
      id="filter__all"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__all" class="filter__label">
      ${all.title} <span class="filter__all-count">${all.count}</span></label
    >
    <input
      type="radio"
      id="filter__overdue"
      class="filter__input visually-hidden"
      name="filter"
      ${overdue.count > 0 ? `` : `disabled`}
    />
    <label for="filter__overdue" class="filter__label"
      >${overdue.title} <span class="filter__overdue-count">${overdue.count}</span></label
    >
    <input
      type="radio"
      id="filter__today"
      class="filter__input visually-hidden"
      name="filter"
      ${today.count > 0 ? `` : `disabled`}
    />
    <label for="filter__today" class="filter__label"
      >${today.title} <span class="filter__today-count">${today.count}</span></label
    >
    <input
      type="radio"
      id="filter__favorites"
      class="filter__input visually-hidden"
      name="filter"
      ${favorites.count > 0 ? `` : `disabled`}
    />
    <label for="filter__favorites" class="filter__label"
      >${favorites.title} <span class="filter__favorites-count">${favorites.count}</span></label
    >
    <input
      type="radio"
      id="filter__repeating"
      class="filter__input visually-hidden"
      name="filter"
      ${repeating.count > 0 ? `` : `disabled`}
    />
    <label for="filter__repeating" class="filter__label"
      >${repeating.title} <span class="filter__repeating-count">${repeating.count}</span></label
    >
    <input
      type="radio"
      id="filter__tags"
      class="filter__input visually-hidden"
      name="filter"
      ${tags.count > 0 ? `` : `disabled`}
    />
    <label for="filter__tags" class="filter__label"
      >${tags.title} <span class="filter__tags-count">${tags.count}</span></label
    >
    <input
      type="radio"
      id="filter__archive"
      class="filter__input visually-hidden"
      name="filter"
      ${archive.count > 0 ? `` : `disabled`}
    />
    <label for="filter__archive" class="filter__label"
      >${archive.title} <span class="filter__archive-count">${archive.count}</span></label
    >
  </section>
`;
