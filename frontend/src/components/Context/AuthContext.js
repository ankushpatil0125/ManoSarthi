// PatientContext.js

import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwtc, setJWT] = useState("");
  
  return (
    <AuthContext.Provider value={{ jwtc, setJWT }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;