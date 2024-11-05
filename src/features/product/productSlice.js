import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const productBaseUrl = 'https://major-project-1-backend-pink.vercel.app/api/products'
const productBaseUrl = process.env.PRODUCT_BASE_URL

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async() => {
    const response = await axios.get(productBaseUrl)
    return response.data
})

export const fetchWishlist = createAsyncThunk('products/fetchWishlist', async () => {
    const response = await axios.get(`${productBaseUrl}/wishlist`)
    return response.data 
})

export const fetchCart = createAsyncThunk('products/fetchCart', async () => {
    const response = await axios.get(`${productBaseUrl}/cart`)
    return response.data 
})

export const addToWishlist = createAsyncThunk('products/addToWishlist', async (productId) => {
    const response = await axios.put(`${productBaseUrl}/${productId}`, { inWishlist: true})
    return response.data
})

export const removeFromWishlist = createAsyncThunk('products/removeFromWishlist', async (productId) => {
    const response = await axios.put(`${productBaseUrl}/${productId}`, { inWishlist: false})
    return response.data
})

export const addToCart = createAsyncThunk('products/addToCart', async (productId) => {
    const response = await axios.put(`${productBaseUrl}/${productId}`, { inCart: true})
    return response.data
})

export const removeFromCart = createAsyncThunk('products/removeFromCart', async (productId) => {
    const response = await axios.put(`${productBaseUrl}/${productId}`, { inCart: false})
    return response.data
})

export const moveToCartFromWishlist = createAsyncThunk('products/moveToCartFromWishlist', async (productId) => {
    await axios.put(`${productBaseUrl}/${productId}`, { inWishlist: false, inCart: true})
    return productId
})

export const moveToWishlistFromCart = createAsyncThunk('products/moveToWishlistFromCart', async (productId) => {
    await axios.put(`${productBaseUrl}/${productId}`, { inWishlist: true, inCart: false})
    return productId
})

export const increaseCartQuantity = createAsyncThunk('products/increaseCartQuantity', async(product) => {
    const response = await axios.put(`${productBaseUrl}/${product._id}`, {quantity: product.quantity + 1})
    return response.data 
})

export const decreaseCartQuantity = createAsyncThunk('products/decreaseCartQuantity', async(product) => {
    const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1
    const response = await axios.put(`${productBaseUrl}/${product._id}`, {quantity: newQuantity})
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
        productCart: [],
        searchedProduct: ''
    },

    reducers: {
        setFilterCategory: (state, action) => {
            state.filterCategory = action.payload
        },
        setPriceFilter: (state, action) => {
            state.priceFilter = action.payload
        },
        setSearchedProduct: (state, action) => {
            state.searchedProduct = action.payload
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
        builder.addCase(fetchWishlist.fulfilled, (state, action) => {
            state.wishlist = action.payload
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.productCart = action.payload
        })
        builder.addCase(addToWishlist.fulfilled, (state, action) => {
            state.wishlist.push(action.payload)
            const product = state.products.find((p) => p._id === action.payload._id)
            if(product) {
                product.inWishlist = true 
            }
        })
        builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
            state.wishlist = state.wishlist.filter(item => item._id !== action.payload._id)
            const product = state.products.find((p) => p._id === action.payload._id)
            if(product) {
                product.inWishlist = false 
            }
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.productCart.push(action.payload)
            const product = state.products.find((p) => p._id === action.payload._id)
            if(product) {
                product.inCart = true 
            }
        })
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.productCart = state.productCart.filter(item => item._id !== action.payload._id)
            const product = state.products.find((p) => p._id === action.payload._id)
            if(product) {
                product.inCart = false 
            }
        })
        builder.addCase(moveToCartFromWishlist.fulfilled, (state, action) => {
            const productId = action.payload 
            state.wishlist = state.wishlist.filter(item => item._id !== productId)
            const product = state.products.find((p) => p._id === productId)
            if(product) {
                product.inWishlist = false 
                product.inCart = true 
                state.productCart.push(product)
            }
        })
        builder.addCase(moveToWishlistFromCart.fulfilled, (state, action) => {
            const productId = action.payload 
            state.productCart = state.productCart.filter(item => item._id !== productId)
            const product = state.products.find((p) => p._id === productId)
            if(product) {
                product.inWishlist = true 
                product.inCart = false 
                state.wishlist.push(product)
            }
        })
        builder.addCase(increaseCartQuantity.fulfilled, (state, action) => {
            const updatedProduct = action.payload 
            const productInCart = state.productCart.find((p) => p._id === updatedProduct._id)

            if(productInCart) {
                productInCart.quantity = updatedProduct.quantity
            }
            else{
                state.productCart.push(updatedProduct)
            }

            const productInStore = state.products.find((p) => p._id === updatedProduct._id)
            if(productInStore) {
                productInStore.inCart = true 
            }
        })
        builder.addCase(decreaseCartQuantity.fulfilled, (state, action) => {
            const updatedProduct = action.payload 
            const productInCart = state.productCart.find((p) => p._id === updatedProduct._id)

            if(productInCart) {
                productInCart.quantity = updatedProduct.quantity

                if(productInCart.quantity <= 0){
                    state.productCart = state.productCart.filter(item => item._id !== updatedProduct._id)
                }
            }

            const productInStore = state.products.find((p) => p._id === updatedProduct._id)
            if(productInStore) {
                productInStore.inCart = productInCart.quantity > 0
            }
        })
    }
})

export const {setFilterCategory, setPriceFilter, setSearchedProduct } = productSlice.actions
export default productSlice.reducer