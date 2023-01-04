import { getBusinesses } from "../../Redux/businessSlice";
import { setCurrentPage } from "../../Redux/commonSlice";
import ApiMiddleware from "../ApiMiddleware";

export const getBusinessesApi = async (params, { rejectWithValue }) => {
  try {
    const response = await ApiMiddleware.get(
      `/admin/get/business/?page=${params?.page || "1"}${
        params?.search ? "&search=" + params?.search : ""
      }${
        params?.filter && params?.filter.value !== ""
          ? "&status=" + (params?.filter.value).toLowerCase()
          : ""
      }${params?.page_size ? "&page_size=" + params?.page_size : ""}${
        params?.order_by ? "&order_by=" + params?.order_by : ""
      }${
        params?.sort_personal_points ? "&sort_personal_points=" + params?.sort_personal_points : ""
      }${
        params?.sort_business_points ? "&sort_business_points=" + params?.sort_business_points : ""
      }`
    );
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
    const response = await ApiMiddleware.get(
      `/admin/get/customer/${params?.business_id}/?page=${params?.page || "1"}${
        params?.search ? "&search=" + params?.search : ""
      }${
        params?.filter && params?.filter.value !== ""
          ? "&status=" + (params?.filter.value).toLowerCase()
          : ""
      }${params?.page_size ? "&page_size=" + params?.page_size : ""}${
        params?.order_by ? "&order_by=" + params?.order_by : ""
      }${
        params?.sort_personal_points ? "&sort_personal_points=" + params?.sort_personal_points : ""
      }${
        params?.sort_business_points ? "&sort_business_points=" + params?.sort_business_points : ""
      }`
    );
    return {...response.data, business_id: params?.business_id};
  } catch (error) {
    if (!error.response) {
      throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
  }
}

export const addBusinessApi = async (params, { rejectWithValue, dispatch }) => {
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

// export const removeBusinessApi = async (params, { rejectWithValue }) => {
//   try {
//     const response = await ApiMiddleware.patch("/admin/remove/user/", {
//       ...params,
//     });
//     return response.data;
//   } catch (error) {
//     if (!error.response) {
//       throw rejectWithValue(error);
//     }
//     throw rejectWithValue(error.response.data.message);
//   }
// }