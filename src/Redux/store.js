import { configureStore } from '@reduxjs/toolkit'
import loginSlice from "./auth/loginSlice";

const store = configureStore({
    reducer: {
        loginSlice,
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware({
        //         serializableCheck: false,
        //     }),
        devTools: true,
    },
})

export default store