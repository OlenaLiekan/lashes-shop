import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'popularity',
        sortProperty: 'rating',
    }
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
            state.currentPage = initialState.currentPage;        
        },
        setSearch(state) {
            state.categoryId = initialState.categoryId;
            state.currentPage = initialState.currentPage;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
             state.currentPage = action.payload;                
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        },
    },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearch } = filterSlice.actions;

export default filterSlice.reducer;