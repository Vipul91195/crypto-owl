import ApiMiddleware from "../ApiMiddleware";

export const getBusinessesApi = async (params, { rejectWithValue }) => {
  try {
    // ?search=${params?.search}
    const response = await ApiMiddleware.get(`/admin/get/business/`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const getBusinessApi = async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get(`/admin/business/details/${params?.id}/`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const getBusinessCustomersApi = async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get(`/admin/all/customer/${params?.id}/`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const addBusinessApi = async (params, { rejectWithValue }) => {
  console.log(params);
  try {
    const response = await ApiMiddleware.post("/admin/add/business/", params, {
      headers: {
        "Content-Type":'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const removeBusinessApi = async (params, { rejectWithValue }) => {
  // try {
  //   const response = await ApiMiddleware.delete("/admin/...", {
  //     ...params,
  //   });
  //   return response.data;
  // } catch (error) {
  //   if (!error.response) {
  //     throw rejectWithValue(error);
  //   }
  //   throw rejectWithValue(error.response.data.message);
  // }
}