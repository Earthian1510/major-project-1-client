import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
    name: 'address',
    initialState: [],
    status: 'idle',
    error: null,
    reducers: {},
    extraReducers: (builder) => {
        
    }
})

export default addressSlice.reducer