import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import UserAddress from '../user/UserAddress';
import { removeFromCart, moveToWishlistFromCart, fetchCart, increaseCartQuantity, decreaseCartQuantity } from '../product/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";


const Cart = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartProducts = useSelector((state) => state.products.productCart);

  useEffect(() => {
    dispatch(fetchCart())
    
  }, [dispatch])

  const [selectedAddress, setSelectedAddress] = useState()

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId))
    .then(() => {
      toast.success(`Product removed from cart!`); 
    })
    .catch(() => {
      toast.error(`Failed to remove product from cart.`);
    });
  }

  const handleMoveToWishlist = (product) => {
    dispatch(moveToWishlistFromCart(product._id))
    .then(() => {
      toast.success(`${product.name} moved to wishlist!`); 
    })
    .catch(() => {
      toast.error(`Failed to move ${product.name} to wishlist.`);
    });
  }

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseCartQuantity(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseCartQuantity(product));
  };

  const totalProductPrice = cartProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  const deliveryCharge = 499


  const handlePlaceOrder = () => {
    if(selectedAddress) {
      navigate('/user/invoice', { state: { address: selectedAddress, cart: cartProducts}})
    }
    else{
      alert("Please select an address before placing an order")
    }
  
  }

  return (
    <>
      <Header />
      <div className='container my-3'>
        <h2 className='fw-light mb-3'>My Cart ({cartProducts.length ? cartProducts.length : '0'})</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            {cartProducts.length > 0 ? (
              cartProducts.map((product) => (
                <div key={product._id} className="col mb-4">
                  <div className="card">
                    <div className="row">
                      <div className="col-6" style={{ height: '12rem' }}>
                        <img
                          className='img-fluid'
                          style={{ height: '12rem', width: '15rem', objectFit: 'cover' }}
                          src={product.imgUrl}
                          alt={product.name}
                        />
                      </div>
                      <div className="col pt-3">
                        <h4>{product.name}</h4>
                        <h2 className='fw-bold' style={{ fontFamily: "DM Serif Display, serif" }}>₹ {product.price}</h2>
                        <div>
                          Quantity:
                          <button className='btn btn-sm btn-outline-secondary mx-1' onClick={() => handleDecreaseQuantity(product)}>-</button>
                          <span className='fw-bold' style={{ fontFamily: "DM Serif Display, serif" }}>{product.quantity || 1}</span>
                          <button className='btn btn-sm btn-outline-secondary mx-1' onClick={() => handleIncreaseQuantity(product)} >+</button>
                        </div>
                        <div className='d-flex mt-3'>
                          <button className='btn btn-sm btn-dark' onClick={() => handleRemoveFromCart(product._id)}>Remove</button>
                          <button className='btn btn-sm btn-warning mx-1' onClick={() => handleMoveToWishlist(product)}>Wishlist</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="col-md-6">
            {
              cartProducts.length > 0
              &&
              <div className="card p-3">
                <h5>Price Details</h5>

                <table className='table table-borderless' style={{ borderTop: '1px solid gray' }}>

                  <tbody>
                    <tr style={{ borderBottom: '1px solid' }}>
                      <td>Price ({cartProducts.length} items)</td>
                      <td>₹ {totalProductPrice}</td>
                    </tr>

                    <tr className='py-0'>
                      <td>Delivery Charges</td>
                      <td>₹ {deliveryCharge}</td>
                    </tr>

                    <tr className='fw-bold' style={{ borderBlock: '1px solid gray' }}>
                      <td>Total Amount</td>
                      <td>₹ {totalProductPrice + deliveryCharge}</td>
                    </tr>
                  </tbody>

                </table>
                <UserAddress setSelectedAddress={setSelectedAddress}/>
                <button className='btn btn-primary' onClick={handlePlaceOrder}>Place Order</button>
              </div>
            }
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Cart;
