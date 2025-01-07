import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {

  const { currentUserInfo } = useSelector((state) => state.users)
    console.log({currentUserInfo})

  return (
    <div>
      <Header /> 
      <div className="container">
        <div className="row">
          <div className="text-center my-4 col">
            <img
              src={currentUserInfo.userImage}
              alt="profilePic"
              className="img-fluid rounded"
              style={{ width: "15rem", height: "18rem", objectFit: "cover" }}
            />
            <h1
              className="my-3"
              style={{ fontFamily: "DM Serif Display, serif" }}
            >
              {currentUserInfo.name}
            </h1>
            <p>
              {currentUserInfo.email} <br />
              {currentUserInfo.phoneNo} <br />
              {currentUserInfo.address}
            </p>
            <div>
              <Link className="btn btn-success" to='/user/addAddress'>Add Address</Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
