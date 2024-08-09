import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const email = useSelector((state) => state.user.email);

  // Check if the logged-in user is admin
  const isAdmin = email === 'admin@elite.com';

  return isAdmin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;