// UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [context, setContext] = useState({ userInfo: null, isLoggedIn: false });

  return (
    <UserContext.Provider value={[ context, setContext ]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
