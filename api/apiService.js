// src/api/apiService.js
import { getLanguageValue } from "@/helpers/language";
import { getStorage } from "@/helpers/token";
import axios from "axios";
import { showGlobalMessage } from "@/helpers/error-handler";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000, // Adjust as needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to inject the token and timezone
instance.interceptors.request.use(
  async (config) => {
    const token = await getStorage();
    const languageValue = await getLanguageValue();
    const timeZoneValue = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (timeZoneValue) {
      config.headers["Time-Zone"] = timeZoneValue;
    }
    if (languageValue) {
      config.headers["Language"] = languageValue;
    } else {
      config.headers["Language"] = "sr";
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = error.response?.data?.code;
    if (code === "UNAUTHORIZED_TOKEN" || code === "ACCOUNT_DELETED") {
      showGlobalMessage({ type: code });
    }
    // Always reject so callers receive the real AxiosError
    // (network errors / timeouts previously resolved to undefined).
    return Promise.reject(error);
  },
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
      params: data,
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
    const headers = { ...config.headers };

    // 🔑 KLJUČNA STVAR: Ako je data instanca FormData, 
    // MORAMO ukloniti Content-Type da bi Axios sam dodao multipart/form-data sa boundary-jem!
    if (data instanceof FormData) {
      delete headers['Content-Type'];

      // Za svaki slucaj, ako je u globalnim podešavanjima instance postavljen Content-Type,
      // u novijim verzijama Axios-a ovo je dovoljno, ali možemo eksplicitno proslediti null:
    }

    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }
    const response = await instance.put(url, data, {
      ...config,
      headers,
    });

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
