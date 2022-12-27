import axios from "axios";
import { getAccessToken } from "./helper";
import Cookies from "js-cookie";

const ApiMiddleware = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_baseURL,
    // headers: {
    //     Accept: "application/json",
    // },
    // timeout: 10000,
});

ApiMiddleware.interceptors.request.use(
    function (config) {
        const token = getAccessToken();
        if(token) {
            config.headers = {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            };
        }
        // axios.defaults.timeout = 35000;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
ApiMiddleware.interceptors.response.use(
    function (response) {
        if (response.code === 401) {
            Cookies.remove('crypt-access', { path: '' })
            Cookies.remove('crypt-refresh', { path: '' })
        }
        return response;
    },
    function (error) {
        if(error.response.status === 401) {
            Cookies.remove('crypt-access', { path: '' })
            Cookies.remove('crypt-refresh', { path: '' })
        }
        return Promise.reject(error);
    }
);
export default ApiMiddleware;
