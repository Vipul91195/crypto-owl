import { getBusinessCustomers } from "../../Redux/businessSlice";
import ApiMiddleware from "../ApiMiddleware";


export const addCustomerApi = async (params, { rejectWithValue, dispatch }) => {
  try {
    const response = await ApiMiddleware.post(`/admin/add/customer/${params?.business_id}/`, params?.customer, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    });
    dispatch(getBusinessCustomers({ business_id: params?.business_id }))
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const getCustomerProfileApi = async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get(`/admin/get/user/profile/?member_id=${params?.member_id}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const getTransactionHistoryApi = async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get(`/transaction/history/?member_id=${params?.member_id}&page=${params?.page || '1'}${params?.search ? '&search='+params?.search : ''}${params?.page_size ? '&page_size='+params?.page_size : '&page_size=10'}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const addBulkCustomerApi = async (params, { rejectWithValue, dispatch }) => {
  try {
    const response = await ApiMiddleware.post(`/admin/add/customer/csv/${params?.business_id}/`, params?.customers, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    });
    dispatch(getBusinessCustomers({ business_id: params?.business_id }))
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}