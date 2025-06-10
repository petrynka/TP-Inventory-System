import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    filteredList: [], // Для відфільтрованих продуктів
    orders: [], // Список приходів (для отримання назв)
    selectedType: 'all', // Вибраний тип для фільтрації
    productTypes: [], // Унікальні типи продуктів
    loading: false,
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.list = action.payload;
            state.filteredList = action.payload;
            // Автоматично створюємо список унікальних типів
            const types = [...new Set(action.payload.map(product => product.type))];
            state.productTypes = types;
        },
        setOrders(state, action) {
            state.orders = action.payload;
        },
        setSelectedType(state, action) {
            state.selectedType = action.payload;
            // Фільтруємо продукти по типу
            if (action.payload === 'all') {
                state.filteredList = state.list;
            } else {
                state.filteredList = state.list.filter(product => product.type === action.payload);
            }
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearProducts(state) {
            state.list = [];
            state.filteredList = [];
            state.orders = [];
            state.selectedType = 'all';
            state.productTypes = [];
            state.loading = false;
            state.error = null;
        }
    },
})

export const {
    setProducts,
    setOrders,
    setSelectedType,
    setLoading,
    setError,
    clearProducts,
} = productsSlice.actions;

export default productsSlice.reducer;