import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { signupUser } from '../features/store/authSlice'

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { loading, user, error } = useSelector((state) => state.auth)

  const handleSignupData = (e) => {
    const { name, value } = e.target 
    setSignupData((prev) => ({
      ...prev,
      [name]: value 
    }))
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(signupUser(signupData))
  };

  useEffect(() => {
    if(user){
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBlock: '100px', border: '1px solid lightgray', width: '300px', height: '420px', borderRadius: '0.5rem' }}>

      <h3 className='mb-3 fw-bold'>Create an Account</h3>
      {
        error 
        &&
        <div className='error-message'>
          {error}
        </div>
        }
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name='name'
            className="form-control"
            value={signupData.name}
            onChange={handleSignupData}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name='email'
            className="form-control"
            value={signupData.email}
            onChange={handleSignupData}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name='password'
            className="form-control"
            value={signupData.password}
            onChange={handleSignupData}
            required
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <button type="submit" className="btn btn-primary mt-3 mb-2">Sign Up</button>
          <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
