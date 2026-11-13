/**
 * Backend calls grouped by domain (Phase 4e). Contexts and hooks call these instead of
 * combining HTTP verbs with URLs themselves. Every function resolves to the response body
 * (`{ status, data, message, ... }` envelope) exactly like the raw client did.
 * Payload/response models are still loose; tighten per endpoint when the backend contract is known.
 */
import { get, getData, post, put } from "./client";
import { endpoints } from "./endpoints";

type Id = string | number;

export const authApi = {
  login: (body: unknown) => post(endpoints.users.login, body),
  loginIos: (body: unknown) => post(endpoints.users.loginIos, body),
  loginViaGoogle: (body: unknown) => post(endpoints.users.loginViaGoogle, body),
  loginVerify: (body: unknown) => post(endpoints.users.loginVerify, body),
  logout: (body: unknown) => post(endpoints.users.logout, body),
  sendOtpViaLogin: (params: unknown) => getData(endpoints.users.sendOtpViaLogin, params),
  otpCode: (params: unknown) => getData(endpoints.users.otpCode, params),
  verifyEmail: (params: unknown) => getData(endpoints.users.verifyEmail, params),
};

export const usersApi = {
  register: (body: unknown) => post(endpoints.users.root, body),
  list: (params: unknown) => getData(endpoints.users.root, params),
  byToken: (token: string) => get(endpoints.users.byToken(token)),
  update: (token: string, body: unknown) => put(endpoints.users.byToken(token), body),
  byEmail: (params: unknown) => getData(endpoints.users.byEmail, params),
  changePassword: (email: string, body: unknown) => put(endpoints.users.changePassword(email), body),
  changeLanguage: (token: string, body: unknown) => put(endpoints.users.changeLanguage(token), body),
};

export const catalogApi = {
  initial: () => get(endpoints.initial),
  company: () => get(endpoints.company),
  places: () => get(endpoints.places),
  times: (params: unknown) => getData(endpoints.times, params),
  servicesByLocation: (locationId: Id) => get(endpoints.services.byLocation(locationId)),
  category: (categoryId: Id, params: unknown) => getData(endpoints.categories.byId(categoryId), params),
};

export const availabilitiesApi = {
  list: (params: unknown) => getData(endpoints.availabilities.root, params),
  create: (body: unknown) => post(endpoints.availabilities.root, body),
  byId: (reservationId: Id) => get(endpoints.availabilities.byId(reservationId)),
  update: (reservationId: Id, body: unknown) => put(endpoints.availabilities.byId(reservationId), body),
};
