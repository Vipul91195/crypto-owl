import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../utils/ApiMiddleware";
import { toast } from "react-hot-toast";
import { getCustomerProfileApi } from "../utils/apis/customer";

const initialState = {
  isLoading: false,
  // allBusinesses: null,
  customerDetails: null
}

// export const getCustomer = createAsyncThunk('customer/get', getCustomerApi)

// export const getBusinesses = createAsyncThunk('business/getAll', getCustomersApi)
export const getCustomerProfile = createAsyncThunk('customer/getProfile', getCustomerProfileApi)

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
    [getCSVTemplate.pending]: (state, { payload }) => {
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
    [getCustomerProfile.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getCustomerProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.customerDetails = payload.result[0]
    },
    [getCustomerProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Template file not downloaded");
    },
  },
});

export default customerSlice.reducer;