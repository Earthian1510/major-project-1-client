import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../utils/api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${API.baseUrl}/users`);
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false, 
    error: null,
    currentUserInfo: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.currentUserInfo = action.payload; 
    },
    clearUserInfo: (state) => {
      state.currentUserInfo = null;
    }
  },
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
  },
});
export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;

