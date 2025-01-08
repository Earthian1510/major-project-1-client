import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../utils/api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${API.baseUrl}/users`);
  return response.data;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
  const response = await axios.get(`${API.baseUrl}/users/${userId}`);
  return response.data;
});


const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false, 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
        state.loading = true;
    })

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
    })

    builder.addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })

    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
  })
  },
});

export default userSlice.reducer;

