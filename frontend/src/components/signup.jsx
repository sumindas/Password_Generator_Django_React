/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpApi } from "../Api/api";
import { useSelector } from "react-redux";

function SignInForm() {
 const [email, setEmail] = useState("");
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [passwordError, setPasswordError] = useState("");
 const [usernameError, setUsernameError] = useState("");
 const [confirmPasswordError, setConfirmPasswordError] = useState("");
 const [error, setError] = useState(""); // Ensure error is always a string
 const [emailError, setEmailError] = useState("");
 const navigate = useNavigate();

 const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    if (!enteredEmail.includes("@")) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
 };

 const handleUsernameChange = (e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);
    if (enteredUsername.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
    } else {
      setUsernameError("");
    }
 };

 const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
    if (enteredPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
 };

 const handleConfirmPasswordChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    setConfirmPassword(enteredConfirmPassword);
    if (enteredConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const userData = {
      email,
      username,
      password,
    };
    try {
      const response = await signUpApi(userData);
      console.log(response.status, "status");
      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Ensure error message is a string
        setError(error.response.data.error || 'Please fill in the required fields');
      } else {
        setError('An error occurred during sign-up.');
      }
      console.error(error);
    }
 };

 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <h2 className="text-2xl font-bold text-white mb-5">Sign Up</h2>
      <form className="space-y-5 max-w-md w-full" onSubmit={handleSubmit}>
        {/* Email input and error message */}
        <div>
          <label className="block text-white font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && (
            <p className="text-red-200 text-sm mt-1" style={{ textAlign: "center" }}>
              {emailError}
            </p>
          )}
        </div>

        {/* Username input and error message */}
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
          {usernameError && (
            <p className="text-red-200 text-sm mt-1" style={{ textAlign: "center" }}>
              {usernameError}
            </p>
          )}
        </div>

        {/* Password input and error message */}
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
            autoComplete="new-password"
          />
          {passwordError && (
            <p className="text-red-200 text-sm mt-1" style={{ textAlign: "center" }}>
              {passwordError}
            </p>
          )}
        </div>

        {/* Confirm Password input and error message */}
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
            autoComplete="new-password"
          />
          {confirmPasswordError && (
            <p className="text-red-200 text-sm mt-1" style={{ textAlign: "center" }}>{confirmPasswordError}</p>
          )}
        </div>

        {/* Display error message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            style={{ textAlign: "center" }}
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto flex items-center"
        >
          Sign in
        </button>
      </form>
      {/* Link to login page */}
      <div className="mt-4">
        <p className="text-white">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
 );
}

export default SignInForm;
