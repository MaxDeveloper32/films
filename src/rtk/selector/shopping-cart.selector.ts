import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state.type';

const selectCarts = (state: Pick<State, 'cart'>) => state['cart'].carts;

const selectSumGoods = createSelector([selectCarts], (carts) =>
  carts.reduce((sum: number, item) => sum + item.price * item.quantity, 0)
);

export { selectSumGoods };
