/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../Redux/Slice";
import Modal from "./Modal";
import axios from "axios";
import { BASE_URL } from "../Api/api";
import ConfirmationModal from "./ConfirmationModal";

function HomePage() {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [storedPasswords, setStoredPasswords] = useState([]);
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const user = useSelector((state) => state.auth.token);
 const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
 const [passwordIdToDelete, setPasswordIdToDelete] = useState(null);
 const username = useSelector((state) => state.auth.username);
 console.log("Username:", username);

 useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchStoredPasswords();
    }
 }, [user, navigate]);

 const fetchStoredPasswords = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/retrieve-passwords/`, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      console.log(res.data);
      setStoredPasswords(res.data);
    } catch (error) {
      console.error("Failed to fetch stored passwords:", error);
    }
 };

 const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
    alert("Logged out successfully!");
 };

 const copyToClipboard = (password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy password: ", err);
      });
 };

 const deletePassword = async (passwordId) => {
    setPasswordIdToDelete(passwordId);
    setIsConfirmationModalOpen(true);
 };

 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700">
      <div className="absolute top-0 right-0 m-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <h2 className="text-2xl font-bold text-white mb-5">
        Welcome, {username}!
      </h2>
      <h2 className="text-2xl font-bold text-white mb-5">
        Make Your own Passwords!!!
      </h2>

      <Modal
        isOpen={isModalOpen}
        refreshPasswords={fetchStoredPasswords}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Stored Passwords</h3>
        <table className="min-w-full bg-white rounded shadow-md overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Purpose</th>
              <th className="px-6 py-3 text-left">Password</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {storedPasswords.map((passwordObj, index) => (
              <tr key={index} className="text-gray-700">
                <td className="px-6 py-4">{passwordObj.purpose}</td>
                <td className="px-6 py-4">{passwordObj.password}</td>
                <td className="px-6 py-4">
                 <button
                    onClick={() => copyToClipboard(passwordObj.password)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                 >
                    Copy to Clipboard
                 </button>
                 <button
                    onClick={() => deletePassword(passwordObj.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                 >
                    Delete
                 </button>
                </td>
              </tr>
            ))}
          </tbody>
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            message="Are you sure you want to delete this password?"
            onConfirm={async () => {
              try {
                console.log(
                 `${BASE_URL}/api/delete-password/${passwordIdToDelete}/`
                );
                await axios.delete(
                 `${BASE_URL}/api/delete-password/${passwordIdToDelete}/`,
                 {
                    headers: {
                      Authorization: `Bearer ${user}`,
                    },
                 }
                );
                const updatedPasswords = storedPasswords.filter(
                 (password) => password.id !== passwordIdToDelete
                );
                setStoredPasswords(updatedPasswords);
                setIsConfirmationModalOpen(false);
                alert("Password deleted successfully!");
              } catch (error) {
                console.error("Failed to delete password:", error);
                setIsConfirmationModalOpen(false);
                alert("Failed to delete password. Please try again.");
              }
            }}
            onCancel={() => setIsConfirmationModalOpen(false)}
          />
        </table>
        <button
          type="submit"
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto flex items-center"
          style={{ marginTop: "20px" }}
        >
          Generate a New Password
        </button>
      </div>
    </div>
 );
}

export default HomePage;
