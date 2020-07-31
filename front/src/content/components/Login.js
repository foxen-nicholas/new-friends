import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { Redirect } from 'react-router-dom'
require('dotenv').config()

const Login = (props) => {
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  let handleEmail = (e) => {
    setEmail(e.target.value)
  }

  let handlePassword = (e) => {
    setPassword(e.target.value)
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }
    axios.post(`${process.env.REACT_APP_API}/api/users/login`, userData)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        props.nowCurrentUser(decoded);
      })
      .catch(err => console.log(err));
  }

  if (props.user) return <Redirect to="./Profile" user={props.user} />

  return (
    <div className="signupSigninBackground">
      <div id="login">
        <div className="col-md-7 offset-md-3">
          <div className="card card-body">
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" required />
              </div>
              <button id="btn2" type="submit" className="btn btn-primary float-right">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login;