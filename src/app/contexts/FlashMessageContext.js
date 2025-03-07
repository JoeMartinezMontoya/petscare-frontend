import React, { createContext, useState, useContext } from 'react';

const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  const addFlashMessage = (message, type = 'success') => {
    setFlashMessage({ message, type });
    setTimeout(() => setFlashMessage(null), 5000000);
  };

  return (
    <FlashMessageContext.Provider value={{ flashMessage, addFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => useContext(FlashMessageContext);
