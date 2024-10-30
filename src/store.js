import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./features/product/productSlice";
import { categorySlice } from "./features/category/categorySlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Configuration for redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

// Create a persisted reducer for your products slice
const persistedProductReducer = persistReducer(persistConfig, productSlice.reducer);

const store = configureStore({
    reducer: {
        products: persistedProductReducer,
        categories: categorySlice.reducer,
    },
});

const persistor = persistStore(store);

export { store, persistor };
