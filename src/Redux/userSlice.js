import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { getUserProfileApi, getUserTransactionsApi } from "../utils/apis/users";

const initialState = {
  isLoading: false,
  userData: null,
  transactionData: null,
  pagination: null,
}

export const getUserProfile = createAsyncThunk('user/getProfile', getUserProfileApi)
export const getUserTransactions = createAsyncThunk('user/transactions', getUserTransactionsApi)


const userSlice = createSlice({
  name: "businessSlice",
  initialState,
  extraReducers: {
    [getUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.userData = payload.result[0]
    },
    [getUserProfile.rejected]: (state) => {
      state.isLoading = false;
    },
    [getUserTransactions.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserTransactions.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.transactionData = payload.result[0]
      state.pagination = payload?.paginaton || false;
    },
    [getUserTransactions.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;