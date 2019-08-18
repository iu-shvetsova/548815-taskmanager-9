import {HASHTAGS, DESCRIPTIONS, COLORS} from '../utils/constants.js';

export const createTask = () => {
  const TAGS_COUNT = Math.floor(Math.random() * 4);
  const tags = new Set();
  for (let i = 0; i < TAGS_COUNT; i++) {
    tags.add(HASHTAGS[Math.floor(Math.random() * HASHTAGS.length)]);
  }

  return {
    description: DESCRIPTIONS[Math.floor(Math.random() * 3)],
    dueDate: Date.now() + (Math.floor(Math.random() * 15) - 7) * 24 * 60 * 60 * 1000,
    repeatingDays: {
      'mo': Boolean(Math.round(Math.random())),
      'tu': Boolean(Math.round(Math.random())),
      'we': Boolean(Math.round(Math.random())),
      'th': Boolean(Math.round(Math.random())),
      'fr': Boolean(Math.round(Math.random())),
      'sa': Boolean(Math.round(Math.random())),
      'su': Boolean(Math.round(Math.random())),
    },
    tags,
    color: COLORS[Math.floor(Math.random() * 5)],
    isFavorite: Boolean(Math.round(Math.random())),
    isArchive: Boolean(Math.round(Math.random())),
  };
};
