/**
 * Types of every React context value (Phase 4c, closes the interim `any` from B12).
 * Backend payloads are not modelled yet → `ApiRecord`; tighten field by field when services get types.
 */
import type { Dispatch, SetStateAction } from "react";

import type { ENG_LOCALIZATION } from "@/helpers/en-locale";

export type ApiRecord = Record<string, any>;
type Setter<T> = Dispatch<SetStateAction<T>>;

/** Which async auth action is running (drives button spinners). */
export type AuthLoading = null | "login" | "google" | "ios" | "logout" | "otp" | "verification" | string;

export interface AuthContextValue {
  isLoading: boolean;
  loading: AuthLoading;
  setLoading: Setter<AuthLoading>;
  isToken: string | null;
  getTokenData: () => Promise<void>;
  removeTokenData: () => Promise<void>;
  userData: ApiRecord | null;
  fetchUserData: () => Promise<void>;
  error: ApiRecord | string | null;
  success: string | boolean | ApiRecord | null;
  status: number | null;
  message: string | null;
  isMessage: boolean;
  setIsMessage: Setter<boolean>;
  login: (email: string, password: string) => unknown;
  signIn: () => Promise<void>;
  onAppleButtonPress: () => Promise<void>;
  /** true when the OTP was sent — caller navigates to the OTP screen. */
  verificationOTPCode: () => Promise<boolean | undefined>;
  /** Where to go after the login message; caller navigates. */
  redirectValidation: (data: string | null) => Promise<"settings" | "appointments" | "calendar" | null>;
  redirectValue: string | null;
  setRedirectValue: Setter<string | null>;
  isLogout: boolean;
  setIsLogout: Setter<boolean>;
  logoutHandler: () => Promise<void>;
  logoutFirebase: () => Promise<void>;
  logoutUnAuthorizedUser: () => Promise<void>;
}

export interface ReservationContextValue {
  /** Booking in progress: location, service, otherServices, employer, date, time … */
  reservation: ApiRecord | null;
  updateReservation: (next: ApiRecord | null) => void;
  /** Saves the service and resolves where the flow continues (barbers or more services). */
  flowReservation: (
    service: ApiRecord,
    categoryId: string | number,
  ) => Promise<{ pathName: string; type: string; categoryId?: string | number } | undefined>;
}

export interface CompanyContextValue {
  company: ApiRecord | null;
  getCompany: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface GlobalErrorContextValue {
  error: ApiRecord | null;
  hideError: () => void;
}

/** Locale dictionary (EN and SR share the same shape) incl. `code`. */
export type Localization = typeof ENG_LOCALIZATION;

export interface LocalizationContextValue {
  localization: Localization;
  /** Switch language ("en" | "sr"); also saved locally and sent to the backend. */
  changeLocalization: (language: { code: string }) => void;
  isLoading: boolean;
}

export interface NavigationContextValue {
  lastPath: string | null;
  /** Remember the tab to return to; `btn` marks that it came from a button. */
  saveLastTab: (path: string | null, btn?: boolean) => void;
  btnValue: boolean;
}
