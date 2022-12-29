import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addRewardPointsApi, getPointTypesApi, sendMessageApi } from "../utils/apis/admin";
import toast from 'react-hot-toast';
import { addBusinessApi } from "../utils/apis/businesses";
import { addBulkCustomerApi, addCustomerApi } from "../utils/apis/customer";

const initialState = {
  isLoading: false,
  tableData: {
    pointTypesLoading: false,
    pageSize: 10,
    currentPage: 1,
    selectedIds: false,
    selectedFilter: null,
    filters: null,
    pointsTypes: null,
    currentTable: null,
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
export const getPointTypes = createAsyncThunk('reward/types', getPointTypesApi)
export const addBusinesses = createAsyncThunk('business/add', addBusinessApi)
export const addCustomer = createAsyncThunk('customer/add', addCustomerApi)
export const addBulkCustomer = createAsyncThunk('customer/multiple/add', addBulkCustomerApi)
export const sendMessage = createAsyncThunk('user/message', sendMessageApi)


const commonSlice = createSlice({
  name: "loginPage",
  initialState,
  reducers: {
    openConfirmModal: (state, { payload }) => {
      state.confirmModal = {
        ...payload,
        isVisible: true,
      };
    },
    closeConfirmModal: (state) => {
      state.confirmModal = {
        ...state.confirmModal,
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
    [addBulkCustomer.pending]: (state) => {
      state.isLoading = true;
    },
    [addBulkCustomer.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success(
        `${payload?.result[0]?.total_added_employee > 0 ? payload?.result[0]?.total_added_employee : ''} ${payload?.result[0]?.total_added_employee > 0 ? Number(payload?.result[0]?.total_added_employee) > 1
          ? "customers added successfully. \n\n"
          : "customer added successfully. \n\n" : ''
        } ${payload?.result[0]?.not_added_employees.length > 0 ? payload?.result[0]?.not_added_employees.map(customer => customer.index).join() : ""} ${payload?.result[0]?.not_added_employees.length > 0 ? payload?.result[0]?.not_added_employees.length > 1
          ? "customers are not added. \n\n"
          : "customer is not added.\n\n" : ""
        } ${payload?.result[0]?.already_exist_employee.length > 0 ? payload?.result[0]?.already_exist_employee.map(customer => customer?.row[0] + " already exists.").join("\n") : ''} `
      );
      state.modal = {
        ...state.modal,
        isVisible: false,
      };
    },
    [addBulkCustomer.rejected]: (state, { payload }) => {
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
    [sendMessage.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong.");
    },
    [sendMessage.pending]: (state) => {
      state.isLoading = true;
    },
    [sendMessage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success(payload?.message || "Success");
      state.modal = {
        ...state.modal,
        isVisible: false,
      };
    },
  },
});

export const {
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

