import { createSlice } from '@reduxjs/toolkit';
import { Product } from './types';
import { Alert } from 'react-native';

export const whishList = createSlice({
  name: 'whishList',
  initialState: {
    items: [] as Product[],
  },
  reducers: {
    addToWhishList: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        wishItem => wishItem.id === item.id,
      );

      if (existingItem) {
        return Alert.alert('', 'Item already exists in the wishlist');
      }
      state.items.push(item);
    },
    removeFromWhishList: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    clearWhishList: state => {
      state.items = [];
    },
  },
});

export const { addToWhishList, removeFromWhishList, clearWhishList } =
  whishList.actions;
export default whishList.reducer;
