// src/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from './authService';

const PrivateRoute = () => {
  const isAuthenticated = AuthService.isAuthenticated();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
