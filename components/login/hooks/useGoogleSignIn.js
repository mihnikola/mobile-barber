import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { useEffect } from "react";
import useLoginForm from "./useLoginForm";

export default function useGoogleSignIn() {
  const { isLoading, success, isMessage, error, loginViaGoogle, setIsMessage } = useLoginForm();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "296975015881-kres44p2oghegd6ieqrur44ak1t89lpg.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  }, []);
  const signIn = async () => {

    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        loginViaGoogle(response.data);
      } else {
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
        }
      } else {
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {}
  };
  return { signIn, isLoading, isMessage, error, success, signOut, setIsMessage };
}
