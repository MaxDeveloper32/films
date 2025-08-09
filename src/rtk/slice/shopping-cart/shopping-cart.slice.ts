import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingCard } from '../../../types/shop';

type Cart = {
  carts: ShoppingCard[];
  cartsQuantity: number;
};

type ShoppingCardOmit = Omit<ShoppingCard, 'quantity'>;

const initialState: Cart = {
  carts: [],
  cartsQuantity: 0,
};

const shoppingCart = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ShoppingCardOmit>) {
      const existingItem = state.carts.find((cart) => cart.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts.push({ ...action.payload, quantity: 1 });
      }

      state.cartsQuantity += 1;
    },

    removeToCart(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const existingItem = state.carts.find((cart) => cart.id === itemId);
      if (!existingItem) return;

      if (existingItem?.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.carts = state.carts.filter((cart) => cart.id !== itemId);
      }

      state.cartsQuantity -= 1;
    },
    removeCart(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const existingItemIndex = state.carts.findIndex((cart) => cart.id === itemId);

      if (existingItemIndex === -1) return;

      const [existingItem] = state.carts.splice(existingItemIndex, 1);
      state.cartsQuantity -= existingItem.quantity;
    },
  },
});

export const { addToCart, removeToCart, removeCart } = shoppingCart.actions;
export default shoppingCart.reducer;



