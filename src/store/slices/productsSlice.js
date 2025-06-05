import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    filteredList: [],
    selectedType: 'all',
    loading: false,
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.list = action.payload;
        },
        setFilteredList(state, action){
            state.filteredList = action.payload;
        },
        setSelectedType(state, action){
            state.selectedType = action.payload;
        },
        setLoading(state, action){
            state.loading = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
    },
});

export const {
    setProducts,
    setFilteredList,
    setSelectedType,
    setLoading,
    setError,
} = productsSlice.actions;

export default productsSlice.reducer;

// Структура state
// {
//   orders: {
//     list: [],
//     selectedOrder: null,
//     loading: false,
//     error: null
//   },
//   products: {
//     list: [],
//     filteredList: [],
//     selectedType: 'all',
//     loading: false,
//     error: null
//   },
//   app: {
//     activeSessions: 0,
//     currentTime: null
//   }
// }