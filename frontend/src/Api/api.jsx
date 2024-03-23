/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import axios from "axios";


export const BASE_URL = 'http://127.0.0.1:8000'


export const signUpApi = (userData) => axios.post(`${BASE_URL}/api/signup/`,userData)

export const LoginApi =  (userData) => axios.post(`${BASE_URL}/api/login/`,userData)