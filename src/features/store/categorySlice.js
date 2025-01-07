import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API } from '../../utils/api'

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async () => {
        const reponse = await axios.get(API.categories)
        return reponse.data;
    }
)

export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (categoryData) => {
        const response = await axios.post(API.categories, categoryData)
        return response.data;
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState :{
        categories: [],
        loading: false,
        error: null 
    }, 
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categories.push(action.payload)
        })
    }
})

export default categorySlice.reducer;