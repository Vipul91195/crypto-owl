import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import ApiMiddleware from '../../utils/ApiMiddleware';
import cookies from 'js-cookie';

const initialState = {
    isLoading: false,
    allData: {
        token: {
            access: cookies.get('crypt-access'),
            refresh: cookies.get('crypt-refresh')
        }
    },
    forgotModal: { email: null, isVisible: false, otpVerified: false },
};

export const loginFetchAPi = createAsyncThunk("/auth/login", async ({ keepMeLogin, ...data }, {rejectWithValue}) => {
    try {
        const loginCredentials = await ApiMiddleware.post("/auth/login/", {
            ...data,
        });
        return { ...loginCredentials.data, keepMeLogin };
    } catch (error) {
        if (!error.response) {
            throw rejectWithValue(error);
        }
        throw rejectWithValue(error.response.data.message);
    }
});

export const forgotOtpVerifyApi = createAsyncThunk("/auth/otp-verify", async (values, { rejectWithValue }) => {
    try {
        const response = await ApiMiddleware.post("/auth/password/reset/otp/", {
            ...values,
        });
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw rejectWithValue(error);
        }
        throw rejectWithValue(error.response.data.message);
    }
});

export const resetPasswordApi = createAsyncThunk("/auth/reset-password", async (values, { rejectWithValue }) => {
    try {
        const response = await ApiMiddleware.post("/auth/password/reset/", {
            ...values,
        });
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw rejectWithValue(error);
        }
        throw rejectWithValue(error.response.data.message);
    }
});

export const forgotEmailApi = createAsyncThunk("/auth/forgot", async (values, { rejectWithValue }) => {
    try {
        const response = await ApiMiddleware.post("/auth/password/reset/email/", {
            ...values,
        });
        return { ...response.data, ...values };
    } catch (error) {
        if (!error.response) {
            return rejectWithValue(error);
        }
        return rejectWithValue(error.response.data.message);
    }
});

const loginSlice = createSlice({
    name: 'loginPage',
    initialState,
    reducers: {
        logOut: (state) => {
            state.allData = {
                token: {
                    access: null,
                    refresh: null,
                },
            };
            cookies.remove('crypt-access');
            cookies.remove('crypt-refresh');
        }
    },
    extraReducers: {
        [loginFetchAPi.pending]: (state, action) => {
            state.isLoading = true;
        },
        [loginFetchAPi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.allData = payload?.result[0];
            if (payload.keepMeLogin) {
                cookies.set('crypt-access', payload?.result[0]?.token?.access, { expires: 1 });
                cookies.set('crypt-refresh', payload?.result[0]?.token?.refresh, { expires: 1 });
                cookies.set('is-admin', payload?.result[0]?.is_admin, { expires: 1 });
            } else {
                cookies.set('crypt-access', payload?.result[0]?.token?.access);
                cookies.set('crypt-refresh', payload?.result[0]?.token?.refresh);
                cookies.set('is-admin', payload?.result[0]?.is_admin);
            }
            toast.success(payload?.message);
        },
        [loginFetchAPi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload === '' ? "Something went wrong!" : payload);
        },
        [forgotEmailApi.pending]: (state, action) => {
            state.isLoading = true;
        },
        [forgotEmailApi.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.forgotModal = {
                ...state.forgotModal,
                isVisible: true,
                email: action.payload?.email || null
            };
            toast.success(action.payload?.message);
        },
        [forgotEmailApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload === '' ? "Something went wrong!" : payload);
        },
        [forgotOtpVerifyApi.pending]: (state) => {
            state.isLoading = true;
        },
        [forgotOtpVerifyApi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.forgotModal = { ...state.forgotModal, isVisible: false, otpVerified: true };
            toast.success(payload?.message);
        },
        [forgotOtpVerifyApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload === '' ? "Something went wrong!" : payload);
        },
        [resetPasswordApi.pending]: (state) => {
            state.isLoading = true;
        },
        [resetPasswordApi.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.forgotModal = { email: null, isVisible: false, otpVerified: false };
            toast.success(payload?.message);
        },
        [resetPasswordApi.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload === '' ? "Something went wrong!" : payload);
        },
    }
})

export const { logOut } = loginSlice.actions;

export default loginSlice.reducer