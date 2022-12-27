import { getBusinesses } from "../../Redux/businessSlice";
import { setCurrentPage } from "../../Redux/commonSlice";
import ApiMiddleware from "../ApiMiddleware";

export const getBusinessesApi = async (params, { rejectWithValue }) => {
  console.log(params, " business api params");
  try {
    // ?search=${params?.search}&page_size&page=
    const response = await ApiMiddleware.get(`/admin/get/business/?page=${params?.page || '1'}${params?.search ? '&search='+params?.search : ''}${(params?.filter && params?.filter.value !== "") ? '&status='+params?.filter.value : ''}${params?.page_size ? '&page_size='+params?.page_size : ''}`);
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
    const response = await ApiMiddleware.get(`/admin/business/details/${params?.business_id}/`);
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
    // const response = await ApiMiddleware.get(`/admin/get/customer/${params?.business_id}/${params?.search ? '?search='+params?.search : ''}`);
    const response = await ApiMiddleware.get(`/admin/get/customer/${params?.business_id}/?page=${params?.page || '1'}${params?.search ? '&search='+params?.search : ''}${(params?.filter && params?.filter.value !== "") ? '&status='+params?.filter.value : ''}${params?.page_size ? '&page_size='+params?.page_size : ''}`);
    return {...response.data, business_id: params?.business_id};
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const addBusinessApi = async (params, { rejectWithValue, dispatch }) => {
  console.log(params);
  try {
    const response = await ApiMiddleware.post("/admin/add/business/", params, {
      headers: {
        "Content-Type":'multipart/form-data'
      }
    });
    dispatch(getBusinesses())
    dispatch(setCurrentPage(1))
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