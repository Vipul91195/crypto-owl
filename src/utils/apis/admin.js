import { getBusinesses } from "../../Redux/businessSlice";
import ApiMiddleware from "../ApiMiddleware";

export const addRewardPointsApi = async (data, { rejectWithValue, dispatch }) => {
  try {
    const response = await ApiMiddleware.post(`/admin/add/reward/points/`, data);
    dispatch(getBusinesses())
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