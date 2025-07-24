import React from 'react';
import useRole from '../hooks/useRole';
import { AuthContext } from '../Provider/AuthContext';
import Spinner from '../Pages/Shared/Spinner';
import { Navigate } from 'react-router';

const DashBoardLayout = () => {

    const {role, loading} = useRole()

    if(loading){
        return<Spinner></Spinner>
    }

    if(role ==="user"){
        return <div>UserDashboard</div>
    }
    if(role === "admin"){
        return<div>Admin dashboard</div>
    }
    if(role ==="member"){
        return <div>Member Dashboard</div>
    }

    return <Navigate to='/'></Navigate>
           
};

export default DashBoardLayout;