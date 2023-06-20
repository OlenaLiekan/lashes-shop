import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentOrder: 100,
};

const orderSlice = createSlice({
    name: 'orderNumber',
    initialState,
    reducers: {
        setCurrentOrder(state) {
            state.currentOrder = state.currentOrder + 1;                
        }
    },
});

export const { setCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;