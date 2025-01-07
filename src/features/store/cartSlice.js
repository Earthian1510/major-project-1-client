import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async(userId) => {
    const response = await axios.get(`${API.cart}/${userId}`);
    return response.data;
  }
)

export const createCart = createAsyncThunk(
  'cart/createCart',
  async ({ userId, items }) => {
    const response = await axios.post(`${API.cart}/cart`, { userId, items});
    return response.data;
  }
)

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async({ userId, productId, quantity }) => {
    const response = await axios.post(`${API.cart}/${userId}/items`, { productId, quantity});
    return response.data.updatedCart;
  }
)

export const updateProductQuantity = createAsyncThunk(
  'cart/updateProductQuantity',
  async ({ userId, productId, action }) => {
    const response = await axios.patch(`${API.cart}/${userId}/item/${productId}`, { action });
    return response.data;
  }
)

export const deleteCart = createAsyncThunk('cart/deleteCart', async (id) => {
  const response = await axios.delete(`${API.cart}/${id}`)
  return response.data
})

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async ({userId, productId}) => {
  const response = await axios.delete(`${API.cart}/${userId}/item/${productId}`)
  return response.data.updatedCart
})


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null
  }, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload
    })
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    .addCase(createCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    })
    .addCase(addProductToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload.updatedCart;
    })
    .addCase(updateProductQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    })
    .addCase(deleteCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = null;
    })
    .addCase(removeCartItem.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload; // Remove item and update cart
    })
  }
})

export default cartSlice.reducer