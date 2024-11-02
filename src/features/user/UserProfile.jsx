import React from "react";
import Header from "../../components/Header";

const UserProfile = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="text-center my-3 col-md-6">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGdpcmwlMjBtb2RlbCUyMGZhY2V8ZW58MHx8MHx8fDA%3D"
              alt="profilePic"
              className="img-fluid rounded"
              style={{ width: "15rem", height: "18rem", objectFit: "cover" }}
            />
            <h1
              className="my-3"
              style={{ fontFamily: "DM Serif Display, serif" }}
            >
              Kelly Adams
            </h1>
            <p>
              kelly.adams@gmail.com <br />
              +91 999 999 9999 <br />
              XYZ, 1209, Mumbai - 431222
            </p>
            <div>
              <button className="btn btn-warning">Edit</button>
            </div>
          </div>
          <div className="col-md-6 my-3">
              <h2 className="text-center">My Orders</h2>
              <p></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
