import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../utils/ApiMiddleware";

const initialState = {
  isLoading: false,
  allBusinesses: null,
}
// export const getBusinesses = createAsyncThunk('business/getAll', getCustomersApi)

// export const getCSVTemplate = createAsyncThunk('customer/template', async ({ rejectWithValue }) => {
//   try {
//     const response = await ApiMiddleware.get("/admin/template/");
//     return response.data;
//   } catch (error) {
//     if (!error.response) {
//       throw rejectWithValue(error);
//     }
//     throw rejectWithValue(error.response.data.message);
//   }
// })

const customerSlice = createSlice({
  name: "businessSlice",
  initialState,
  // extraReducers: {
  //   [getCSVTemplate.pending]: (state, { payload }) => {
  //     state.isLoading = true;
  //   },
  //   [getCSVTemplate.fulfilled]: (state, { payload }) => {
  //     state.isLoading = false;
  //     console.log(payload);
  //   },
  //   [getCSVTemplate.rejected]: (state, { payload }) => {
  //     state.isLoading = false;
  //     console.log(payload);
  //   },
  // },
});

export default customerSlice.reducer;