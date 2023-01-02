import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../utils/helper'
import { useLocation, useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const UserRouteMiddleware = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const token = getAccessToken();
  const isAdmin = Cookies.get('is-admin');
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }else {
      setAuthorized(true);
    }
  }, [token])
  // if(authorized && isAdmin) {
  //   navigate("/");
  // }
  return <>{authorized && children}</>;
};

export default UserRouteMiddleware