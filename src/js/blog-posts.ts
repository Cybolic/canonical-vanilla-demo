import { type PostCard } from './components/post-card';
import { type WP_REST_API_Posts } from 'wp-types';

const URL_POSTS =
  'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json';

// Tweak the official type to match the actual response type
type PostJson = Omit<WP_REST_API_Posts[0], 'featured_media'> & {
  _embedded: {
    author: Array<{
      [other: string]: unknown;
      id: number;
      link: string;
      name: string;
    }>;
    'wp:term': Array<
      Array<{
        id: number;
        link: string;
        name: string;
        taxonomy: string;
      }>
    >;
  };
  author: number;
  categories: number[];
  date: string;
  excerpt: {
    rendered: string;
  };
  featured_media: string;
  link: string;
  title: {
    rendered: string;
  };
  topic: number[];
};

// NOTE: We could have fallback values for everything, but in this controlled
// demo, we know that the data is consistent enough to not need them.
const fallbackAuthor = {
  id: 0,
  link: '',
  name: 'Unknown',
};

const getTerm = (id: number, taxonomy: string, postJson: PostJson) => {
  const matchedTypes = postJson._embedded['wp:term'].find(
    (terms) => terms.length && terms[0].taxonomy === taxonomy,
  );
  const term = matchedTypes?.find((possibleTerm) => possibleTerm.id === id);
  return term;
};

const postToPostCardData = (postData: PostJson): PostCard => {
  const mainAuthor =
    postData._embedded.author.find(
      (possibleAuthor) => possibleAuthor.id === postData.author,
    ) ?? fallbackAuthor;
  const mainCategory = getTerm(postData.categories[0], 'category', postData);
  // NOTE: The example screenshot shows "CLOUD AND SERVER" as the main header,
  // but that's only used in _one_ of the example posts, and only as one of
  // three `group` values.
  // Instead I'm using the more consistent `topic` data for the header.
  const mainTopic = getTerm(postData.topic[0], 'topic', postData);

  return {
    author: {
      id: postData.author,
      link: mainAuthor.link,
      name: mainAuthor.name,
    },
    date: new Date(postData.date),
    excerpt: postData.excerpt.rendered,
    link: postData.link,
    mainCategory,
    mainTopic,
    thumbnail: postData.featured_media,
    title: postData.title.rendered,
  };
};

export const getPosts = async (): Promise<PostCard[]> => {
  const response = await fetch(URL_POSTS);
  const postsData = (await response.json()) as PostJson[];
  const posts = postsData
    .map((post: PostJson) => postToPostCardData(post))
    .sort((a, b) => {
      const sort = b.date.getTime() - a.date.getTime();
      if (sort === 0) {
        return b.title.localeCompare(a.title);
      } else {
        return sort;
      }
    });
  return posts;
};
