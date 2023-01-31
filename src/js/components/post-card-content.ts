import { format as formatDate } from '../lib/date';
import { createElement } from '../lib/dom';

const ImageComponent = (source: string, link: string) =>
  createElement('a', {
    children: [
      [
        'img',
        {
          className: 'card__image p-card__image u-no-padding',
          src: source,
        },
      ],
    ],
    className:
      'card__image-wrapper p-card__inner u-no-padding--top u-no-padding--bottom',
    href: link,
  });

const TitleComponent = (title: string, link: string) =>
  createElement('h2', {
    children: [['a', { href: link, text: title }]],
    className:
      'card__title p-card__inner p-heading--4 u-no-margin--bottom u-no-padding--top u-no-padding--bottom',
  });

const AuthorComponent = (name: string, link: string, date: Date) =>
  createElement('address', {
    children: [
      [null, { text: 'By ' }],
      ['a', { href: link, text: name }],
      [null, { text: ' on ' }],
      [
        'time',
        {
          datetime: date.toISOString(),
          text: formatDate(date, '%d %B %Y'),
        },
      ],
    ],
    className: 'card__author p-card__inner u-no-margin--bottom p-text--small',
  });

export const ContentComponent = ({
  link,
  date,
  title,
  thumbnail,
  authorName,
  authorLink,
}: {
  authorLink: string;
  authorName: string;
  date: Date;
  link: string;
  thumbnail: string;
  title: string;
}) =>
  createElement('p', {
    children: [
      ImageComponent(thumbnail, link),
      TitleComponent(title, link),
      AuthorComponent(authorName, authorLink, date),
    ],
    className: 'card__content p-card__content',
  });
