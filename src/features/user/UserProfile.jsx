import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

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
              <Link className="btn btn-success" to='/user/addAddress'>Add Address</Link>
            </div>
          </div>
          <div className="col-md-6 my-3">
              <h2 className="text-center mb-3">My Orders</h2>
              {/* <div className="card">
                <div className="row">
                  <div className="col">
                <img src="https://plus.unsplash.com/premium_photo-1663088624029-5886b4fe8960?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGFpbG9yZWQlMjBwYW50fGVufDB8MHwwfHx8MA%3D%3D" alt="" className="img-fluid"/>
                  </div>
                  <div className="col p-3">
                    <h5>
                      Office#B
                    </h5>
                    <p>
                      Price: ₹ 2999 <br />
                      Quantity: 1 
                    </p>
                    <Link className="btn btn-primary" to='/user/invoice'>View Invoice</Link>
                  </div>
                </div>

              </div> */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
