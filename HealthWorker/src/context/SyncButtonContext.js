// PatientContext.js

import React, { createContext, useState } from 'react';

const SyncButtonContext = createContext();

export const SyncButtonProvider = ({ children }) => {
  const [syncButton, setsyncButton] = useState(false);
  
  return (
    <SyncButtonContext.Provider value={{ syncButton, setsyncButton }}>
      {children}
    </SyncButtonContext.Provider>
  );
};

export default SyncButtonContext;