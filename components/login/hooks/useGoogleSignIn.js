import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { useEffect } from "react";

export default function useGoogleSignIn() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "296975015881-kres44p2oghegd6ieqrur44ak1t89lpg.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  }, []);
  // Somewhere in your code
  const signIn = async () => {
    console.log("object");

    try {
      await GoogleSignin.hasPlayServices();

      const response = await GoogleSignin.signIn();
      console.log("objectx");

      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;
        console.log("object data", idToken, user);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  return { signIn };
}
