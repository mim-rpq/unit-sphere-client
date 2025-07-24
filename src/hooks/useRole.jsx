import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';


const useRole = () => {
    const [role, setRole] = useState('')
    const  axiosSecure = useAxiosSecure();
    const[loading, setLoading] = useState(true)

    useEffect(()=>{
        axiosSecure("/user-role").then((res)=>{
            setRole(res.data.role)
            setLoading(false)
        })
    },[])

    return {role, loading};
};

export default useRole;