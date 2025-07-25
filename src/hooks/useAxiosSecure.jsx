
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';

const useAxiosSecure = () => {
const {user}=  useContext(AuthContext)

// console.log(user.accessToken);
const axiosSecure = axios.create({
    baseURL:"http://localhost:5000",
    headers:{
        Authorization:`Bearer ${user.accessToken}`
    }
})
    return axiosSecure
    
};

export default useAxiosSecure;

