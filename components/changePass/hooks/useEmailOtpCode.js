// src/hooks/useEmailOtpCode.js
// import { useState, useCallback } from "react";
// import { getData } from "@/api/apiService";
// import { router } from "expo-router";

// const useEmailOtpCode = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isMessage, setIsMessage] = useState(false);

//   const checkEmailValidation = useCallback(async (email) => {
//     setIsLoading(true);
//     setError(null);
//     if (email.length === 0) {
//       setIsMessage(true);
//       setError("Please enter your email");
//       setIsLoading(false);
//       return;
//     }
//     try {
//       const response = await getData("/users/email", { params: { email } });
//       if (response.status === 200 && response.success) {
//         setIsLoading(false);
//         router.push({
//           pathname: "/(tabs)/(04_settings)/otpCode",
//           params: { data: email },  
//         });
//       }
//       if (response.status === 200 && !response.success) {
//         console.log("checkEmailValidation 400 response+++", response);        
//         setIsLoading(false);
//         setIsMessage(true);
//         setError("Entered email not found");
//       }
//     } catch (err) {
//       setIsLoading(false);
//       setError(`Not valid email`);
//       setIsMessage(true);
//     }
//   });

//   return {
//     isLoading,
//     error,
//     setError,
//     checkEmailValidation,
//     isMessage,
//     setIsMessage,
//   };
// };

// export default useEmailOtpCode;



























import { useState, useCallback } from "react";
import { getData } from "@/api/apiService";
import { router } from "expo-router";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useEmailOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  const resetState = () => {
    setError(null);
    setIsMessage(false);
  };

  const checkEmailValidation = useCallback(async (email) => {
    resetState();

    if (!email || email.trim().length === 0) {
      setError("Please enter your email");
      setIsMessage(true);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address");
      setIsMessage(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await getData("/users/email", { params: { email } });

      if (response.status === 200) {
        if (response.success) {
          router.push({
            pathname: "/(tabs)/(04_settings)/otpCode",
            params: { data: email },
          });
        } else {
          setError("Entered email not found");
          setIsMessage(true);
        }
      } else {
        setError("Unexpected server response");
        setIsMessage(true);
      }
    } catch (err) {
      setError("Unable to verify email. Please try again later.");
      setIsMessage(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    setError,
    checkEmailValidation,
    isMessage,
    setIsMessage,
  };
};

export default useEmailOtpCode;