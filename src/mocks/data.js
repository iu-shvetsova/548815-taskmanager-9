const HASHTAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`];

export const createTask = () => {
  const TAGS_COUNT = Math.floor(Math.random() * 4);
  const tags = new Set();
  for (let i = 0; i < TAGS_COUNT; i++) {
    tags.add(HASHTAGS[Math.floor(Math.random() * HASHTAGS.length)]);
  }

  return {
    description: [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`,
    ][Math.floor(Math.random() * 3)],
    dueDate: Date.now() + (Math.floor(Math.random() * 15) - 7) * 24 * 60 * 60 * 1000,
    repeatingDays: {
      'mo': false,
      'tu': false,
      'we': Boolean(Math.round(Math.random())),
      'th': false,
      'fr': false,
      'sa': false,
      'su': false,
    },
    tags,
    color: [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`,
    ][Math.floor(Math.random() * 5)],
    isFavorite: Boolean(Math.round(Math.random())),
    isArchive: Boolean(Math.round(Math.random())),
  };
};
