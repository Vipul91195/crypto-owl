import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../utils/helper'
import { useLocation, useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const RouteMiddleware = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const token = getAccessToken();
  const isAdmin = Cookies.get('is-admin');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }else {
      if(isAdmin === "false") {
        if(location?.pathname.indexOf("/user") !== -1) {
          setAuthorized(true);
        }else {
          navigate("/user/profile");
        }
      }
      else if(isAdmin === "true"){ 
        if(location?.pathname.indexOf("/user") === -1) {
          setAuthorized(true);
        }else {
          navigate("/");
        }
      }
    }
  }, [token, location, isAdmin])
  return <>{authorized  && children}</>;
};

export default RouteMiddleware