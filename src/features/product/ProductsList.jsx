import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { fetchCategories } from '../store/categorySlice';
import { addProductToCart, updateProductQuantity } from '../store/cartSlice'

const ProductsList = () => {
    const dispatch = useDispatch();

    const { cart } = useSelector((state) => state.cart); 
    const { currentUserInfo } = useSelector((state) => state.users);  
    const { products } = useSelector((state) => state.product);  
    const { selectedCategories, sortBy, searchQuery } = useSelector((state) => state.filters); 

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    // Filter products based on selected categories and search query
    const filteredProducts = products?.filter((product) => {
        if (selectedCategories.length && !selectedCategories.includes(product.category)) {
            return false;
        }

        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });

    // Sort the filtered products based on the selected sorting option (if any)
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
    if(!currentUserInfo?._id){
        console.log("User is not logged in.")
        return;
    }

    const existingItem = cart?.items?.find((item) => item.productId === productId);
    if(existingItem){
        dispatch(updateProductQuantity({
            userId: currentUserInfo._id,
            productId,
            action: 'increase'
        }))
    } 
    else{
        dispatch(addProductToCart({
            userId: currentUserInfo._id,
            productId,
            quantity: 1
        }))
    }
   }

    return (
        <div className='container py-2'>
            <h6 className='mb-4 fw-light'>Showing {filteredProducts.length} Products</h6>
            <div className="row">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div className="col-md-4 mb-4" key={product._id}>
                            {/* Product link */}
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
