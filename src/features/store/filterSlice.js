import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        selectedCategories: [],
        sortBy: null,
        searchQuery: ""
    },
    reducers: {
        setCategories : (state, action) => {
            state.selectedCategories = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setSearchQuery: (state, action) => { 
            state.searchQuery = action.payload;
        },
        clearFilters: (state) => {
            state.selectedCategories = [];
            state.sortBy = null;
            state.searchQuery = ''
        }
    }
})

export const { setCategories, setSortBy, setSearchQuery, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;