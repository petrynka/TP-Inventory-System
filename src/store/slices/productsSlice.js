import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    loading: false,
    error: null,
    filters: {
        search: '',
        type: '',
        isNew: null,
        order: null
    }
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.list = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearProducts(state) {
            state.list = [];
            state.loading = false;
            state.error = null;
        },
        addProduct(state, action) {
            state.list.push(action.payload);
        },
        deleteProduct(state, action) {
            state.list = state.list.filter(product => product.id !== action.payload);
        },
        updateProduct(state, action) {
            const index = state.list.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        setFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters(state) {
            state.filters = initialState.filters;
        }
    },
});

export const {
    setProducts,
    setLoading,
    setError,
    clearProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    setFilters,
    clearFilters
} = productsSlice.actions;

export default productsSlice.reducer;