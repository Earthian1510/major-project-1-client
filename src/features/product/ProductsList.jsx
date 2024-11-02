import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToWishlist } from './productSlice'

const ProductsList = ({products}) => {
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
       dispatch(addToCart(product._id))
    }
    
    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product._id))
    }

    return (
        <div className='container py-2' >
            <h6 className='mb-4 fw-light'>Showing All Products</h6>
            <div className="row ">
                {
                    products.map((product) => (
                        <div className="col mb-4" key={product._id}>
                            <Link className='text-decoration-none' to={`/products/product/${product._id}`} state={product}>
                            <div class="card mb-2" style={{ width: "18rem", border: "none" }}>
                                <img src={product.imgUrl} class="card-img-top" alt={product.name} style={{ height: "18rem", objectFit: "cover" }} />
                                <div class="card-body text-center">
                                    <p class="card-text">
                                        {product.name} <br />
                                        <span className='fs-5 fw-bold'>₹ {product.price}</span>
                                    </p>
                                </div>
                            </div>
                            </Link>
                            
                            <button className='btn btn-success' onClick={() => handleAddToCart(product)}>Cart</button>
                            <button className='btn btn-dark mx-1' onClick={() => handleAddToWishlist(product)}>Wishlist</button>
                            
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default ProductsList