import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/store/authSlice';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, error, loading } = useSelector((state) => state.auth)

  const handleLoginInput = (e) => {
    const { name, value } = e.target 
    setLoginData((prev) => ({
      ...prev,
      [name]: value 
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser(loginData))
    .unwrap()
    .then(() => {
      navigate('/'); 
    })
    .catch((err) => {
      console.error('Login failed:', err); 
    });

  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBlock: '100px', border: '1px solid lightgray', width: '300px', height: '350px', borderRadius: '0.5rem'}} >
      
      <h3 className='fw-bold mb-3'>myShop</h3>
      
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name='email'
            className="form-control"
            value={loginData.email}
            onChange={handleLoginInput}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name='password'
            className="form-control"
            value={loginData.password}
            onChange={handleLoginInput}
            required
          />
        </div>
        { 
          loading && <p> Loading...</p>
        }
        {
          error && <p>{error}</p>
        }
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <button type="submit" className="btn btn-primary mt-3 mb-3" disabled={loading}>Login</button>
          <Link to='/signup'>Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
