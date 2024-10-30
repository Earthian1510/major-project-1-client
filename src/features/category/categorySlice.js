import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const categoryBaseUrl = 'https://major-project-1-backend-pink.vercel.app/api/categories'
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async() => {
    const response = await axios.get(categoryBaseUrl)
    return response.data 
})

export const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: 'idle',
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'success',
            state.categories = action.payload 
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.status = 'error',
            state.error = action.payload.message 
        })
    }
})

export default categorySlice.reducer