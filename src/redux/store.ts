import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { postsListReducer, watchFetchPostsList } from './postsListSlice';
import { usersReducer, watchFetchUsers } from './usersSlice';
import { favoritesReducer } from './favoritesSlice';
import { createPostReducer, watchCreatePost } from './createPostSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    postsList: postsListReducer,
    users: usersReducer,
    favorites: favoritesReducer,
    createPost: createPostReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchPostsList);
sagaMiddleware.run(watchFetchUsers);
sagaMiddleware.run(watchCreatePost);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
