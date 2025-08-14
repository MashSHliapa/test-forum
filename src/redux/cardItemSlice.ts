import { call, put, takeLatest } from 'redux-saga/effects';
import { createSlice } from '@reduxjs/toolkit';
import { requestCardItem } from '../services/posts';
import type { IDataPostResponse } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const cardItemSlice = createSlice({
  name: 'cardItem',
  initialState: {
    loading: false,
    error: null,
    data: {},
  } as IDataPostResponse,
  reducers: {
    fetchCardItemRequest(state, _action: PayloadAction<{ id: string }>) {
      state.loading = true;
      state.error = null;
    },
    fetchCardItemSuccess(state, action: PayloadAction<typeof state.data>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCardItemFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

function* fetchCardItemSaga(action: PayloadAction<{ id: string }>) {
  try {
    const data: IDataPostResponse['data'] = yield call(requestCardItem, action.payload.id);
    yield put(cardItemSlice.actions.fetchCardItemSuccess(data));
  } catch (error: any) {
    yield put(cardItemSlice.actions.fetchCardItemFailure(error.message || 'Unknown error'));
  }
}

export function* watchFetchCardItem() {
  yield takeLatest(cardItemSlice.actions.fetchCardItemRequest.type, fetchCardItemSaga);
}

export const { fetchCardItemRequest, fetchCardItemSuccess, fetchCardItemFailure } = cardItemSlice.actions;
export const cardItemReducer = cardItemSlice.reducer;
