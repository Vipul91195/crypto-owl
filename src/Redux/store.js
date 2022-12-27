import { configureStore } from '@reduxjs/toolkit'
import loginSlice from "./auth/loginSlice";
import commonSlice from "./commonSlice";
import businessSlice from "./businessSlice";
import customerSlice from "./customerSlice";

const store = configureStore({
    reducer: {
        loginSlice,
        commonSlice,
        businessSlice,
        customerSlice,
        devTools: true,
    },
})

export default store