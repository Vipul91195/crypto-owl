import { configureStore } from '@reduxjs/toolkit'
import loginSlice from "./auth/loginSlice";
import modalSlice from "./modalSlice";
import businessSlice from "./businessSlice";

const store = configureStore({
    reducer: {
        loginSlice,
        modalSlice,
        businessSlice,
        devTools: true,
    },
})

export default store