import ApiMiddleware from "../ApiMiddleware";

export const getUserProfileApi = async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get(`/admin/get/user/profile/`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const getUserTransactionsApi = async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get(`/transaction/history/?page=${params?.page || '1'}${params?.search ? '&search='+params?.search : ''}${params?.page_size ? '&page_size='+params?.page_size : '&page_size=10'}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}