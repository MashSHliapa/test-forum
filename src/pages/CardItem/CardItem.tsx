import React, { useEffect, useState, type ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsListRequest } from '../../redux/postsListSlice';
import { fetchUsersRequest } from '../../redux/usersSlice';
import { LikeIcon } from './icons/LikeIcon';
import { DisLikeIcon } from './icons/DislikeIcon';
import { FavoritesIcon } from './icons/FavoritesIcon';
import type { AppDispatch, RootState } from '../../redux/store';
import './CardItem.scss';

export function CardItem() {
  const [comment, setComment] = useState('');
  const { data: users, loading: usersLoading, error: usersError } = useSelector((state: RootState) => state.users);
  const { data: posts, loading: postsLoading, error: postsError } = useSelector((state: RootState) => state.postsList);
  const { id } = useParams();
  const [favorites, setFavorites] = useState(false);

  function handleToggleFavorites() {
    setFavorites((prev) => !prev);
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPostsListRequest());
    dispatch(fetchUsersRequest());
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

  const post = posts ? posts.find((item) => item.id === Number(id)) : null;
  const user = users ? users.find((item) => item.id === post?.userId) : null;

  function handleInputForm(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }

  function handleSubmitForm(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setComment('');
  }

  if (!post || !user) {
    return <div>Post not found</div>;
  }

  return (
    <div className="card-item">
      <div className="card-item__container _container">
        <div className="card-item__body body">
          <div className="card-item__title title">Post {post.id}</div>
          <div className="card-item__card card-body">
            <div className="card-item__user user">
              <h3 className="user__name">
                <span className="label">author: </span>
                {user.name}
                <span className="user__username">({user.username})</span>
              </h3>
              <p className="user__website">
                <span className="label">website: </span>
                {user.website}
              </p>
              <p className="users__company">
                <span className="label">company: </span>
                {user.company.name}
              </p>
              <p className="users__email">
                <span className="label">email: </span>
                {user.email}
              </p>
            </div>
            <div className="card-item__post">
              <h3 className="card-item__subtitle">{post.title}</h3>
              <p className="card-item__description">{post.body}</p>
            </div>
            <div className="card-item__actions actions">
              <div className="actions__icons">
                <div className="actions__icon">
                  <LikeIcon />
                </div>
                <div className="actions__icon">
                  <DisLikeIcon />
                </div>
                <div className="actions__icon" onClick={handleToggleFavorites}>
                  <FavoritesIcon fill={favorites ? 'red' : 'none'} />
                </div>
              </div>
              <div className="actions__comment">
                <form action="#" className="actions__form" onSubmit={handleSubmitForm}>
                  <textarea
                    className="actions__textarea"
                    placeholder="Your comment"
                    value={comment}
                    onChange={handleInputForm}
                  />
                  <button type="submit" className="actions__button">
                    Send comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
