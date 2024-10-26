import React from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand flex-grow-1 fw-bold" to="/">
            myShop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse flex-grow-1" id="navbarSupportedContent">
            <form className="d-flex flex-grow-1" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav flex-grow-1 d-flex justify-content-end mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                
                <Link className="nav-link active fw-semibold" aria-current="page" to="/">
                  Login
                </Link> 
               
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/link">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/link">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
