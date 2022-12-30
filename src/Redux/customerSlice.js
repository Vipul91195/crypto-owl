import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../utils/ApiMiddleware";
import { toast } from "react-hot-toast";
import { getCustomerProfileApi, getTransactionHistoryApi } from "../utils/apis/customer";

const initialState = {
  isLoading: false,
  customerDetails: null,
  transactionData: null,
  pagination: null,
}

export const getCustomerProfile = createAsyncThunk('customer/getProfile', getCustomerProfileApi)
export const getTransactionHistory = createAsyncThunk('customer/transactions', getTransactionHistoryApi)

export const uploadCSVTemplate = createAsyncThunk('customer/add/bulk', async ({ business_id, data}, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.post(`admin/add/customer/csv/${business_id}/`, data);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
})

export const getCSVTemplate = createAsyncThunk('customer/get/template', async (data, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get("admin/template/");
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
})

const customerSlice = createSlice({
  name: "businessSlice",
  initialState,
  extraReducers: {
    [getCSVTemplate.pending]: (state) => {
      state.isLoading = true;
    },
    [getCSVTemplate.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(payload));
      element.setAttribute('download', 'template.csv');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("Template downloaded successfully.");
    },
    [getCSVTemplate.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Template file not downloaded");
    },
    [getCustomerProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [getCustomerProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.customerDetails = payload.result[0]
    },
    [getCustomerProfile.rejected]: (state) => {
      state.isLoading = false;
    },
    [getTransactionHistory.pending]: (state) => {
      state.isLoading = true;
    },
    [getTransactionHistory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.transactionData = payload.result[0]
      state.pagination = payload?.paginaton || false;
    },
    [getTransactionHistory.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default customerSlice.reducer;