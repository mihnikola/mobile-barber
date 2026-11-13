/**
 * Every backend URL in one place (Phase 3.1). Paths are relative to EXPO_PUBLIC_API_URL.
 * Dynamic segments are functions; encode values there if the backend ever needs it.
 */
export const endpoints = {
  initial: "/initial",
  company: "/company",
  places: "/places",
  times: "/times",
  services: {
    byLocation: (locationId: string | number) => `/services/location/${locationId}`,
  },
  categories: {
    byId: (categoryId: string | number) => `/categories/${categoryId}`,
  },
  availabilities: {
    root: "/availabilities",
    byId: (reservationId: string | number) => `/availabilities/${reservationId}`,
  },
  users: {
    root: "/users",
    byToken: (token: string) => `/users/${token}`,
    byEmail: "/users/email",
    changePassword: (email: string) => `/users/${email}/changePassword`,
    changeLanguage: (token: string) => `/users/${token}/changeLanguage`,
    login: "/users/login",
    loginIos: "/users/loginIos",
    loginViaGoogle: "/users/loginViaGoogle",
    loginVerify: "/users/loginVerify",
    logout: "/users/logout",
    otpCode: "/users/otpcode",
    verifyEmail: "/users/verifyEmail",
    sendOtpViaLogin: "/users/sendOTPviaLogin",
  },
} as const;
