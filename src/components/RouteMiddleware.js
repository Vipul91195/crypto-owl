import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../utils/helper'
import { useLocation, useNavigate } from 'react-router';

const RouteMiddleware = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const token = getAccessToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }else {
      setAuthorized(true);
    }
  }, [token])
  
  return <>{authorized && children}</>;
};

export default RouteMiddleware