import React from 'react'
import Header from '../../components/Header'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart, addToWishlist } from './productSlice'
import { toast, ToastContainer } from "react-toastify";

const ProductDetails = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const productInfo = location.state 

  const handleAddToCart = (product) => {
    dispatch(addToCart(product._id))
    .then(() => {
        toast.success(`${product.name} added to cart!`); 
      })
      .catch(() => {
        toast.error(`Failed to add ${product.name} to cart.`);
      });
  }

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product._id))
    .then(() => {
        toast.success(`${product.name} added to wishlist!`); 
      })
      .catch(() => {
        toast.error(`Failed to add ${product.name} to wishlist.`);
      });
  }

  
  return (
    <div>
        <Header />
        <div className='container my-3'>
            <div className="row">
                <div className="col-6">
                    <img src={productInfo.imgUrl} alt={productInfo.name} className='img-fluid' style={{  objectFit: "cover", height: "25rem",}} />
                    
                </div>
                <div className='col'>
                    <h1 className='fw-light'>{productInfo.name}</h1>
                    <h2 className='fw-bold'>₹ {productInfo.price}</h2>
                    <hr />
                    <p>
                        <b>Description:</b> <br />
                        {productInfo.description}
                    </p>
                    <div className='my-3'>
                        <button className='btn btn-success mx-2' onClick={() => handleAddToCart(productInfo)}>Add to Cart</button>
                        <button className='btn btn-warning' onClick={() => handleAddToWishlist(productInfo)}>Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default ProductDetails