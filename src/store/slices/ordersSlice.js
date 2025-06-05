import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    selectedOrder: null,
    loading: false,
    error: null
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders(state, action){
            state.list = action.payload;
        },
        setSelectedOrder(state, action){
            state.selectedOrder = action.payload;
        },
        setLoading(state, action){
            state.loading = action.payload;
        },
        setError(state, action){
            state.error = action.payload
        },
        clearOrders(state) {
            state.list = [];
            state.selectedOrder = null;
            state.loading = false;
            state.error = null;
        },
    },
})

export const {
    setOrders,
    setSelectedOrder,
    setLoading,
    setError,
    clearOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;