// UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [context, setContext] = useState({ userInfo: null, isLoggedIn: false });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log('localSotrage Get',JSON.parse(loggedInUser));
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setContext({ userInfo: foundUser, isLoggedIn: true });
    }
  }, []);

  return (
    <UserContext.Provider value={[ context, setContext ]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
