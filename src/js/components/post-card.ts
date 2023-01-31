import { createElement } from '../lib/dom';
import { ContentComponent } from './post-card-content';
import { FooterComponent } from './post-card-footer';
import { HeaderComponent } from './post-card-header';

type LinkedTerm = {
  id: number;
  name: string;
};

type Author = {
  id: number;
  link: string;
  name: string;
};

export type PostCard = {
  author: Author;
  date: Date;
  excerpt: string;
  link: string;
  mainCategory?: LinkedTerm;
  mainTopic?: LinkedTerm;
  thumbnail: string;
  title: string;
};

export const createPostCard = (data: PostCard) => {
  const postCard = createElement('section', {
    children: [
      HeaderComponent(data.mainTopic?.name ?? 'Cloud and Server'),
      ContentComponent({
        authorLink: data.author.link,
        authorName: data.author.name,
        date: data.date,
        link: data.link,
        thumbnail: data.thumbnail,
        title: data.title,
      }),
      FooterComponent(
        data.mainCategory?.name === 'Articles' ? 'Article' : 'Post',
      ),
    ],
    className: 'card col-4 p-card u-no-padding',
  });

  return postCard;
};
