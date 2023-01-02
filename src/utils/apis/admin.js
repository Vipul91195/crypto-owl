import { getBusinessCustomers, getBusinesses } from "../../Redux/businessSlice";
import { setCurrentPage } from "../../Redux/commonSlice";
import { getCustomerProfile, getTransactionHistory } from "../../Redux/customerSlice";
import { getUserProfile, getUserTransactions } from "../../Redux/userSlice";
import ApiMiddleware from "../ApiMiddleware";

export const addRewardPointsApi = async ({ business_id, member_id, data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await ApiMiddleware.post(`/admin/add/reward/points/`, data);
    business_id ? dispatch(getBusinessCustomers({ business_id })) : member_id ? dispatch(getCustomerProfile({ member_id })) : dispatch(getBusinesses())
    member_id && dispatch(getTransactionHistory({ member_id }));
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const getPointTypesApi = async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get(`/reward/types/`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const removeBusinessApi = async ({ business_id, member_id, data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await ApiMiddleware.patch("/admin/remove/user/", data);
    dispatch(setCurrentPage(1));
    business_id ? dispatch(getBusinessCustomers({ business_id })) : dispatch(getBusinesses())
    return { member_id, ...response.data };
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const sendMessageApi = async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.post(`/admin/send/message/`, params);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const searchUserApi = async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get(`/search/user/?search=${params?.search}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const userSendRewardPointsApi = async (params, { rejectWithValue, dispatch }) => {
  try {
    const response = await ApiMiddleware.post(`/business/transfer/points/`, params);
    dispatch(getUserTransactions());
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const userProfileEditApi = async (params, { rejectWithValue, dispatch }) => {
  try {
    const response = await ApiMiddleware.put(`/auth/user/profile/update/`, params, {
      headers: {
        "Content-Type":'multipart/form-data'
      }
    });
    dispatch(getUserProfile())
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}