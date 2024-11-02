import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./features/product/productSlice";
import { categorySlice } from "./features/category/categorySlice";
import { addressSlice } from "./features/user/addressSlice";

const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        categories: categorySlice.reducer,
        address: addressSlice.reducer
    },
});


export default store;
