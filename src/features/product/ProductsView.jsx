import React, { useEffect } from "react";
import Header from "../../components/Header";
import FilterBar from "./FilterBar";
import ProductsList from "./ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllProducts, setFilterCategory } from "./productSlice";
import { fetchCategories } from "../category/categorySlice";
import { toast, ToastContainer } from "react-toastify";

const ProductView = () => {
  const dispatch = useDispatch();
  const { category } = useParams();

  const { products, status, error, filterCategory, priceFilter } = useSelector(
    (state) => state.products
  );
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCategories());
    if (category) {
      dispatch(setFilterCategory([category]));
    }
  }, [dispatch, category]);

  let filteredProducts = filterCategory.length
    ? products.filter((product) => filterCategory.includes(product.category))
    : products;

  const sortedProducts = [...filteredProducts];

  if (priceFilter === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (priceFilter === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-3">
            <FilterBar
              categories={categories}
              filterCategory={filterCategory}
              priceFilter={priceFilter}
            />
          </div>
          {status === "loading" && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {status === "success" && (
            <div className="col mt-3 bg-light">
              <ProductsList products={sortedProducts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
