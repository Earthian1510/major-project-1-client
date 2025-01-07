import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, updateProductQuantity, removeCartItem } from '../store/cartSlice'; // import actions

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartProducts = useSelector((state) => state.cart.cart?.items || []);
  const loggedInUser = useSelector((state) => state.users.currentUserInfo);
  
  if(!loggedInUser){
    return <div>Loading ...</div>
  }
  
  const userId = loggedInUser._id;

  const totalProductPrice = cartProducts.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
  const deliveryCharge = 50; 

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId)); 
    }
  }, [dispatch, userId]); 

  const handleIncreaseQuantity = (item) => {
    dispatch(updateProductQuantity({
      userId,
      productId: item.productId._id,
      action: 'increase',
    }));
   
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(updateProductQuantity({
        userId,
        productId: item.productId._id,
        action: 'decrease',
      }));
      
    }
    else{
      dispatch(removeCartItem({userId, productId: item.productId._id}))
      
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeCartItem({ userId, productId}))
    

  }

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    navigate('/checkout');
  };

  return (
    <>
      <Header />
      <div className='container my-3'>
        <h2 className='fw-light mb-3'>My Cart ({cartProducts.length ? cartProducts.length : '0'})</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            {cartProducts.length > 0 ? (
              cartProducts.map((item) => (
                <div key={item.productId._id} className="col mb-4">
                  <div className="card">
                    <div className="row">
                      <div className="col-6" style={{ height: '14rem' }}>
                        <img
                          className='img-fluid'
                          style={{ height: '14rem', width: '15rem', objectFit: 'cover' }}
                          src={item.productId.imageUrl}
                          alt={item.productId.name}
                        />
                      </div>
                      <div className="col pt-3">
                        <h5>{item.productId.name}</h5>
                        <h2 className='fw-bold' style={{ fontFamily: "DM Serif Display, serif" }}>
                          ₹ {item.productId.price}
                        </h2>
                        <div>
                          Quantity:
                          <button className='btn btn-sm btn-outline-secondary mx-1' onClick={() => handleDecreaseQuantity(item)}>-</button>
                          <span className='fw-bold' style={{ fontFamily: "DM Serif Display, serif" }}>{item.quantity || 1}</span>
                          <button className='btn btn-sm btn-outline-secondary mx-1' onClick={() => handleIncreaseQuantity(item)} >+</button>
                        </div>
                        <div className='d-flex mt-3'>
                          <button 
                            className='btn btn-sm btn-dark' 
                            onClick={() => handleRemoveFromCart(item.productId._id)}
                          >
                            Remove
                          </button>
                          <button className='btn btn-sm btn-warning mx-1' onClick={() => handleMoveToWishlist(item)}>Wishlist</button>
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
            {cartProducts.length > 0 && (
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
                
                <button className='btn btn-primary' onClick={handlePlaceOrder}>Place Order</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
