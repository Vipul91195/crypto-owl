import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addRewardPointsApi } from "../utils/apis/admin";

const initialState = {
  isLoading: false,
  tableData: {
    selectedIds: false,
  },
  confirmModal: {
    isVisible: false,
    title: "",
    message: ""
  }
}

export const addRewardPoints = createAsyncThunk('business/add/reward', addRewardPointsApi)

const modalSlice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
      openConfirmModal: (state, {payload}) => {
        state.confirmModal =  {
          ...payload,
          isVisible: true
        };
      },
      closeConfirmModal: (state) => {
        state.confirmModal =  {
          ...state.confirmModal,
          isVisible: false
        }
      },
      setSelectedIds: (state, {payload}) => {
        state.tableData.selectedIds = payload;
      }
  },
  extraReducers: {
    [addRewardPoints.pending]: (state, {payload}) => {
      state.isLoading = true;
    },
    [addRewardPoints.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
    },
    [addRewardPoints.rejected]: (state, {payload}) => {
      state.isLoading = false;
    },
  }
});

export const { openConfirmModal, closeConfirmModal } = modalSlice.actions;

export default modalSlice.reducer;

