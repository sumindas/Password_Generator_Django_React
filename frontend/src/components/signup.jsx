/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function SignInForm() {
 const [email, setEmail] = useState('');
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [passwordError, setPasswordError] = useState('');
 const [usernameError, setUsernameError] = useState('');
 const [confirmPasswordError, setConfirmPasswordError] = useState('');
 const [error, setError] = useState(null); 

 const handleEmailChange = (e) => {
    setEmail(e.target.value);
 };

 const handleUsernameChange = (e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);
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

 const handleConfirmPasswordChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    setConfirmPassword(enteredConfirmPassword);
    if (enteredConfirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
 };

 const handleSubmit = (e) => {
    e.preventDefault();
    setError('An error occurred during submission.');
 };

 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <h2 className="text-2xl font-bold text-white mb-5">Sign Up</h2>
      <form className="space-y-5 max-w-md w-full" onSubmit={handleSubmit}>
        <div>
          <label className="block text-white font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && <p className="text-red-200 text-sm mt-1" style={{textAlign:'center'}}>{usernameError}</p>}
        </div>

        <div>
          <label className="block text-white font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="text-red-200 text-sm mt-1" style={{textAlign:'center'}}>{passwordError}</p>}
        </div>

        <div>
          <label className="block text-white font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" style={{textAlign:'center'}} role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto flex items-center">
          Sign in
        </button>
      </form>
      {/* Add a link to the login page */}
      <div className="mt-4">
        <p className="text-white">Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link></p>
      </div>
    </div>
 );
}

export default SignInForm;
