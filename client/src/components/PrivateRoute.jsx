import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useUserContext } from '../userContext';

function PrivateRoute({ children }) {
  const [ context, setContext ]  = useUserContext();

  if (!context.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;