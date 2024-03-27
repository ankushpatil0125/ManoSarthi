// PatientContext.js

import React, { createContext, useState } from 'react';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [aabhaId, setAabhaId] = useState("");

  return (
    <PatientContext.Provider value={{ aabhaId, setAabhaId }}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
