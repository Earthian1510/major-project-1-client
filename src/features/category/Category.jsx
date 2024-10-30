import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
    <div className="container">
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {categories && (
        
          <div className="row my-2">
            {
              categories.map((category) => (
                <div className="col mb-4" key={category._id}>
                  <Link to={`/products/${category.name}`}>
                    <div
                      className="card"
                      style={{ width: "18rem", border: "none" }}
                    >
                      <img
                        className="card-img-top"
                        src={category.imgUrl}
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
