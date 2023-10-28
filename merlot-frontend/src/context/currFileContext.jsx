import { createContext, useState } from 'react';

export const CurrFileContext = createContext();

export const CurrFileProvider = ({ children }) => {
  const [currFile, setCurrFile] = useState(null);

  return (
    <CurrFileContext.Provider value={{ currFile, setCurrFile }}>
      {children}
    </CurrFileContext.Provider>
  );
};
