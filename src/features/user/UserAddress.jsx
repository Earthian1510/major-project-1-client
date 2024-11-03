import React, { useEffect } from "react";
import { fetchAddress } from "./addressSlice";
import { useDispatch, useSelector } from "react-redux";

const UserAddress = ({setSelectedAddress}) => {
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.address.address);

  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  return (
    <div className="my-3">
      <div className="card p-3">
        <h5>Select Delivery Address: </h5>

        <div>
          {addressList.map((a) => (
            <div className="card p-3 my-2" key={a._id}>
              <div className="row">
                <div className="col-1">
                  <input
                    type="radio"
                    name="address"
                    className="form-check-input"
                    value={a._id}
                    onChange={() =>setSelectedAddress(a)}
                  />
                </div>
                <div className="col">
                  <h6 className="fw-bold">{a.name}</h6>
                  <p>
                    {a.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
