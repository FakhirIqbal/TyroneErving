import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Wishlist } from './types';
import { showToast } from '../../utils/helper';

interface WishlistState {
  wishlist: Wishlist[];
}

const initialState: WishlistState = {
  wishlist: [],
};

export const whishList = createSlice({
  name: 'whishList',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Wishlist>) => {
      const exists = state?.wishlist.find(p => p.id === action.payload.id);
      if (exists) {
        showToast('info', 'Item Already In Wishlist');
      } else {
        state.wishlist.push({ ...action.payload, fav: true });
        showToast('success', 'Item Added To Wishlist');
      }
    },
    removeFromWishlist: (state, action: PayloadAction<Wishlist>) => {
      // if (!state.wishlist) {
      //   state.wishlist = [];
      // }
      const exists = state?.wishlist.find(p => p.id === action.payload.id);
      if (exists) {
        state.wishlist = state.wishlist.filter(p => p.id !== action.payload.id);
        showToast('info', 'Item Removed From Wishlist');
      }
    },
    clearWhishList: (state) => {
      state.wishlist = [];
    },
  },
});


export const {
  clearWhishList,
  addToWishlist,
  removeFromWishlist,
} = whishList.actions;
export default whishList.reducer;
