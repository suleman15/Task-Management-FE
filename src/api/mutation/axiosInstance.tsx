import axios, { AxiosInstance, Method } from "axios";

// Define a type for the request parameters for axiosRequest
interface AxiosRequestParams {
  url: string;
  token?: string;
  data?: any;
  method?: Method;
}

// Define a type for the request parameters for axiosRequestMultipart
interface AxiosRequestMultipartParams {
  url: string;
  token?: string;
  formData?: FormData;
  method?: Method;
}

// AXIOS INSTANCE FOR JSON
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// AXIOS INSTANCE FOR MULTIPART
export const axiosInstanceMultipart: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  // timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const axiosRequest = async ({
  url,
  token,
  data,
  method,
}: AxiosRequestParams): Promise<any> => {
  try {
    console.log(token);
    const request = await axiosInstance(url, {
      method: method || "GET",
      data: data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log(request);
    return request.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const axiosRequestMultipart = async ({
  url,
  token,
  formData,
  method,
}: AxiosRequestMultipartParams): Promise<any> => {
  try {
    console.log(token);
    const request = await axiosInstanceMultipart(url, {
      method: method || "POST",
      data: formData,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log(request.data);
    return request.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
