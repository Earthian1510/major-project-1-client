import React from "react";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";

const UserInvoice = () => {

  const location = useLocation();
  const { address, cart } = location.state || {}

  const totalAmount = cart?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  const deliveryCharge = 499
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row my-4">
          <div className="col-md-6">
            <div className="card p-4">
              <h5 className="text-center" style={{ fontFamily: "DM Serif Display, serif"}}>Invoice</h5>
              <hr />
              <p style={{fontSize: '12px'}}>
                To, <br />
                <b>{address?.name}</b> <br />
                {address?.address} <br />
                {address?.phoneNo} <br />
              </p>

              <div className="my-3">
                <table class="table" style={{fontSize: '12px'}}>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Rate</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cart?.map((product, index) => (
                        <tr key={product._id}>
                          <th scope="row">{index+1}</th>
                          <td>{product.name}</td>
                          <td>₹ {product.price}</td>
                          <td>{product.quantity}</td>
                          <td>₹ {product.price * product.quantity}</td>
                        </tr>
                      ))
                    }
                    <tr>
                      <td colSpan='3'></td>
                      <td>Delivery Charges</td>
                      <td>₹ {deliveryCharge}</td>
                    </tr>
                    <tr className="fw-bold">
                      <td colSpan='3'></td>
                      <td>Total</td>
                      <td>₹ {totalAmount + deliveryCharge}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UserInvoice;
