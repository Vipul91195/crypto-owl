import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../utils/helper'
import { useNavigate } from 'react-router';

const AuthMiddleware = ({ children }) => {
  const [unauthorized, setUnauthorized] = useState(false);
  const token = getAccessToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }else {
      setUnauthorized(true);
    }
  }, [token])
  
  return <>{unauthorized && children}</>;
};

export default AuthMiddleware;