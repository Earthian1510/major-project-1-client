import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../features/store/authSlice';
import { fetchUsers } from "../features/store/userSlice";
import { setSearchQuery } from "../features/store/filterSlice"; 
import { setUserInfo, clearUserInfo } from "../features/store/userSlice";

const Header = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get users and filters from the Redux store
  const { users } = useSelector((state) => state.users);
  const  currentUserInfo = useSelector((state) => state.users); // Get the search query from global state
  
  // Check if the user is logged in by checking the token in localStorage
  const token = localStorage.getItem('adminToken');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  // Find the logged-in user based on the userId from the token
  const loggedInUser = users?.find((a) => a._id === user?.userId);

  // Fetch users on component mount (this should populate the users array)
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Dispatch setUserInfo only after users have been fetched
  useEffect(() => {
    if (loggedInUser) {
      dispatch(setUserInfo(loggedInUser)); // Dispatch the logged-in user to Redux state
    }
  }, [dispatch, loggedInUser]); // Only re-run this effect if loggedInUser changes

  // Handle the search query input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Local search value
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(search));  // Ensure search query is set globally
    setSearch('');
    navigate('/products'); // Redirect to products page after search
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Clear token from localStorage
    dispatch(clearUserInfo());  // Clear user info from Redux
    dispatch(logoutUser());  // Optionally dispatch logoutUser to clear any user data in Redux
    navigate('/login');  // Redirect to login page
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
                onChange={handleSearchChange}  // Use local search value
              />
              <button className="btn btn-outline-success" type="submit" onClick={handleSearchSubmit}>
                Search
              </button>
            </form>
            <ul className="navbar-nav flex-grow-1 d-flex justify-content-end mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active fw-semibold" aria-current="page" to="/user">
                  { user ? `${loggedInUser?.name}` : 'Login'}
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
              {user && (
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
