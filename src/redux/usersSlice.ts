import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { requestUsers } from '../services/posts';
import type { IDataUsersResponse } from '../types/interfaces';

const UsersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    error: null,
    data: [],
  } as IDataUsersResponse,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchUsersRejected: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

function* fetchUsersSaga() {
  try {
    const data: IDataUsersResponse['data'] = yield call(requestUsers);
    yield put(fetchUsersSuccess(data));
  } catch (error: any) {
    yield put(fetchUsersRejected(error.message || 'Unknown error'));
  }
}

export function* watchFetchUsers() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
}

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersRejected } = UsersSlice.actions;

export const usersReducer = UsersSlice.reducer;
