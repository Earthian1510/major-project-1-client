import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from '../features/store/authSlice';
import { setSearchQuery } from "../features/store/filterSlice"; 

const Header = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');
  const storedUser = localStorage.getItem('adminUser');
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;


  const handleSearchChange = (e) => {
    setSearch(e.target.value); 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(search));  
    setSearch('');
    navigate('/products'); 
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    dispatch(logoutUser()); 
    navigate('/login'); 
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand flex-grow-1 fw-bold" to="/">myShop</Link>
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
            <form className="d-flex flex-grow-1 my-2" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={handleSearchChange} 
              />
              <button className="btn btn-outline-success" type="submit" onClick={handleSearchSubmit}>
                Search
              </button>
            </form>
            <ul className="navbar-nav flex-grow-1 d-flex justify-content-end mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active fw-semibold" aria-current="page" to="/user">
                  { loggedInUser ? loggedInUser.name : 'Login'}
                </Link> 
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/wishlist">
                  Wishlist
                </Link>
              </li>
              { loggedInUser && (
                <li className="nav-item mx-2">
                  <button className="mt-1 btn btn-sm btn-outline-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
