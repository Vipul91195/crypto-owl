import { configureStore } from '@reduxjs/toolkit'
import loginSlice from "./auth/loginSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
    reducer: {
        loginSlice,
        modalSlice,
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware({
        //         serializableCheck: false,
        //     }),
        devTools: true,
    },
})

export default store