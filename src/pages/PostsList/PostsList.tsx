import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsListRequest } from '../../redux/postsListSlice';
import { PostsCard } from '../../components/PostsCard/PostsCard';
import type { AppDispatch, RootState } from '../../redux/store';
import type { IPostsCard } from '../../types/interfaces';
import './PostsList.scss';

export function PostsList() {
  const { data: posts, loading, error } = useSelector((state: RootState) => state.postsList);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPostsListRequest());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  const postsList = posts.map((item: IPostsCard) => <PostsCard key={item.id} post={item} />);

  return (
    <div className="catalog">
      <div className="catalog__container _container">
        <div className="catalog__body">
          <div className="catalog__title">Posts</div>
          <div className="catalog__list">{postsList}</div>
        </div>
      </div>
    </div>
  );
}
