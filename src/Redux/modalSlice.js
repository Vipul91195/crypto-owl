import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addRewardPointsApi } from "../utils/apis/admin";
import toast from 'react-hot-toast';
import { addBusinessApi } from "../utils/apis/businesses";

const initialState = {
  isLoading: false,
  tableData: {
    selectedIds: false,
  },
  confirmModal: {
    isVisible: false,
    title: "",
    message: ""
  },
  modal: {
    isVisible: false,
    type: null,
  }
}

export const addRewardPoints = createAsyncThunk('business/add/reward', addRewardPointsApi)
export const addBusinesses = createAsyncThunk('business/add', addBusinessApi)

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
      openModal: (state, {payload}) => {
        state.modal =  {
          ...payload,
          isVisible: true
        };
      },
      closeModal: (state) => {
        state.modal =  {
          ...state.modal,
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
      toast.success(payload?.message || "Success");
      state.modal =  {
        ...state.modal,
        isVisible: false
      }
    },
    [addRewardPoints.rejected]: (state, {payload}) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong.");
    },
    [addBusinesses.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [addBusinesses.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success(payload?.message || "Success");
      state.modal =  {
        ...state.modal,
        isVisible: false
      }
    },
    [addBusinesses.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong.");
    },
  }
});

export const {
  openConfirmModal,
  closeConfirmModal,
  setSelectedIds,
  closeModal,
  openModal,
} = modalSlice.actions;

export default modalSlice.reducer;

