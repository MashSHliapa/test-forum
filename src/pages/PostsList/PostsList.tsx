import { useEffect, useState } from 'react';
import { PostsCard } from '../../components/PostsCard/PostsCard';
import type { IPostCard } from '../../types/interfaces';
import './PostsList.scss';

export function PostsList() {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPostsList(data));
  }, []);

  const posts = postsList.map((item: IPostCard) => <PostsCard key={item.id} post={item} />);

  return (
    <div className="posts-list">
      <div className="posts-list__container _container">
        <div className="posts-list__body">
          <div className="posts-list__title">Posts</div>
          <div className="posts-list__list">{posts}</div>
        </div>
      </div>
    </div>
  );
}
