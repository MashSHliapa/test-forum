import React, { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardItemRequest } from '../../redux/cardItemSlice';
import { fetchCommentsRequest } from '../../redux/commentsSlice';
import { fetchDeletePostRequest } from '../../redux/postsListSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/favoritesSlice';
import { LikeDislikeSwitcher } from '../../components/LikeDislikeSwitcher/LikeDislikeSwitcher';
import { FavoritesIcon } from './icons/FavoritesIcon';
import { DeletePost } from './icons/DeletePost';
import type { AppDispatch, RootState } from '../../redux/store';
import type { IUsersCard } from '../../types/interfaces';
import './CardItem.scss';

export function CardItem() {
  const [yourComment, setYourComment] = useState('');
  const {
    data: commentList,
    loading: commentsLoading,
    error: commentsError,
  } = useSelector((state: RootState) => state.comments);

  const { data: post, loading: postLoading, error: postError } = useSelector((state: RootState) => state.cardItem);

  const { data: favorite } = useSelector((state: RootState) => state.favorites);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsRequest({ id }));
      dispatch(fetchCardItemRequest({ id }));
    }
  }, [dispatch, id]);

  if (commentsLoading || postLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (commentsError) {
    return <div className="text-danger">Users error: {commentsError}</div>;
  }

  if (postError) {
    return <div className="text-danger">Posts error: {postError}</div>;
  }

  if (!post || !commentList) {
    return <div>Post not found</div>;
  }

  ///// favorites
  const isFavorite = favorite.some((item: IUsersCard) => item.id === post.id);

  function handleToggleFavorites() {
    if (isFavorite) {
      dispatch(removeFromFavorites(post));
    } else {
      dispatch(addToFavorites(post));
    }
  }

  function handleInputForm(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setYourComment(event.target.value);
  }

  function handleSubmitForm(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setYourComment('');
  }

  ///// delete post
  function handleClickDeletePost() {
    if (!post?.id) return;
    dispatch(fetchDeletePostRequest({ id: String(post.id) }));
    alert('Post deleted!');
    navigate('/');
  }

  return (
    <div className="card-item">
      <div className="card-item__container _container">
        <div className="card-item__body body">
          <div className="card-item__title title">Post {post.id}</div>
          <div className="card-item__card card-body">
            <div className="card-item__post">
              <h3 className="card-item__post-title">{post.title}</h3>
              <p className="card-item__description">{post.body}</p>
            </div>
            <div className="card-item__actions actions">
              <div className="actions__icons">
                {id && <LikeDislikeSwitcher id={id} />}
                <div className="actions__icon" onClick={handleToggleFavorites}>
                  <FavoritesIcon fill={isFavorite ? 'red' : 'none'} />
                </div>
                <div className="actions__icon" onClick={handleClickDeletePost}>
                  <DeletePost />
                </div>
              </div>
            </div>

            <div className="card-item__comments comments">
              <h3 className="comments__title">Comments:</h3>
              <ul className="comments__list">
                {Array.isArray(commentList) && commentList.length > 0 ? (
                  commentList.map((item) => (
                    <li key={item.id} className="comments__item">
                      <p className="comments__email">{item.email}</p>
                      <h3 className="comments__body">{item.body}</h3>
                    </li>
                  ))
                ) : (
                  <li className="comments__item">Комментариев нет</li>
                )}
              </ul>
            </div>

            <div className="actions__your-comment">
              <form action="#" className="actions__form" onSubmit={handleSubmitForm}>
                <textarea
                  className="actions__textarea textarea"
                  placeholder="Your comment"
                  value={yourComment}
                  onChange={handleInputForm}
                />
                <button type="submit" className="actions__button button">
                  Send comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
