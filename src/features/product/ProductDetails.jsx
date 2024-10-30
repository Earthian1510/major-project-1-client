import React from 'react'
import Header from '../../components/Header'
import { useLocation } from 'react-router-dom'

const ProductDetails = () => {

  const location = useLocation()
  const productInfo = location.state 
  
  return (
    <div>
        <Header />
        <div className='container my-3'>
            <div className="row">
                <div className="col-6">
                    <img src={productInfo.imgUrl} alt={productInfo.name} className='img-fluid' style={{  objectFit: "cover", height: "25rem",}} />
                    <div className='my-3'>
                        <button className='btn btn-success'>Buy Now</button>
                        <button className='btn btn-warning mx-2'>Add to Cart</button>
                    </div>
                </div>
                <div className='col'>
                    <h1 className='fw-light'>{productInfo.name}</h1>
                    <h2 className='fw-bold'>₹ {productInfo.price}</h2>
                    <hr />
                    <p>
                        <b>Description:</b> <br />
                        {productInfo.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails