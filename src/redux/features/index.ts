import { combineReducers } from '@reduxjs/toolkit';
import { generalSlice } from './userSlice';
import MMKVStorage from '../MMKV';
import { addCart } from './addCart';
import { whishList } from './whishList';

const appReducer = combineReducers({
  userData: generalSlice.reducer,
  cart: addCart.reducer,
  whishList: whishList.reducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    MMKVStorage.removeItem('persist:root');

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
