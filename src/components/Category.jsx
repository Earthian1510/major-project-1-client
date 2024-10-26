import React from "react";
import { Link } from "react-router-dom";
import category1 from "../assets/images/category1.jpg";
import category2 from "../assets/images/category2.jpg";
import category3 from "../assets/images/category3.jpg";
import category4 from "../assets/images/category4.jpg";

const Category = () => {
  return (
    <div className="container">
      <div className="row my-2">
        <div className="col mb-4">
          <Link to="/products">
            <div className="card" style={{ width: "18rem", border: "none" }}>
              <img
                className="card-img-top"
                src={category1}
                alt="Card image cap"
                style={{ height: "12rem" }}
              />
              <div className="card-img-overlay">
                <h1
                  className="card-text text-center mt-5 text-light fw-bold"
                  style={{
                    background: "#000",
                    fontFamily: 'DM Serif Display, serif',
                  }}
                >
                  Casual
                </h1>
              </div>
            </div>
          </Link>
        </div>
        <div className="col mb-4">
          <Link to="/products">
            <div className="card " style={{ width: "18rem", border: "none" }}>
              <img
                className="card-img"
                src={category2}
                alt="Card image cap"
                style={{ height: "12rem" }}
              />
              <div className="card-img-overlay">
                <h1
                  className="card-text text-center mt-5 text-light fw-bold"
                  style={{
                    background: "#000",
                    fontFamily: 'DM Serif Display, serif',
                  }}
                >
                  Party
                </h1>
              </div>
            </div>
          </Link>
        </div>
        <div className="col mb-4">
          <Link to="/products">
            <div className="card " style={{ width: "18rem", border: "none" }}>
              <img
                className="card-img"
                src={category3}
                alt="Card image cap"
                style={{ height: "12rem" }}
              />
              <div className="card-img-overlay">
                <h1
                  className="card-text text-center mt-5 text-light fw-bold"
                  style={{
                    background: "#000",
                    fontFamily: 'DM Serif Display, serif',
                  }}
                >
                  Wedding
                </h1>
              </div>
            </div>
          </Link>
        </div>
        <div className="col mb-4">
          <Link to="/products">
            <div className="card " style={{ width: "18rem", border: "none" }}>
              <img
                className="card-img"
                src={category4}
                alt="Card image cap"
                style={{ height: "12rem" }}
              />
              <div className="card-img-overlay">
                <h1
                  className="card-text text-center mt-5 text-light fw-bold"
                  style={{
                    background: "#000",
                    fontFamily: 'DM Serif Display, serif',
                  }}
                >
                  Office
                </h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
