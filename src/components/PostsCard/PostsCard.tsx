import type { IPostCard } from '../../types/interfaces';
import './PostsCard.scss';

export function PostsCard(props: { post: IPostCard }) {
  return (
    <div className="posts-card">
      <div className="posts-card__body">
        <h3 className="posts-card__title">{props.post.title}</h3>
        <p className="posts-card__description">{props.post.body}</p>
      </div>
    </div>
  );
}
