import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import appReducer from './slices/appSlice';

const store = configureStore({
    reducer: {
        orders: ordersReducer,
        products: productsReducer,
        app: appReducer,
    },
})

export default store;