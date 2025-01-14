import React, { useEffect } from 'react'
import Header from '../../components/Header'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/productSlice'
import { addToCart } from '../store/cartSlice'

const ProductDetails = () => {

  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.product)

  const storedUser = localStorage.getItem('adminUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const location = useLocation()
  const productInfo = location.state

  const productArr = products?.filter((prod) => {
    return prod._id !== productInfo._id && prod.category === productInfo.category;
  })

  const handleAddToCart = (productId) => {
      if (!currentUser?.id) {
        console.log("User is not logged in.");
        return;
      }
      dispatch(addToCart({ userId: currentUser.id, product: { productId, quantity: 1}}))
    };

  const handleBuyNow = () => {

  }

  const handleAddToWishlist = () => {

  }

  return (
    <div>
      <Header />
      <div className='container my-3'>
        <div className="row">
          <div className="col-md-6 mb-4" >
            <img src={productInfo.imageUrl} alt={productInfo.name} className='img-fluid' style={{ objectFit: "cover", height: "25rem", }} />

          </div>
          <div className='col-md-6'>
            <h1 className='fw-light'>{productInfo.name}</h1>
            <h2 className='fw-bold'>₹ {productInfo.price}</h2>
            <hr />
            <h4>Stock: {productInfo.stock}</h4>
            <p>
              <b>Description:</b> <br />
              {productInfo.description}
            </p>
            <div className='my-3'>
              <button className='btn btn-success mx-2' onClick={() => handleAddToCart(productInfo._id)}>Add to Cart</button>
              <button className='btn btn-warning' onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          { productArr.length > 0 ? <h3 className='mb-3'>You may like</h3>: <h3></h3>}
          {

            productArr && productArr.length > 0 ? (
              productArr.map((product) => (

                <div className="col-md-4 mb-4" key={product._id}>
                  <Link className='text-decoration-none' to={`/products/product/${product._id}`} state={product}>
                    <div className="card mb-2" style={{ width: "19rem", border: "none" }}>
                      <img src={product.imageUrl} className="card-img-top" alt={product.name} style={{ height: "18rem", objectFit: "cover" }} />
                      <div className="card-body text-center">
                        <p className="card-text">
                          {product.name} <br />
                          <span className='fs-5 fw-bold'>₹ {product.price}</span>
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className='text-center' style={{maxWidth: '308px'}}>
                    <div>
                    <button className='btn btn-success' onClick={handleAddToCart}>Cart</button>
                    <button className='btn btn-dark mx-1' onClick={handleAddToWishlist}>Wishlist</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ProductDetails