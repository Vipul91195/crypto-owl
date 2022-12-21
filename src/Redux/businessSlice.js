import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addBusinessApi,
  getBusinessApi,
  getBusinessCustomersApi,
  getBusinessesApi,
} from "../utils/apis/businesses";

const initialState = {
  isLoading: false,
  allBusinesses: null,
}

export const getBusinesses = createAsyncThunk('business/getAll', getBusinessesApi)
export const getBusinessCustomers = createAsyncThunk('business/getCustomers', getBusinessCustomersApi)
export const getBusiness = createAsyncThunk('business/get', getBusinessApi)
export const addBusinesses = createAsyncThunk('business/add', addBusinessApi)

const businessSlice = createSlice({
  name: "businessSlice",
  initialState,
  extraReducers: {
    [getBusinesses.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getBusinesses.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
    [getBusinesses.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
    },
  },
});

export default businessSlice.reducer;