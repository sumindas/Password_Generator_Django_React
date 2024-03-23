/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLogout } from '../Redux/Slice';

function HomePage() {
 const [passwordLength, setPasswordLength] = useState(12);
 const [includeUppercase, setIncludeUppercase] = useState(true);
 const [includeLowercase, setIncludeLowercase] = useState(true);
 const [includeNumbers, setIncludeNumbers] = useState(true);
 const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
 const [generatedPassword, setGeneratedPassword] = useState('');
 const [error, setError] = useState('');
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const user = useSelector((state)=>state.auth.token)
 
 useEffect(()=>{
  if(!user){
    navigate('/')
  }
 },[user,navigate])


 const generatePassword = () => {
 };

 // Function to copy the generated password to the clipboard
 const copyToClipboard = () => {
    // Implementation will go here
 };

 // Function to handle form submission
 const handleSubmit = (e) => {
    e.preventDefault();
    // Call the generatePassword function
    generatePassword();
 };

 // Function to handle logout
 const handleLogout = () => {
    dispatch(setLogout())
    navigate('/')
    alert('Logged out successfully!');
 };

 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500">
      <div className="absolute top-0 right-0 m-4">
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
      <h2 className="text-2xl font-bold text-white mb-5">Password Generator</h2>
      <form className="space-y-5 max-w-md w-full" onSubmit={handleSubmit}>
        {/* Form fields and options for password generation will go here */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto flex items-center">
          Generate Password
        </button>
      </form>
      {generatedPassword && (
        <div className="mt-4">
          <p className="text-white">Generated Password: {generatedPassword}</p>
          <button onClick={copyToClipboard} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto flex items-center">
            Copy to Clipboard
          </button>
        </div>
      )}
      {error && (
        <div className="bg-red-500 border border-red-600 text-red-100 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
    </div>
 );
}

export default HomePage;
