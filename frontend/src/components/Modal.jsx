/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../Api/api';

const Modal = ({ isOpen, onClose,refreshPasswords }) => {
 const [passwordLength, setPasswordLength] = useState(12);
 const [includeUppercase, setIncludeUppercase] = useState(true);
 const [includeLowercase, setIncludeLowercase] = useState(true);
 const [includeNumbers, setIncludeNumbers] = useState(true);
 const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
 const [generatedPassword, setGeneratedPassword] = useState('');
 const [error, setError] = useState('');
 const token = useSelector((state)=>state.auth.token)
 const [purpose, setPurpose] = useState('')

 const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
   
    const getRandomChar = (chars) => {
       return chars[Math.floor(Math.random() * chars.length)];
    };
   
    password += getRandomChar(uppercase);
    password += getRandomChar(lowercase);
    password += getRandomChar(numbers);
    password += getRandomChar(specialChars);
   
    const allChars = uppercase + lowercase + numbers + specialChars;
    for (let i = password.length; i < passwordLength; i++) {
       password += getRandomChar(allChars);
    }
   
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
   
    setGeneratedPassword(password);
   };

   const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
};
   

 const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword).then(() => {
      alert('Password copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy password: ', err);
      setError('Failed to copy password. Please try again.');
    });
 };

 const savePassword = async () => {
    console.log("password:",generatedPassword)
    if(!purpose){
        alert("Please Add Purpose To Save the Password")
        return
    }
    try{
        const res = await axios.post(`${BASE_URL}/api/store-password/`,{
            password:generatedPassword,
            purpose: purpose,
        },{
            headers:{
                'Authorization' : `Bearer ${token}`,
            }
        })
        if (res.status === 201){
            console.log(res,"response")
            setGeneratedPassword("")
            onClose()
            refreshPasswords()
        }
    }
    catch (error){
        console.log(error)
    }
 };

 return (
    isOpen ? (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* Form fields for password generation options */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordLength">Password Length:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="passwordLength" value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="includeUppercase">Include Uppercase:</label>
                <input className="mr-2 leading-tight" type="checkbox" id="includeUppercase" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="includeLowercase">Include Lowercase:</label>
                <input className="mr-2 leading-tight" type="checkbox" id="includeLowercase" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="includeNumbers">Include Numbers:</label>
                <input className="mr-2 leading-tight" type="checkbox" id="includeNumbers" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="includeSpecialChars">Include Special Chars:</label>
                <input className="mr-2 leading-tight" type="checkbox" id="includeSpecialChars" checked={includeSpecialChars} onChange={(e) => setIncludeSpecialChars(e.target.checked)} />
              </div>           
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="purpose">Purpose:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
             </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePassword}>Generate</button>
              {generatedPassword && (
                <>
                 <div className="mt-4">
                   <p className="text-lg font-bold">Generated Password:</p>
                   <p className="text-gray-700">{generatedPassword}</p>
                 </div>
                 <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={copyToClipboard}>Copy to Clipboard</button>
                 <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={savePassword}>Save</button>
                </>
              )}
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null
 );
};

export default Modal;
