import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const UserProfile = () => {

  const storedUser = localStorage.getItem('adminUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div>
      <Header /> 
      <div className="container">
        <div className="row">
          <div className="text-center my-4 col">
            <img
              src={currentUser.userImage}
              alt="profilePic"
              className="img-fluid rounded"
              style={{ width: "15rem", height: "18rem", objectFit: "cover" }}
            />
            <h1
              className="my-3"
              style={{ fontFamily: "DM Serif Display, serif" }}
            >
              {currentUser.name}
            </h1>
            <p>
              {currentUser.email} <br />
              {currentUser.phoneNo} <br />
              {currentUser.address}
            </p>
            <div>
              <Link className="btn btn-success" to='/'>Edit Profile</Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
