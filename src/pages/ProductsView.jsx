import React from 'react'
import Header from '../components/Header'
import FilterBar from '../components/FilterBar'
import ProductsList from '../components/ProductsList'

const ProductView = () => {
  return (
    <div>
        <Header />
       <div className="container">
       <div className="row">
            <div className="col-3" >
                <FilterBar/>
            </div>
            <div className="col mt-3 bg-light">
                <ProductsList />
            </div>
        </div>
       </div>

    </div>
  )
}

export default ProductView