import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { requestPostsList } from '../services/posts';
import type { IDataPostsListResponse } from '../types/interfaces';

const postsListSlice = createSlice({
  name: 'postsList',
  initialState: {
    loading: false,
    error: null,
    data: [],
  } as IDataPostsListResponse,
  reducers: {
    fetchPostsListRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsListSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchPostsListRejected: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

function* fetchPostsListSaga() {
  try {
    const data: IDataPostsListResponse['data'] = yield call(requestPostsList);
    yield put(fetchPostsListSuccess(data));
  } catch (error: any) {
    yield put(fetchPostsListRejected(error.message || 'Unknown error'));
  }
}

export function* watchFetchPostsList() {
  yield takeLatest(fetchPostsListRequest.type, fetchPostsListSaga);
}

export const { fetchPostsListRequest, fetchPostsListSuccess, fetchPostsListRejected } = postsListSlice.actions;

export const postsListReducer = postsListSlice.reducer;
