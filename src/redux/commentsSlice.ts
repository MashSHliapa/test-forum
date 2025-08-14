import { call, put, takeLatest } from 'redux-saga/effects';
import { createSlice } from '@reduxjs/toolkit';
import { requestComments } from '../services/posts';
import type { IDataCommentsResponse } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    loading: false,
    error: null,
    data: [],
  } as IDataCommentsResponse,
  reducers: {
    fetchCommentsRequest(state, _action: PayloadAction<{ id: string }>) {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess(state, action: PayloadAction<typeof state.data>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCommentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

function* fetchCommentsSaga(action: PayloadAction<{ id: string }>) {
  try {
    const data: IDataCommentsResponse['data'] = yield call(requestComments, action.payload.id);
    yield put(commentsSlice.actions.fetchCommentsSuccess(data));
  } catch (error: any) {
    yield put(commentsSlice.actions.fetchCommentsFailure(error.message || 'Unknown error'));
  }
}

export function* watchFetchComments() {
  yield takeLatest(commentsSlice.actions.fetchCommentsRequest.type, fetchCommentsSaga);
}

export const { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
