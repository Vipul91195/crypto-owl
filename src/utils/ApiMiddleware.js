import axios from "axios";
import { getAccessToken } from "./helper";

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
            return response;
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export default ApiMiddleware;
