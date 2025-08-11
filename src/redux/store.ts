import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { postsListReducer, watchFetchPostsList } from './postsListSlice';
import { usersReducer, watchFetchUsers } from './usersSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    postsList: postsListReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchPostsList);
sagaMiddleware.run(watchFetchUsers);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
