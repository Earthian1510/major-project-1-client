import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API } from '../../utils/api'

export const signupUser = createAsyncThunk('auth/signupUser', async(formData) => {
    const response = await axios.post(`${API.baseUrl}/auth/signup`, formData);
    return response.data;
})

export const loginUser = createAsyncThunk('auth/loginUser', async (loginData) => {
    try {
      console.log('Login Data Sent:', loginData); // Check the login data
      const response = await axios.post(`${API.baseUrl}/auth/login`, loginData);
  
      const data = response.data;
      
      if (response.status === 200 && data.token) {
        return { token: data.token, user: data.user };
      }
  
    } catch (error) {
      // Log the full error response for better debugging
      console.error('Error response: ', error.response?.data || error.message);
      
    }
  });
  
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('adminToken') || null,
        loading: false,
        error: null
    },
    reducers: {
        logoutUser: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('adminToken');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error= null;
        })
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token; // Store token in state
            state.user = action.payload.user; // Store user info
            localStorage.setItem('adminToken', action.payload.token); // Store token in localStorage
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})


export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;