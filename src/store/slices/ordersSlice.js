import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    selectedOrder: null,
    loading: false,
    error: null,
    showDeleteModal: false,
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
        addOrder(state, action){
            state.list.push(action.payload)
        },
        deleteOrder(state, action) {
            state.list = state.list.filter(order => order.id !== action.payload);
            if (state.selectedOrder?.id === action.payload) {
                state.selectedOrder = null;
            }
        },
        updateOrder(state, action) {
            const index = state.list.findIndex(order => order.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        showDeleteModal(state){
            state.showDeleteModal = true;
        },
        hideDeleteModal(state){
            state.showDeleteModal = false;
        }
    },
})

export const {
    setOrders,
    setSelectedOrder,
    setLoading,
    setError,
    clearOrders,
    addOrder,
    deleteOrder,
    updateOrder,
    showDeleteModal,
    hideDeleteModal,
} = ordersSlice.actions;

export default ordersSlice.reducer;