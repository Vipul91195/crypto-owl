import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addRewardPointsApi, getPointTypesApi, removeBusinessApi, searchUserApi, sendMessageApi } from "../utils/apis/admin";
import toast from 'react-hot-toast';
import { addBusinessApi } from "../utils/apis/businesses";
import { addBulkCustomerApi, addCustomerApi } from "../utils/apis/customer";

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
  },
  globalSearch: null
}

export const addRewardPoints = createAsyncThunk('business/add/reward', addRewardPointsApi)
export const getPointTypes = createAsyncThunk('reward/types', getPointTypesApi)
export const addBusinesses = createAsyncThunk('business/add', addBusinessApi)
export const addCustomer = createAsyncThunk('customer/add', addCustomerApi)
export const addBulkCustomer = createAsyncThunk('customer/multiple/add', addBulkCustomerApi)
export const removeBusiness = createAsyncThunk('customer/multiple/remove', removeBusinessApi)
export const sendMessage = createAsyncThunk('user/message', sendMessageApi)
export const searchUser = createAsyncThunk('user/search', searchUserApi)


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
    clearGlobalSearch: (state) => {
      state.globalSearch = null;
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
    [removeBusiness.pending]: (state) => {
      state.isLoading = true;
    },
    [removeBusiness.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      toast.success(payload?.message || "Success");
      payload?.member_id && window.history.back();
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
    [sendMessage.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong.");
    },
    [sendMessage.pending]: (state) => {
      state.isLoading = true;
    },
    [sendMessage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log("asddfdsfkj send message...");
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
    [searchUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload || "Something went wrong.");
    },
    [searchUser.pending]: (state) => {
      state.isLoading = true;
    },
    [searchUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;      
      state.globalSearch = payload?.result[0]?.data;      
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
  clearGlobalSearch,
} = commonSlice.actions;

export default commonSlice.reducer;

