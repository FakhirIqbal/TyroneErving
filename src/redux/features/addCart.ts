import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './types';
import { Alert } from 'react-native';
import { showToast } from '../../utils/helper';

export const addCart = createSlice({
  name: 'addCart',

  initialState: {
    cartItems: [] as Product[],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        cartItem => cartItem.id === item.id,
      );

      if (existingItem) {
        showToast('info', 'Item Already In Cart');
      } else {
        state.cartItems.push(item);
        showToast('success', 'Item Added To Cart');
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== id);
      showToast('success', 'Item Removed From Cart');
    },
    updateCartQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.cartItems.find(p => p.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
    clearCart: state => {
      state.cartItems = [];
      showToast('success', 'Cart Cleared');
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartQuantity } = addCart.actions;
export default addCart.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { images } from '../../utils/Images';

// export const cartSlice = createSlice({
//   name: 'cart',

//   initialState: {
//     products: [
//       // {
//       //   asin: 1,
//       //   link: "www.dummy.com",
//       //   image: images.product1,
//       //   price: 10,
//       //   title: "Watch",
//       // },
//       // {
//       //   asin: 2,
//       //   link: "www.dummy.com",
//       //   image: images.product2,
//       //   price: 20,
//       //   title: "head Phones",
//       // },
//       // {
//       //   asin: 3,
//       //   link: "www.dummy.com",
//       //   image: images.product3,
//       //   price: 20,
//       //   title: "VR",
//       // },
//       // {
//       //   asin: 4,
//       //   link: "www.dummy.com",
//       //   image: images.product4,
//       //   price: 20,
//       //   title: "Ear pods",
//       // },
//       // {
//       //   asin: 5,
//       //   link: "www.dummy.com",
//       //   image: images.product2,
//       //   price: 20,
//       //   title: "head Phones",
//       // },
//       // {
//       //   asin: 6,
//       //   link: "www.dummy.com",
//       //   image: images.product3,
//       //   price: 20,
//       //   title: "VR",
//       // },
//       // {
//       //   asin: 7,
//       //   link: "www.dummy.com",
//       //   image: images.product3,
//       //   price: 20,
//       //   title: "VR",
//       // },
//       // {
//       //   asin: 8,
//       //   link: "www.dummy.com",
//       //   image: images.product4,
//       //   price: 20,
//       //   title: "Ear pods",
//       // },
//       // {
//       //   asin: 9,
//       //   link: "www.dummy.com",
//       //   image: images.product2,
//       //   price: 20,
//       //   title: "head Phones",
//       // },
//     ],
//     items: [],
//     favorites: [
//       // {
//       //   asin: 9,
//       //   link: "www.dummy.com",
//       //   image: images.product2,
//       //   price: 20,
//       //   title: "head Phones",
//       // },
//     ],
//     totalPrice: 0,
//   },
//   reducers: {
//     getProducts: (state, actions) => {
//       state.products = actions.payload;
//     },
//     totalprice: (state, actions) => {
//       const totalPrice = state.items.reduce((acc, item) => {
//         return acc + item.price * item.quantity;
//       }, 0);

//       state.totalPrice = totalPrice;
//     },
//     addItemInACart: (state, actions) => {
//       const newItem = actions.payload;

//       const existingItem = state.items.find(item => item.asin === newItem.asin);

//       if (!existingItem) {
//         state.items.push(newItem);
//       } else {
//         if (newItem.quantity < existingItem.quantity) {
//           existingItem.quantity = newItem.quantity;
//         } else if (newItem.quantity > existingItem.quantity) {
//           existingItem.quantity = newItem.quantity;
//         }
//       }
//     },

//     addToFavorites: (state, actions) => {
//       const newFavorite = actions.payload;
//       const existingFavorite = state.favorites.find(
//         item => item.asin === newFavorite.asin,
//       );

//       if (!existingFavorite) {
//         state.favorites = [...state.favorites, actions.payload];
//       }
//     },
//     incrementCartItemquantity: (state, actions) => {
//       const toIncrementItem = actions.payload;
//       const toIncrementQuantity = state.items.find(
//         item => item.asin === toIncrementItem.asin,
//       );
//       toIncrementQuantity.quantity += 1;
//     },
//     decrementCartItemQuantity: (state, actions) => {
//       const toDecrementItem = actions.payload;
//       const toDecrementQuantity = state.items.find(
//         item => item.asin === toDecrementItem.asin,
//       );
//       toDecrementQuantity.quantity -= 1;
//     },

//     removeItemFromCart: (state, actions) => {
//       const deleteItem = actions.payload;

//       state.items = state.items.filter(i => i.asin !== deleteItem.asin);
//     },

//     removeFromFavorites: (state, actions) => {
//       const removedFavorite = actions.payload;
//       state.favorites = state.favorites.filter(
//         item => item.asin !== removedFavorite.asin,
//       );
//     },
//   },
// });
// export const {
//   removeFromFavorites,
//   addToFavorites,
//   totalprice,
//   addItemInACart,
//   incrementCartItemquantity,
//   decrementCartItemQuantity,
//   removeItemFromCart,
//   getProducts,
// } = cartSlice.actions;
// // export default cartSlice.reducer;

// // export default cartSlice;

// // export const cartActions = cartSlice.actions;
