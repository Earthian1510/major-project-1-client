import React, { useEffect } from 'react'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchWishlist, addToCart, removeFromWishlist } from '../product/productSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Wishlist = () => {
    
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.products.wishlist)
 
  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch])


  const handleAddToCart = (product) => {
    dispatch(addToCart(product._id))
    .then(() => {
      toast.success(`${product.name} added to cart!`); 
      dispatch(removeFromWishlist(product._id));
    })
    .catch(() => {
      toast.error(`Failed to add ${product.name} to cart.`);
    });
  }

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId))
    .then(() => {
      toast.success(`Product removed from wishlist!`); 
    })
    .catch(() => {
      toast.error(`Failed to remove product from wishlist.`);
    });
  }


  return (
    <div>
        <Header />
        <div className='container py-2' >
            <h2 className='mb-4 fw-light mt-3'>My Wishlist</h2>
            <div className="row g-2">
                {
                    wishlist.map((product) => (
                        <div className="col-md-3 mb-4 px-4" key={product._id}>
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
        <ToastContainer /> 
    </div>
  )
}

export default Wishlist