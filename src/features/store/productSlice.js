import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API } from '../../utils/api'

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async() => {
        const response = await axios.get(API.products);
        return response.data;
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (productData) => {
        const response = await axios.post(API.products, productData)
        return response.data;
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload)
        })
    }
})

export default productSlice.reducer