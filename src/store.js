import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/store/productSlice";
import categoryReducer from "./features/store/categorySlice";
import filterReducer from './features/store/filterSlice';
import authReducer from './features/store/authSlice'
import userReducer from './features/store/userSlice'
import cartReducer from './features/store/cartSlice'
const store = configureStore({
    reducer: {
        product: productReducer,
        categories: categoryReducer,
        filters: filterReducer,
        auth: authReducer,
        users: userReducer,
        cart: cartReducer
    },
});

export default store;
