import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserAddressForm = () => {
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.address.address);

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const [addressData, setAddressData] = useState({
    _id: '',
    name: '',
    address: '',
    phoneNo: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditBtn = (addressFromEdit) => {
    const newAddress = {
      _id: addressFromEdit._id,
      name: addressFromEdit.name,
      address: addressFromEdit.address,
      phoneNo: addressFromEdit.phoneNo
    };
    setAddressData(newAddress);
  };

  const handleDeleteBtn = (addressId) => {
    const confirm = window.confirm("Do you want to delete this address?");
    if (confirm) {
      dispatch(deleteAddress(addressId))
        .then(() => toast.success("Address deleted successfully!"))
        .catch(() => toast.error("Failed to delete address."));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { _id, name, address, phoneNo } = addressData;

    if (name && address && phoneNo) {
      if (_id) {
        dispatch(updateAddress(addressData))
          .then(() => {
            toast.success("Address updated successfully!");
            setAddressData({  _id: '', name: '', address: '', phoneNo: '' }); 
          })
          .catch(() => toast.error("Failed to update address"));
      } else {
        dispatch(addAddress({ name, address, phoneNo }))
          .then(() => {
            toast.success("Address added successfully!");
            setAddressData({ _id: '', name: '', address: '', phoneNo: '' }); 
          })
          .catch(() => toast.error("Failed to add address"));
      }
    } else {
      toast.error("Please fill in all fields."); 
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row my-3">
          <div className="col-md-6 mb-4">
            <h2>{addressData._id ? 'Edit' : 'Add'} Address</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  name="name"
                  value={addressData.name}
                  onChange={handleInput}
                />
              </div>
              <br />
              <div>
                <textarea
                  type="text"
                  placeholder="Address"
                  className="form-control"
                  name="address"
                  value={addressData.address}
                  onChange={handleInput}
                ></textarea>
              </div>
              <br />
              <div>
                <input
                  type="text"
                  placeholder="Phone No"
                  className="form-control"
                  name="phoneNo"
                  value={addressData.phoneNo}
                  onChange={handleInput}
                />
              </div>
              <br />
              <button type="submit" className={`btn ${addressData._id ? 'btn-warning': 'btn-primary'}`}>
              {addressData._id ? 'Edit' : 'Add'} 
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h2>Addresses</h2>
            <div>
              {
                addressList.map((address) => (
                  <div key={address._id} className="card p-3 my-3">
                    <div className="row">
                      <div className="col">
                        <h5>{address.name}</h5>
                        <p>
                          <b>Address:</b> {address.address} <br />
                          <b>Phone no:</b> {address.phoneNo}
                        </p>
                      </div>
                      <div className="col text-center mt-5">
                        <button className="btn btn-sm btn-warning" onClick={() => handleEditBtn(address)}>Edit</button>
                        <button className="mx-1 btn btn-sm btn-danger" onClick={() => handleDeleteBtn(address._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default UserAddressForm;
