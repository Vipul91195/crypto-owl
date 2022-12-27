import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addBusinessApi,
  getBusinessApi,
  getBusinessCustomersApi,
  getBusinessesApi,
} from "../utils/apis/businesses";
import { addRewardPointsApi } from "../utils/apis/admin";
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  allBusinesses: null,
  pagination: null,
  businessCustomers: null,
  businessDetails: null,
}

export const getBusinesses = createAsyncThunk('business/getAll', getBusinessesApi)
export const getBusinessCustomers = createAsyncThunk('business/getCustomers', getBusinessCustomersApi)
export const getBusiness = createAsyncThunk('business/get', getBusinessApi)



const businessSlice = createSlice({
  name: "businessSlice",
  initialState,
  extraReducers: {
    [getBusinesses.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getBusinesses.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.allBusinesses = payload?.result[0];
      state.pagination = payload?.paginaton || false;
    },
    [getBusinesses.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [getBusinessCustomers.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getBusinessCustomers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.businessCustomers = payload?.result[0];
      state.pagination = payload?.paginaton || false;
    },
    [getBusinessCustomers.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [getBusiness.pending]: (state) => {
      state.isLoading = true;
    },
    [getBusiness.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.businessDetails = payload?.result[0][0];
    },
    [getBusiness.rejected]: (state, { payload }) => {
      state.isLoading = false;
    }
  },
});

export default businessSlice.reducer;