import { createElement } from '../lib/dom';

export const HeaderComponent = (topic: string) =>
  createElement('header', {
    className:
      'card__header p-card__inner u-no-margin p-text--x-small-capitalised u-text--muted',
    text: topic,
  });
