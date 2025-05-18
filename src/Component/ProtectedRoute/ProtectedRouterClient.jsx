import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteClient = ({ role, children }) => {
    const isAuthenticated = () => {


        try {
            const userDataString = localStorage.getItem('UserData');
            const userData = JSON.parse(userDataString)

            return userData?.user.user_type === "qtap_clients" && userData?.user.role === "admin"
        } catch (error) {
            console.log("")
            return false
        }


    };

    const redirectPath = '/';

    return isAuthenticated() ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRouteClient;