import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';
import ApiMiddleware from '../../utils/ApiMiddleware';
import Cookies from "js-cookie";


const initialState = {
    isLoading: false,
    allData: null,
    forgotModal: { isVisible: false },
}

export const loginFetchAPi = createAsyncThunk("/auth/login", async (values) => {
    try {
        const loginCredentials = await ApiMiddleware.post("/auth/login/", {
            ...values,
        });
        toast.success(loginCredentials?.data?.message);
        return loginCredentials;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const forgotEmailAPi = createAsyncThunk("/auth/forgot", async (values, { rejectWithValue }) => {
    try {
        const response = await ApiMiddleware.post("/auth/password/reset/email/", {
            ...values,
        });
        console.log(response)
        toast.success(response?.data?.message);
        return response;
    } catch (error) {
        // console.log(error)
        toast.error(error?.response?.data?.message);
        rejectWithValue(error?.response?.data?.message);
    }
});

const loginSlice = createSlice({
    name: 'loginPage',
    initialState,
    reducers: {},
    extraReducers: {
        [loginFetchAPi.pending]: (state, action) => {
            state.isLoading = true;
        },
        [loginFetchAPi.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.allData = action.payload?.data;
        },
        [loginFetchAPi.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [forgotEmailAPi.pending]: (state, action) => {
            state.isLoading = true;
        },
        [forgotEmailAPi.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log(" visible", action);
            state.forgotModal = { isVisible: action.payload?.data?.status_code === 200 };
            // action.payload?.data?.status_code === 200 ? toast.success(action.payload?.data?.message) : toast.error(action.payload?.data?.message)

        },
        [forgotEmailAPi.rejected]: (state, action) => {
            console.log("error");
            state.isLoading = false;
            // toast.error(action.payload);
        },
    }
})

export default loginSlice.reducer