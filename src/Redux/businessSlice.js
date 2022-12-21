import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../utils/ApiMiddleware";

const initialState = {
  isLoading: false,
  allBusinesses: null,
}

export const getBusinesses = createAsyncThunk('business/getAll', async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get("/admin/all/business/", {
      ...params,
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
})

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