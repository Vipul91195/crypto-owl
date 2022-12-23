import ApiMiddleware from "../ApiMiddleware";

export const addRewardPointsApi = async (data, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.post(`/admin/add/reward/points/`, data);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}