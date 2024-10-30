import React from "react";
import { useDispatch } from "react-redux";
import { setFilterCategory, setPriceFilter} from "./productSlice";

const FilterBar = ({ categories, filterCategory, priceFilter }) => {
    
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const category = e.target.value 
        const updatedFilterCategory = filterCategory.includes(category) ? filterCategory.filter((cat) => cat !== category) : [...filterCategory, category]

        dispatch(setFilterCategory(updatedFilterCategory))
    }
    
    const handlePriceFilter = (e) => {
        dispatch(setPriceFilter(e.target.value))
    }

    const clearFilter = () => {
        dispatch(setFilterCategory([]))
        dispatch(setPriceFilter('lowToHigh'))
    }

    return (
        <div className="container my-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mt-2">Filters</h6>
                <button className="btn btn-link" onClick={clearFilter}>Clear</button>
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
                                checked={filterCategory.includes(category.name) }
                                value={category.name}
                                onChange={handleChange}
                            />
                            {category.name} <br />
                        </div>
                    ))
                }
            </div>

            <div className="mb-4">
                <h6 className="fw-bold">Rating</h6>
                <input
                    className="mx-2"
                    type="range"
                    class="form-range"
                    min="0"
                    max="5"
                    step="1"
                    id="customRange3"
                />
                <div className="d-flex justify-content-between">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
            </div>

            <div className="mb-3">
            <h6 className="fw-bold">Sort by</h6>
                <input className="mx-2"
                    type="radio"
                    name="sortBy"
                    value="lowToHigh"
                    onChange={handlePriceFilter}
                    checked={priceFilter === 'lowToHigh'}
                />
                Price - low to high <br />
                <input className="mx-2"
                    type="radio"
                    name="sortBy"
                    value="highToLow"
                    onChange={handlePriceFilter}
                    checked={priceFilter === 'highToLow'}
                />
                Price - high to low <br />
            </div>
        </div>
    );
};

export default FilterBar;
