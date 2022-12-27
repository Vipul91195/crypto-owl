import ApiMiddleware from "../ApiMiddleware";


export const addCustomerApi = async (params, { rejectWithValue, dispatch }) => {
  console.log(params);
  try {
    const response = await ApiMiddleware.post(`/admin/add/customer/${params?.business_id}`, params?.customer, {
      headers: {
        "Content-Type":'multipart/form-data'
      }
    });
    // dispatch(getCustomers())
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}