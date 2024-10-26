import React from 'react'
import product11 from '../assets/images/product11.jpg'
import product2 from '../assets/images/product2.jpg'
import product3 from '../assets/images/product3.jpg'

const ProductsList = () => {
    return (
        <div className='container py-2' >
            <h6 className='mb-4 fw-light'>Showing All Products</h6>
            <div className="row ">
                
                <div className="col mb-4">
                    <div class="card" style={{width: "18rem", border: "none"}}>
                        <img src={product2} class="card-img-top" alt="product2" style={{height:"18rem", objectFit: "cover"}}/>
                        <div class="card-body text-center">
                            <p class="card-text">
                                Casual Cloths <br />
                                <span className='fs-5 fw-bold'>₹ 3000</span>
                            </p>
                            <button className='btn btn-success'>Cart</button>
                            <button className='btn btn-dark mx-1'>Wishlist</button>
                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div class="card" style={{width: "18rem", border: "none"}}>
                        <img src={product11} class="card-img-top" alt="product11" style={{height:"18rem", objectFit: "cover"}}/>
                        <div class="card-body text-center">
                            <p class="card-text">
                                Casual Cloths <br />
                                <span className='fs-5 fw-bold'>₹ 2000</span>
                            </p>
                            <button className='btn btn-success'>Cart</button>
                            <button className='btn btn-dark mx-1'>Wishlist</button>
                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div class="card" style={{width: "18rem", border: "none"}}>
                        <img src={product3} class="card-img-top" alt="product3" style={{height:"18rem", objectFit: "cover"}}/>
                        <div class="card-body text-center">
                            <p class="card-text">
                                Casual Cloths <br />
                                <span className='fs-5 fw-bold'>₹ 2500</span>
                            </p>
                            <button className='btn btn-success'>Cart</button>
                            <button className='btn btn-dark mx-1'>Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsList