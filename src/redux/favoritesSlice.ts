import { createSlice } from '@reduxjs/toolkit';
import { getFromLocalStorage } from '../helpers/getFromLocalStorage';
import { setToLocalStorage } from '../helpers/setToLocalStorage';
import type { IUsersCard } from '../types/interfaces';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    data: getFromLocalStorage('favorites'),
  },
  reducers: {
    addToFavorites: (state, action) => {
      const favorite = action.payload;
      state.data.push(favorite);
      setToLocalStorage('favorites', state.data);
    },
    removeFromFavorites: (state, action) => {
      const favorite = action.payload;
      const cardIndexDelete = state.data.findIndex((item: IUsersCard) => item.id == favorite.id);
      state.data.splice(cardIndexDelete, 1);
      setToLocalStorage('favorites', state.data);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
