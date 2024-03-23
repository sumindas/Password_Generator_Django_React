/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './login';
import SignInForm from './signup';
import HomePage from './home';

export default function Layout() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignInForm />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
 );
}
