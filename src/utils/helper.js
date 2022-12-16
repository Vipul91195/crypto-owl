export const getAccessToken = () => {
    const token = process.browser
        ? localStorage.getItem("token")
            ? localStorage.getItem("token")
            : false
        : false;
    return token;
};