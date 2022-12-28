//Core
import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const RouteGuard = ({ element: Component, ...rest }) => {

    const hasJWT = () => {
        let flag = false;

        //check user has JWT token
        localStorage.getItem("jwt_key") ? flag = true : flag = false

        return flag
    }

    return (
        <Routes>
            <Route {...rest}
                render={props => (
                    hasJWT() ?
                        <Component {...props} />
                        :
                        <Navigate to={{ pathname: '/' }} />
                )}
            />
        </Routes>
    );
};

export default RouteGuard;
