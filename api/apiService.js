// src/api/apiService.js
import { getStorage } from "@/helpers";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000, // Adjust as needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to inject the token
instance.interceptors.request.use(
  async (config) => {
    const token = await getStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally (optional)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response Interceptor Error:", error);
    if (error.response && error.response.data && error.response.data.message) {
      console.error("Server Error Message:", error.response.data.message);
    }
    return Promise.reject(error);
  }
);

const get = async (url, config = {}) => {
  try {
    const response = await instance.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getData = async (url, data, config = {}) => {
  try {
    const response = await instance.get(url, {
      ...config,
      params: data, // Pass data as query params
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const post = async (url, data, config = {}) => {
  try {
    const response = await instance.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const put = async (url, data, config = {}) => {
  try {
    const response = await instance.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const patch = async (url, data, config = {}) => {
  try {
    const response = await instance.patch(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const del = async (url, config = {}) => {
  try {
    const response = await instance.delete(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { del as delete, get, getData, patch, post, put };

