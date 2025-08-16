import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthContext';

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  // console.log(user);
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;



// import axios from 'axios';
// import React, { useContext } from 'react';
// import { AuthContext } from '../Provider/AuthContext';

// const useAxiosSecure = () => {
// const {user}=  useContext(AuthContext)

// // console.log(user.accessToken);
// const axiosSecure = axios.create({
//     baseURL:"http://localhost:5000",
//     headers:{
//         Authorization:`Bearer ${user.accessToken}`
//     }
// })
//     return axiosSecure
    
// };

// export default useAxiosSecure;

