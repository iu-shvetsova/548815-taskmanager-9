export const getFilters = (tasks) => {
  const countAll = () => tasks.length;

  const countOverdue = () => {
    return tasks.reduce((acc, task) => {
      return task.dueDate < Date.now() ? acc + 1 : acc;
    }, 0);
  };

  const countToday = () => {
    return tasks.reduce((acc, task) => {
      return task.dueDate === Date.now() ? acc + 1 : acc;
    }, 0);
  };

  const countRepeating = () => {
    return tasks.reduce((acc, task) => {
      return Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]) ? acc + 1 : acc;
    }, 0);
  };

  const countTags = () => {
    return tasks.reduce((acc, task) => {
      return task.tags.size ? acc + 1 : acc;
    }, 0);
  };

  const countFavorites = () => {
    return tasks.reduce((acc, task) => {
      return task.isFavorite ? acc + 1 : acc;
    }, 0);
  };

  const countArchive = () => {
    return tasks.reduce((acc, task) => {
      return task.isArchive ? acc + 1 : acc;
    }, 0);
  };

  return [{
    title: `All`,
    count: countAll()
  }, {
    title: `Overdue`,
    count: countOverdue()
  }, {
    title: `Today`,
    count: countToday()
  }, {
    title: `Favorites`,
    count: countFavorites()
  }, {
    title: `Repeating`,
    count: countRepeating()
  }, {
    title: `Tags`,
    count: countTags()
  }, {
    title: `Archive`,
    count: countArchive()
  }];
};

