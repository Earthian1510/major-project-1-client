import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";


export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId) => {
    try {
      const response = await axios.get(`${API.cart}/${userId}`);
      return response.data;
    }
    catch (error) {
      console.error(error);
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, product }) => {
    try {
      const response = await axios.post(`${API.cart}/${userId}/items`, product);
      const items = response.data.updatedCart.items;
  
      const lastItem = items[items.length - 1];
      return lastItem; 
    }
    catch (error) {
      console.error(error);
    }
  }
)

export const increaseItemQuantity = createAsyncThunk(
  'cart/increaseItemQuantity',
  async ({ userId, productId }) => {
    try {
      const response = await axios.patch(`${API.cart}/${userId}/items/${productId}/increase`);
      return response.data.items; 
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const decreaseItemQuantity = createAsyncThunk(
  'cart/decreaseItemQuantity',
  async ({ userId, productId }) => {
    try {
      const response = await axios.patch(`${API.cart}/${userId}/items/${productId}/decrease`);
      console.log(response.data.items)
      return response.data.items; 
    } catch (error) {
      console.error(error);
    }
  }
);


export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId }) => {
    try {
      const response = await axios.delete(`${API.cart}/${userId}/items/${productId}`)
      return productId
    }
    catch (error) {
      console.error(error);
    }
  }
)

export const clearUserCart = createAsyncThunk(
  'cart/clearUserCart',
  async ({ userId }) => {
    try {
      const response = await axios.delete(`${API.cart}/${userId}`);
      return response.data
    }
    catch (error) {
      console.error(error);
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = 'idle',
      state.items = action.payload.items;
    })
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = 'error',
        state.error = action.payload.message;
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = 'idle';

      const updatedCart = action.payload;
      const existingItem = state.items.find((item) => item.productId._id === updatedCart.productId._id);
      
      if (existingItem) {
        existingItem.quantity += updatedCart.quantity;
      } else {
        state.items.push(updatedCart); 
      }
    });

    builder.addCase(increaseItemQuantity.fulfilled, (state, action) => {
      state.status = 'idle';
      action.payload.forEach((updatedItem) => {
        const existingItem = state.items.find((item) => item.productId === updatedItem.productId);
        if (existingItem) existingItem.quantity = updatedItem.quantity;
      });
    });
    
    
    builder.addCase(decreaseItemQuantity.fulfilled, (state, action) => {
      state.status = 'idle';
      action.payload.forEach((updatedItem) => {
        const existingItem = state.items.find((item) => item.productId === updatedItem.productId);
        if (existingItem) {
          existingItem.quantity = updatedItem.quantity;
          if (updatedItem.quantity === 0) {
            state.items = state.items.filter((item) => item.productId !== updatedItem.productId);
          }
        }
      });
    });
    
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items = state.items.filter((item) => item.productId !== action.payload);
    })
    builder.addCase(clearUserCart.fulfilled, (state) => {
      state.status = 'idle';
      state.items = [];
    })
  }
})


export default cartSlice.reducer