import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addRewardPointsApi, getPointTypesApi, removeBusinessApi } from "../utils/apis/admin";
import toast from 'react-hot-toast';
import { addBusinessApi } from "../utils/apis/businesses";
import { addCustomerApi } from "../utils/apis/customer";

const initialState = {
  isLoading: false,
  tableData: {
    isLoading: false,
    pointTypesLoading: false,
    pageSize: 10,
    currentPage: 1,
    selectedIds: false,
    selectedFilter: null,
    filters: null,
    pointsTypes: null,
    currentTable: null,
  },
  notifyModal: {
    isVisible: false,
    title: "",
    message: ""
  },
  ConfirmModal: {
    isLoading: false,
    isVisible: false,
    title: "",
    message: "",
    action: false,
  },
  modal: {
    isVisible: false,
    type: null,
  }
}

export const addRewardPoints = createAsyncThunk('business/add/reward', addRewardPointsApi)
export const getPointTypes = createAsyncThunk('reward/types', getPointTypesApi)
export const addBusinesses = createAsyncThunk('business/add', addBusinessApi)
export const addCustomer = createAsyncThunk('customer/add', addCustomerApi)
export const addBulkCustomer = createAsyncThunk('customer/multiple/add', addBulkCustomerApi)
export const removeBusiness = createAsyncThunk('customer/multiple/add', removeBusinessApi)

const commonSlice = createSlice({
  name: "loginPage",
  initialState,
  reducers: {
    openNotifyModal: (state, { payload }) => {
      state.notifyModal = {
        ...payload,
        isVisible: true,
      };
    },
    closeNotifyModal: (state) => {
      state.notifyModal = {
        ...state.notifyModal,
        isVisible: false,
      };
    },
    openConfirmModal: (state, { payload }) => {
      state.ConfirmModal = {
        ...state.ConfirmModal,
        ...payload,
        isVisible: true,
      };
    },
    closeConfirmModal: (state) => {
      state.ConfirmModal = {
        ...state.ConfirmModal,
        isVisible: false,
      };
    },
    openModal: (state, { payload }) => {
      state.modal = {
        ...payload,
        isVisible: true,
      };
    },
    closeModal: (state) => {
      state.modal = {
        ...state.modal,
        isVisible: false,
      };
    },
    setSelectedIds: (state, { payload }) => {
      state.tableData.selectedIds = payload;
    },
    setTableFilter: (state, { payload }) => {
      state.tableData.selectedFilter = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.tableData.currentPage = payload;
    },
    clearFilter: (state) => {
      state.tableData.filters = null;
      state.tableData.selectedFilter = null;
    },
  },
  extraReducers: {
    [addRewardPoints.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [addRewardPoints.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success(payload?.message || "Success");
      state.modal = {
        ...state.modal,
        isVisible: false,
      };
      state.tableData = {
        ...state.tableData,
        selectedIds: false,
      };
    },
    [addRewardPoints.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong.");
    },
    [addBusinesses.pending]: (state) => {
      state.isLoading = true;
    },
    [addBusinesses.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success(payload?.message || "Success");
      state.modal = {
        ...state.modal,
        isVisible: false,
      };
    },
    [addBusinesses.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong.");
    },
    [addCustomer.pending]: (state) => {
      state.isLoading = true;
    },
    [addCustomer.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success(payload?.message || "Success");
      state.modal = {
        ...state.modal,
        isVisible: false,
      };
    },
    [addCustomer.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong.");
    },
    [getPointTypes.pending]: (state) => {
      state.pointTypesLoading = true;
    },
    [getPointTypes.fulfilled]: (state, { payload }) => {
      state.pointTypesLoading = false;
      state.tableData = {
        ...state.tableData,
        pointsTypes: payload.result[0],
      };
    },
    [getPointTypes.rejected]: (state) => {
      state.pointTypesLoading = false;
    },
    [removeBusiness.pending]: (state) => {
      state.isLoading = true;
    },
    [removeBusiness.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success(payload?.message || "Success");
      state.modal = {
        ...state.modal,
        isVisible: false,
      };
      state.tableData = {
        ...state.tableData,
        selectedIds: false,
      };
    },
    [removeBusiness.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  openNotifyModal,
  closeNotifyModal,
  openConfirmModal,
  closeConfirmModal,
  setSelectedIds,
  clearFilter,
  setTableFilter,
  closeModal,
  setCurrentPage,
  openModal,
} = commonSlice.actions;

export default commonSlice.reducer;

