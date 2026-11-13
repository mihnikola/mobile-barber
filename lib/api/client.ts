import axios, { type AxiosRequestConfig } from "axios";

import { showGlobalMessage } from "@/helpers/error-handler";
import { getLanguageValue } from "@/helpers/language";
import { getStorage } from "@/helpers/token";

/**
 * HTTP client (moved from api/apiService.js in Phase 3.1, behaviour unchanged):
 * - adds Bearer token, Time-Zone and Language headers
 * - shows the global UNAUTHORIZED/ACCOUNT_DELETED message
 * - always rejects with the real AxiosError (B2)
 * Each helper resolves to `response.data`.
 */
const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getStorage();
    const languageValue = await getLanguageValue();
    const timeZoneValue = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (timeZoneValue) config.headers["Time-Zone"] = timeZoneValue;
    config.headers["Language"] = languageValue || "sr";
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
    return Promise.reject(error);
  },
);

// Callers are mostly untyped JS today; `any` keeps them compiling. Typed services come with Phase 4.
export const get = async (url: string, config: AxiosRequestConfig = {}): Promise<any> =>
  (await instance.get(url, config)).data;

/** GET with query params. */
export const getData = async (url: string, params?: unknown, config: AxiosRequestConfig = {}): Promise<any> =>
  (await instance.get(url, { ...config, params })).data;

export const post = async (url: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<any> =>
  (await instance.post(url, data, config)).data;

/** PUT; FormData bodies are sent as multipart/form-data. */
export const put = async (url: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<any> => {
  const headers: Record<string, any> = { ...config.headers };
  if (data instanceof FormData) headers["Content-Type"] = "multipart/form-data";
  return (await instance.put(url, data, { ...config, headers })).data;
};

export const patch = async (url: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<any> =>
  (await instance.patch(url, data, config)).data;

const del = async (url: string, config: AxiosRequestConfig = {}): Promise<any> =>
  (await instance.delete(url, config)).data;

export { del as delete };
