// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation(); // Para saber de onde veio

  // Se NÃO tem token
  if (!token) {
    // Salva a página que tentou acessar para redirecionar depois do login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se TEM token, mostra o conteúdo
  return children;
}