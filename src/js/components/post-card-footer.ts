import { createElement } from '../lib/dom';

export const FooterComponent = (category: string) =>
  createElement('footer', {
    className: 'card__footer p-card__inner u-no-padding--bottom p-text--small',
    text: category,
  });
