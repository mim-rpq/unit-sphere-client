
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';


const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const {user, userLoading}=  useContext(AuthContext)

    const {
        data: roleData,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['userRole'],
        enabled: !userLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/user-role');
            return res.data;
        },
    });

    return {
        role: roleData?.role || '',
        loading: isLoading,
        refetch,
    };
};

export default useRole;




// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from './useAxiosSecure';


// const useRole = () => {
//     const [role, setRole] = useState('')
//     const  axiosSecure = useAxiosSecure();
//     const[loading, setLoading] = useState(true)

//     useEffect(()=>{
//         axiosSecure("/user-role").then((res)=>{
//             setRole(res.data.role)
//             setLoading(false)
//         })
//     },[])

//     return {role, loading};
// };

// export default useRole;



