import React from "react";

const FilterBar = () => {
    return (
        <div className="container my-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold">Filters</h6>
                <button className="btn btn-link">Clear</button>
            </div>

            <div className="mb-4">
                <h6 className="fw-bold">Category</h6>
                <input className="mx-2"
                    type="checkbox"
                    name="category"
                    value=""
                    onChange=""
                />
                Wedding <br />
                <input className="mx-2"
                    type="checkbox"
                    name="category"
                    value=""
                    onChange=""
                />
                Office <br />
                <input className="mx-2"
                    type="checkbox"
                    name="category"
                    value=""
                    onChange=""
                />
                Casual <br />
                <input className="mx-2" type="checkbox" name="category" value="" onChange="" />
                Party <br />
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
                    value=""
                    onChange=""
                />
                Price - low to high <br />
                <input className="mx-2"
                    type="radio"
                    name="sortBy"
                    value=""
                    onChange=""
                />
                Price - high to low <br />
            </div>
        </div>
    );
};

export default FilterBar;
