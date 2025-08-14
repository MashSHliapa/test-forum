import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { requestPostsList, requestDeletePost } from '../services/posts';
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

    fetchDeletePostRequest: (state, _action: PayloadAction<{ id: string }>) => {
      state.loading = true;
      state.error = null;
    },
    fetchdeletePostSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      const deletedPostId = action.payload;
      state.data = state.data.filter((post) => String(post.id) !== deletedPostId);
    },
    fetchdeletePostRejected: (state, action: PayloadAction<string>) => {
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

function* deletePostSaga(action: PayloadAction<{ id: string }>) {
  try {
    const { id } = action.payload;
    yield call(requestDeletePost, id);
    yield put(postsListSlice.actions.fetchdeletePostSuccess(id));
  } catch (error: any) {
    yield put(postsListSlice.actions.fetchdeletePostRejected(error.message || 'Unknown error'));
  }
}

export function* watchFetchPostsList() {
  yield takeLatest(fetchPostsListRequest.type, fetchPostsListSaga);
}

export function* watchFetchDeletePost() {
  yield takeLatest(postsListSlice.actions.fetchDeletePostRequest.type, deletePostSaga);
}

export const {
  fetchPostsListRequest,
  fetchPostsListSuccess,
  fetchPostsListRejected,
  fetchDeletePostRequest,
  fetchdeletePostSuccess,
  fetchdeletePostRejected,
} = postsListSlice.actions;

export const postsListReducer = postsListSlice.reducer;
