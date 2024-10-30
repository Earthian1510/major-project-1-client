import React, { useEffect } from 'react'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist, setCart } from '../product/productSlice'

const Wishlist = () => {
  const dispatch = useDispatch()
  const productInfo  = useSelector((state) => state.products)
  const wishList = productInfo.wishlist

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId))
  }

  const handleAddToCart = (product) => {
    dispatch(setCart(product))
    dispatch(removeFromWishlist(product._id))

  }


  return (
    <div>
        <Header />
        <div className='container py-2' >
            <h2 className='mb-4 fw-light mt-3'>My Wishlist</h2>
            <div className="row ">
                {
                    wishList.map((product) => (
                        <div className="col-4 mb-4" key={product._id}>
                            <Link className='text-decoration-none' to={`/products/product/${product._id}`} state={product}>
                            <div class="card" style={{ width: "18rem", border: "none" }}>
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
                            <button className='btn btn-danger mx-1' onClick={() => handleRemoveFromWishlist(product._id)}>Remove</button>
                            
                        </div>
                    ))
                }

            </div>
        </div>
    </div>
  )
}

export default Wishlist