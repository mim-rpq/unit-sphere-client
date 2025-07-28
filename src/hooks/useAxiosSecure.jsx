
import React, { useContext } from 'react';

import axios from 'axios';
import { AuthContext } from '../Provider/AuthContext';

const axiosSecure = axios.create({
    baseURL: `https://unit-sphere-server.vercel.app`
});

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext)

    // console.log(user.accessToken);


    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config
    }, error => {
        return Promise.reject(error)
    })

    return axiosSecure

};

export default useAxiosSecure;

