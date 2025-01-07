import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
    <div className="container">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {categories && (
        
          <div className="row mt-2">
            {
              categories.slice(-4).map((category) => (
                <div className="col-md-3 mb-4" key={category._id}>
                  <Link to={`/products/${category.name}`}>
                    <div
                      className="card"
                      style={{ width: "20rem", border: "none" }}
                    >
                      <img
                        className="card-img-top"
                        src={category.imageUrl}
                        alt="Card image cap"
                        style={{ height: "12rem" }}
                      />
                      <div className="card-img-overlay">
                        <h1
                          className="card-text text-center mt-5 text-light fw-bold"
                          style={{
                            background: "#000",
                            fontFamily: "DM Serif Display, serif",
                          }}
                        >
                          {category.name}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
       
      )}
       </div>
    </>
  );
};

export default Category;
