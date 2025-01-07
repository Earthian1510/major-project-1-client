import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/categorySlice";
import { setCategories, setSortBy, clearFilters } from '../store/filterSlice'
import { useNavigate } from "react-router-dom";

const ProductFilterBar = ({ category }) => {
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categories } = useSelector((state) => state.categories)
    const { selectedCategories, sortBy } = useSelector((state) => state.filters)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    useEffect(() => {
        if(category && !selectedCategories.includes(category)){
            dispatch(setCategories([category]))
        }
    }, [dispatch, category])
    
    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        if(checked){
            dispatch(setCategories([...selectedCategories, value]))
        }
        else{
            dispatch(setCategories(selectedCategories.filter((cat) => cat !== value)))
        }
    }

    const handleSortFilter = (e) => {
        dispatch(setSortBy(e.target.value))
    }

    const handleClearFilters = () => {
       dispatch(clearFilters())
       navigate('/products/')
    }
    
    return (
        <div className="container my-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mt-2">Filters</h6>
               
                <button className="btn btn-link" onClick={handleClearFilters}>Clear</button> 
            </div>

            <div className="mb-4">
                <h6 className="fw-bold">Category</h6>
                
                {
                    categories 
                    &&
                    categories.map((category) => (
                        <div key={category._id}>
                            <input 
                                className="mx-2"
                                type="checkbox"
                                name="category"
                                checked={selectedCategories.includes(category.name) }
                                value={category.name}
                                onChange={handleCategoryChange}
                            />
                            {category.name} <br />
                        </div>
                    ))
                }
            </div>

            <div className="mb-3">
            <h6 className="fw-bold">Sort by</h6>
                <input className="mx-2"
                    type="radio"
                    name="sortBy"
                    value="lowToHigh"
                    onChange={handleSortFilter}
                    checked={sortBy === 'lowToHigh'}
                />
                Price - low to high <br />
                <input className="mx-2"
                    type="radio"
                    name="sortBy"
                    value="highToLow"
                    onChange={handleSortFilter}
                    checked={sortBy === 'highToLow'}
                />
                Price - high to low <br />
            </div>
        </div>
    );
};

export default ProductFilterBar;
