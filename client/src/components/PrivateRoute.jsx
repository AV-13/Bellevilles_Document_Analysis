import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useUserContext } from '../userContext';

function PrivateRoute({ children }) {
//   const [context] = useContext(UserContext);
    const [ context, setContext ]  = useUserContext();

  console.log('OOO', context.isLoggedIn);

  if (!context.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;