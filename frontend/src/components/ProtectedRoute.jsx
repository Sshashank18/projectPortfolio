
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // axios.get('http://localhost:5000/me', { withCredentials: true })
    axios.get('https://projectportfolio-production-a923.up.railway.app/me', { withCredentials: true })
      .then(res => setAuth(res.data.user))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>Loading...</div>;
  if (!auth) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
