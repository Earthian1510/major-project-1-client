import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productBaseUrl = 'https://major-project-1-backend-pink.vercel.app/api/products'

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async() => {
    const response = await axios.get(productBaseUrl)
    return response.data
})

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
        filterCategory: [],
        priceFilter: 'lowToHigh',
        wishlist: [],
        productCart: []
    },

    reducers: {
        setFilterCategory: (state, action) => {
            state.filterCategory = action.payload
        },
        setPriceFilter: (state, action) => {
            state.priceFilter = action.payload
        },
        setWishlist: (state, action) => {
            const productToAdd = action.payload
            const exists = state.wishlist.find(item => item._id === productToAdd._id )
            if(!exists) {
                state.wishlist.push(action.payload)
            }
        },
        removeFromWishlist: (state, action) => {
            const productIdToRemove = action.payload
            state.wishlist = state.wishlist.filter(product => product._id !== productIdToRemove)
        },
        setCart: (state, action) => { 
            const productToAdd = action.payload
            const existingProduct = state.productCart.find(item => item._id === productToAdd._id)

            if(!existingProduct){
                state.productCart.push({...productToAdd, quantity: 1})
            }
        },
        removeFromCart: (state, action) => {
            const productIdToRemove = action.payload
            state.productCart = state.productCart.filter(product => product._id !== productIdToRemove)
        },
        increaseQuantity: (state, action) => {
            const product = state.productCart.find((item) => item._id === action.payload )
            if(product){
                product.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const product = state.productCart.find((item) => item._id === action.payload )
            if(product && product.quantity > 1){
                product.quantity -= 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.status = 'success',
            state.products = action.payload
        })
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.status = 'failed',
            state.error = action.payload.message
        })
       
    }
})

export const {setFilterCategory, setPriceFilter, setWishlist,removeFromWishlist, setCart, removeFromCart, increaseQuantity, decreaseQuantity} = productSlice.actions
export default productSlice.reducer