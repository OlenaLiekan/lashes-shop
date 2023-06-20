import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import orderNumber from './slices/orderSlice';


export const store = configureStore({
    reducer: {
        filter,
        cart,
        orderNumber
    },
});