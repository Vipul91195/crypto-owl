import { configureStore } from '@reduxjs/toolkit'
import loginSlice from "./auth/loginSlice";
import modalSlice from "./modalSlice";
import businessSlice from "./businessSlice";
import customerSlice from "./customerSlice";

const store = configureStore({
    reducer: {
        loginSlice,
        modalSlice,
        businessSlice,
        customerSlice,
        devTools: true,
    },
})

export default store