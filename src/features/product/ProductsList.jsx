import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { fetchCategories } from '../store/categorySlice';
import {  addToCart } from '../store/cartSlice';

const ProductsList = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { selectedCategories, sortBy, searchQuery } = useSelector((state) => state.filters);

  const storedUser = localStorage.getItem('adminUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = products?.filter((product) => {
    if (selectedCategories.length && !selectedCategories.includes(product.category)) {
      return false;
    }

    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  if (sortBy) {
    filteredProducts.sort((a, b) => {
      if (sortBy === 'lowToHigh') {
        return a.price - b.price;
      } else if (sortBy === 'highToLow') {
        return b.price - a.price;
      }
      return 0;
    });
  }

  const handleAddToCart = (productId) => {
    if (!currentUser?.id) {
      console.log("User is not logged in.");
      return;
    }

    dispatch(addToCart({ userId: currentUser.id, product: { productId, quantity: 1}}))
  };

  return (
    <div className='container py-2'>
      <h6 className='mb-4 fw-light'>Showing {filteredProducts.length} Products</h6>
      <div className="row">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <Link className='text-decoration-none' to={`/products/product/${product._id}`} state={product}>
                <div className="card mb-2" style={{ width: "19rem", border: "none" }}>
                  <img 
                    src={product.imageUrl} 
                    className="card-img-top" 
                    alt={product.name} 
                    style={{ height: "18rem", objectFit: "cover" }} 
                  />
                  <div className="card-body text-center">
                    <p className="card-text">
                      {product.name} <br />
                      <span className='fs-5 fw-bold'>₹ {product.price}</span>
                    </p>
                  </div>
                </div>
              </Link>

              {/* Add to Cart Button */}
              <div className='text-center'>
                <button 
                  className='btn btn-success' 
                  onClick={() => handleAddToCart(product._id)}  
                >
                  Add to Cart
                </button>
                <button className='btn btn-dark mx-1'>Wishlist</button>
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
