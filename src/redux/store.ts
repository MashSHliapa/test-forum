import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { postsListReducer, watchFetchPostsList } from './postsListSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    postsList: postsListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchPostsList);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
