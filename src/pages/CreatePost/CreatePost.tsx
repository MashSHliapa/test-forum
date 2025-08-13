import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreatePostRequest } from '../../redux/createPostSlice';
import type { AppDispatch } from '../../redux/store';
import './CreatePost.scss';

export function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleInputTitle(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTitle(event.target.value);
  }

  function handleInputDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: any) => state.createPost);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchCreatePostRequest({ userId: 11, title, description }));
    setTitle('');
    setDescription('');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="create-post">
      <div className="create-post__container _container">
        <div className="create-post__body body">
          <div className="create-post__title title">Create a new post</div>
          <form action="#" className="create-post__form card-body" onSubmit={onSubmit}>
            <textarea
              className="create-post__textarea textarea"
              placeholder="Title"
              value={title}
              onChange={handleInputTitle}
            />
            <textarea
              className="create-post__textarea textarea"
              placeholder="Description"
              value={description}
              onChange={handleInputDescription}
            />
            <button type="submit" className="create-post__button button">
              Create a new post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
