import React, { useEffect } from "react";
import Header from "../../components/Header";
import FilterBar from "./FilterBar";
import ProductsList from "./ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllProducts, setFilterCategory, setSearchedProduct } from "./productSlice";
import { fetchCategories } from "../category/categorySlice";

const ProductView = () => {
  const dispatch = useDispatch();
  const { category } = useParams();

  const { products, status, error, filterCategory, priceFilter, searchedProduct } = useSelector(
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


  useEffect(() => {
    if (searchedProduct) {
      dispatch(setFilterCategory([])); 
    }
  }, [searchedProduct, dispatch]);

  let filteredProducts = [...products];

  if (filterCategory.length) {
    filteredProducts = filteredProducts.filter((product) => filterCategory.includes(product.category));
  }

  if (searchedProduct) {
    filteredProducts = filteredProducts.filter((product) => 
      product.name.toLowerCase().includes(searchedProduct.toLowerCase())
    );
  }

  if (priceFilter === 'lowToHigh') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (priceFilter === 'highToLow') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
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
              <ProductsList products={filteredProducts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
