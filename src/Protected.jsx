import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Protected({ children }) {
  const Authenticated = useSelector((state) => state.auth.Authenticated);

  if (!Authenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
