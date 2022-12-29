import { getBusinessCustomers, getBusinesses } from "../../Redux/businessSlice";
import ApiMiddleware from "../ApiMiddleware";

export const addRewardPointsApi = async ({ business_id, data }, { rejectWithValue, dispatch }) => {
  try {
    const response = await ApiMiddleware.post(`/admin/add/reward/points/`, data);
    business_id ? dispatch(getBusinessCustomers({ business_id })) : dispatch(getBusinesses())
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

export const sendMessageApi = async (params, { rejectWithValue, dispatch }) => {
  try {
    const response = await ApiMiddleware.post(`/admin/send/message/`, params);
    // dispatch(getBusinessCustomers({ business_id: params?.business_id }))
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}