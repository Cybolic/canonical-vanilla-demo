import * as blog from './blog-posts';
import { createPostCard } from './components/post-card';

document.addEventListener('DOMContentLoaded', async () => {
  const targetElement = document.querySelector('#posts');
  const blogPosts = await blog.getPosts();
  for (const post of blogPosts) {
    targetElement?.appendChild(createPostCard(post));
  }
});
