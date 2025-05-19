import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { FirebaseAuthContext } from '../provider/FirebaseAuthContext';
import Spinner from '../components/ui/Spinner';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = use(FirebaseAuthContext)
    const location = useLocation()
    
    // when loading true show spinner 
    if (loading) {
        return <Spinner />
    }
    // if user don't found login so sent to login pages to login 
    if (!user) {
        return <Navigate state={location?.pathname} to='/signin' />
    }

    return children
};

export default PrivateRoutes;