/* eslint-disable no-unused-vars */
import React from 'react'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginForm from './login'
import SignInForm from './signup'
import HomePage from './home'

export default function Layout() {
    const Router = createBrowserRouter([
        {
            path : '/',
            element : <LoginForm />
        },
        {
            path : '/signup',
            element : <SignInForm />
        },
        {
            path : '/home',
            element : <HomePage />
        }
    ])
  return (
    <>
        <RouterProvider router={Router} />
    </>
  )
}
