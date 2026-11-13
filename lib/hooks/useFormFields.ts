import { useCallback, useEffect, useRef, useState } from "react";
import type { TextInput } from "react-native";

import { useLocalization } from "@/context/LocalizationContext";
import { confirmPasswordError, isStrongPassword, isValidEmail } from "@/lib/validation";

/** Old hooks validated passwords 500 ms after typing. */
const PASSWORD_VALIDATION_DELAY_MS = 500;

/** Always-current localization inside stable callbacks (fixes B3: messages stuck in the old language). */
function useLatestLocalization() {
  const { localization } = useLocalization();
  const ref = useRef(localization);
  useEffect(() => {
    ref.current = localization;
  }, [localization]);
  return ref;
}

/** setTimeout that cancels the previous pending call and clears on unmount. */
function useDebouncedTask() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return useCallback((task: () => void, ms: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(task, ms);
  }, []);
}

/** Email input state. `validate: false` (login) only stores the value. */
export function useEmailField({ validate = true }: { validate?: boolean } = {}) {
  const emailInputRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const loc = useLatestLocalization();

  const handleEmailChange = useCallback(
    (text: string) => {
      setEmail(text);
      if (validate) setEmailError(isValidEmail(text) ? "" : loc.current.EMAIL.errorValid);
    },
    [validate, loc],
  );

  return { email, setEmail, emailError, handleEmailChange, emailInputRef };
}

/** Password input state (trimmed). `validate: false` (login) skips the strength check. */
export function usePasswordField({ validate = true }: { validate?: boolean } = {}) {
  const passwordInputRef = useRef<TextInput>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loc = useLatestLocalization();
  const later = useDebouncedTask();

  const handlePasswordChange = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      setPassword(trimmed);
      if (validate) {
        later(
          () => setPasswordError(isStrongPassword(trimmed) ? "" : loc.current.PASSWORD.errorRegex),
          PASSWORD_VALIDATION_DELAY_MS,
        );
      }
    },
    [validate, later, loc],
  );

  const togglePasswordVisibility = useCallback(() => setIsPasswordVisible((v) => !v), []);

  return {
    password,
    setPassword,
    passwordError,
    handlePasswordChange,
    isPasswordVisible,
    setIsPasswordVisible,
    togglePasswordVisibility,
    passwordInputRef,
  };
}

/** Confirm-password input state, validated against `password`. */
export function useConfirmPasswordField(password: string) {
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);
  const later = useDebouncedTask();

  const handleConfirmPasswordChange = useCallback(
    (text: string) => {
      setConfirmPassword(text.trim());
      later(() => setPasswordConfirmError(confirmPasswordError(password, text)), PASSWORD_VALIDATION_DELAY_MS);
    },
    [password, later],
  );

  const togglePasswordConfirmVisibility = useCallback(() => setIsPasswordConfirmVisible((v) => !v), []);

  return {
    confirmPassword,
    setConfirmPassword,
    passwordConfirmError,
    handleConfirmPasswordChange,
    isPasswordConfirmVisible,
    setIsPasswordConfirmVisible,
    togglePasswordConfirmVisibility,
    confirmPasswordInputRef,
    /** changePass used this name */
    passwordConfirmInputRef: confirmPasswordInputRef,
  };
}
