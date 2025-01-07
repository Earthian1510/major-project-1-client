import React, { useEffect } from "react";
import Header from "../../components/Header";
import ProductFilterBar from "./ProductFilterBar";
import ProductsList from "./ProductsList";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


const ProductView = () => {

  const dispatch = useDispatch();
  const { category } = useParams();
  
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ProductFilterBar category={category}/>
          </div>
          <div className="col mt-3 bg-light">
            <ProductsList /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
