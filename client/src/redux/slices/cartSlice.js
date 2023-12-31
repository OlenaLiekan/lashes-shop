import { createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../js/calcTotalPrice";
import { getCartFromLS } from "../../js/getCartFromLS";

const {items, totalPrice} = getCartFromLS();

const initialState = {
    totalPrice,
    items,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        /*addItem(state, action) {
            state.items.push(action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price + sum;
            }, 0);
        },*/
        addItem(state, action) {
            const findItem = state.items.find((obj) => obj.code === action.payload.code);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.code === action.payload);
            if (findItem.count > 1) {
                findItem.count--;
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
               return (obj.price * obj.count) + sum;
            }, 0);
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.code !== action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;