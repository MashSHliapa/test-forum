import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { postsListReducer, watchFetchDeletePost, watchFetchPostsList } from './postsListSlice';
import { usersReducer, watchFetchUsers } from './usersSlice';
import { favoritesReducer } from './favoritesSlice';
import { createPostReducer, watchFetchCreatePost } from './createPostSlice';
import { commentsReducer, watchFetchComments } from './commentsSlice';
import { cardItemReducer, watchFetchCardItem } from './cardItemSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    postsList: postsListReducer,
    users: usersReducer,
    favorites: favoritesReducer,
    createPost: createPostReducer,
    comments: commentsReducer,
    cardItem: cardItemReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchPostsList);
sagaMiddleware.run(watchFetchUsers);
sagaMiddleware.run(watchFetchCreatePost);
sagaMiddleware.run(watchFetchCardItem);
sagaMiddleware.run(watchFetchComments);
sagaMiddleware.run(watchFetchDeletePost);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
