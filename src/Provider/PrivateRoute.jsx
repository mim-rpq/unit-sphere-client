import React, {  use } from 'react';

import { Navigate, useLocation } from 'react-router';
import Spinner from '../Pages/Shared/Spinner';
import { AuthContext } from './AuthContext';



const PrivateRoute = ({children}) => {

    const {user,  userLoading} = use(AuthContext);
    const location = useLocation();

    if(userLoading){
        return<Spinner></Spinner>
    }
    if(user && user?.email){
        return children
    }
     return <Navigate  state={location.pathname} to='/auth/login'></Navigate>
     
};

export default PrivateRoute;