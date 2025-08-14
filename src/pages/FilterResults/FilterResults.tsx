import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUsersRequest } from '../../redux/usersSlice';
import { fetchPostsListRequest } from '../../redux/postsListSlice';
import { PostsCard } from '../../components/PostsCard/PostsCard';
import type { AppDispatch, RootState } from '../../redux/store';

export function FilterResults() {
  const { data: users, loading: usersLoading, error: usersError } = useSelector((state: RootState) => state.users);
  const { data: posts, loading: postsLoading, error: postsError } = useSelector((state: RootState) => state.postsList);
  const dispatch = useDispatch<AppDispatch>();
  const { request } = useParams<string>();

  const filteredUsers = request
    ? users.filter((item) => item.name.toLowerCase().includes(request.toLowerCase()))
    : users;

  const filteredUserIds = new Set(filteredUsers.map((user) => user.id));

  const filteredPosts = posts.filter((item) => filteredUserIds.has(item.userId));

  useEffect(() => {
    dispatch(fetchUsersRequest());
    dispatch(fetchPostsListRequest());
  }, [dispatch]);

  if (usersLoading || postsLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (usersError) {
    return <div className="text-danger">Users error: {usersError}</div>;
  }

  if (postsError) {
    return <div className="text-danger">Posts error: {postsError}</div>;
  }

  const filteringResults = filteredPosts.map((item) => <PostsCard key={item.id} post={item} />);

  return (
    <div className="catalog">
      <div className="catalog__container _container">
        <div className="catalog__body body">
          <h1 className="catalog__title title">Filtering Results</h1>
          {filteringResults.length > 1 ? (
            <p className="catalog__text">{filteredPosts.length} posts found for Your request</p>
          ) : (
            <p></p>
          )}
          <div className="catalog__list">
            {filteringResults.length > 1 ? filteringResults : <div className="catalog__text">Nothing found</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
