/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { LoginApi } from '../Api/api';
import { setUser } from '../Redux/Slice';
import { useDispatch, useSelector } from 'react-redux';

function LoginForm() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [usernameError, setUsernameError] = useState('');
 const [passwordError, setPasswordError] = useState('');
 const [error, setError] = useState(null);
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const user = useSelector((state)=>state.auth.token)

 useEffect(()=>{
  if(user){
    navigate('/home')
  }
 },[user,navigate])

 const handleUsernameChange = (e) => {
    const enteredUsername = e.target.value;
    setEmail(enteredUsername);
    if (enteredUsername.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
    } else {
      setUsernameError('');
    }
 };

 const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
    if (enteredPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError('');
    setUsernameError(' ')
    setPasswordError('')

    if (!email || !password) {
      setError('Please fill required fields');
      return; 
  }

    const userData = {
      email,
      password,
    }
    try{
      const response = await LoginApi(userData)
      if (response.data.access_token){
        dispatch(setUser(response.data))
        navigate('/home')
      }
    }
    catch(error){
      setError(error.response.data.non_field_errors)
    }
 };

 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700">
      <h2 className="text-2xl font-bold text-white mb-5">Login</h2>
      <form className="space-y-5 max-w-md w-full" onSubmit={handleSubmit}>
        <div>
          <label className="block text-white font-bold mb-2" htmlFor="username">
            Email:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
            type="text"
            id="username"
            value={email}
            onChange={handleUsernameChange}
          />
          {usernameError && <p className="text-red-200 text-sm mt-1" style={{ textAlign: "center" }}>{usernameError}</p>}
        </div>

        <div>
          <label className="block text-white font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="text-red-200 text-sm mt-1" style={{ textAlign: "center" }}>{passwordError}</p>}
        </div>

        {error && (
          <div className="bg-red-500 border border-red-600 text-red-100 px-4 py-3 rounded relative" role="alert">
      
            <span className="block sm:inline" style={{ textAlign: "center" }}> {error}</span>
          </div>
        )}

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto flex items-center">
          Login
        </button>
      </form>
      {/* Add a link to the signup page */}
      <div className="mt-4">
        <p className="text-white">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
      </div>
    </div>
 );
}

export default LoginForm;
