import Cookies from 'js-cookie';

export const getAccessToken = () => {
  return Cookies.get("crypt-access");
}

export const setAccessToken = (token) => {
  return Cookies.set("crypt-access", token);
}

export const removeAccessToken = (token) => {
  return Cookies.remove("crypt-access");
}