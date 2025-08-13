import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { requestCreatePost } from '../services/posts';
import type { PayloadAction, PayloadAction as ReduxPayloadAction } from '@reduxjs/toolkit';
import type { ICreatePostResponse } from '../types/interfaces';

const createPostSlice = createSlice({
  name: 'createPost',
  initialState: {
    data: [],
    loading: false,
    error: null,
  } as ICreatePostResponse,
  reducers: {
    fetchCreatePostRequest(state, action: PayloadAction<{ userId: number; title: string; description: string }>) {
      state.loading = true;
      state.error = null;
    },
    fetchCreatePostSuccess(state, action) {
      state.loading = false;
      state.data.push(action.payload);
    },
    fetchCreatePostRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

function* handleCreatePost(action: ReduxPayloadAction<{ userId: number; title: string; description: string }>) {
  try {
    const { userId, title, description } = action.payload;
    const data: ICreatePostResponse = yield call(requestCreatePost, { userId, title, body: description });
    yield put(fetchCreatePostSuccess(data));
    alert('Post created successfully!');
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
    yield put(fetchCreatePostRejected(errorMsg));
  }
}

export function* watchCreatePost() {
  yield takeLatest(fetchCreatePostRequest.type, handleCreatePost);
}

export function* createPostSaga() {
  yield all([watchCreatePost()]);
}

export const { fetchCreatePostRequest, fetchCreatePostSuccess, fetchCreatePostRejected } = createPostSlice.actions;
export const createPostReducer = createPostSlice.reducer;
