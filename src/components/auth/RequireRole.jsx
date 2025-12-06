import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireRole = ({ allowedRoles, currentRole, children }) => {
  const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!currentRole) {
    return <Navigate to="/" replace />;
  }

  if (!allowed.includes(currentRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireRole;