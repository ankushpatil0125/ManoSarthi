import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, type }) => {
  const JWT = localStorage.getItem("JWT");
  // console.log(children);

  if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_ADMIN]" &&
    type === "addactorcomponent"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_DOCTOR]" &&
    type === "doctorhomepage"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_DOCTOR]" &&
    type === "profilecomponent"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]" &&
    type === "profilecomponent"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_ADMIN]" &&
    type === "adminhomepage"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]" &&
    type === "supervisorhomepage"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_ADMIN]" &&
    type === "adminoperation"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_DOCTOR]" &&
    type === "changepasswordcomponent"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_DOCTOR]" &&
    type === "doctor-operation"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_DOCTOR]" &&
    type === "new-patient"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]" &&
    type === "changepasswordcomponent"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_ADMIN]" &&
    type === "changepasswordcomponent"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_ADMIN]" &&
    type === "update-doctor-supervisor"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_ADMIN]" &&
    type === "delete-doctor-supervisor"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]" &&
    type === "healthworker"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]" &&
    type === "add-healthworker"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]" &&
    type === "update-healthworker"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]" &&
    type === "delete-healthworker"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_SUPERVISOR]" &&
    type === "show-activity-healthworker"
  )
    return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_DOCTOR]" &&
    type === "new-patient-details"
  )
  return children;
  else if (
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_DOCTOR]" &&
    type === "ongoing-patient-details"
  )
  return children;
  else if(
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_DOCTOR]" &&
    type === "add-prescription"
  )
  return children;
  else if(
    JWT &&
    localStorage.getItem("ROLE") === "[ROLE_DOCTOR]" &&
    type === "referred-during-followup-patient"
  )
  return children;
  
  else return <Navigate to="/" />;
};
export default PrivateRoute;
