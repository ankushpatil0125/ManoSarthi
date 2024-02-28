import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) =>{
    const JWT = localStorage.getItem('JWT');
    return JWT ? children : <Navigate to="/"/>;
}
export default PrivateRoute;