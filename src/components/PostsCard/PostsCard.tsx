import type { IPostsCard } from '../../types/interfaces';
import './PostsCard.scss';

export function PostsCard(props: { post: IPostsCard }) {
  return (
    <div className="posts-card card">
      <div className="posts-card__body card-body card-body-hover">
        <h3 className="posts-card__title">{props.post.title}</h3>
        <p className="posts-card__description">{props.post.body}</p>
      </div>
    </div>
  );
}
