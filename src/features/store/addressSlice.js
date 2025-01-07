import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:3000/user'

export const fetchAddress = createAsyncThunk('address/fetchAddress', async () => {
    const response = await axios.get(baseUrl)
    return response.data
})

export const addAddress = createAsyncThunk('address/addAddress', async(newAddress) => {
    const response = await axios.post(baseUrl, newAddress)
    return response.data 
})

export const updateAddress = createAsyncThunk('address/updateAddress', async(updatedAddress) => {
    const response = await axios.put(`${baseUrl}/${updatedAddress._id}`, updatedAddress)
    return response.data 
})

export const deleteAddress = createAsyncThunk('address/deleteAddress', async(addressId)=> {
    await axios.delete(`${baseUrl}/${addressId}`)
    return addressId
})

export const addressSlice = createSlice({
    name: 'address',
    initialState: {
        address: [],
        status: 'idle',
        error: null,
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(fetchAddress.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchAddress.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.payload.message
        })
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            state.status = 'success'
            state.address = action.payload
        })
        builder.addCase(addAddress.fulfilled, (state, action) => {
           state.address.push(action.payload)
        })
        builder.addCase(updateAddress.fulfilled, (state, action) => {
            const index = state.address.findIndex((address) => address._id === action.payload._id)
            if(index !== -1) {
                state.address[index] = action.payload
            }
        })
        builder.addCase(deleteAddress.fulfilled, (state, action) => {
            state.address = state.address.filter((address) => address._id !== action.payload)
        })
    }
})

export default addressSlice.reducer