import { SharedMessage } from "./SharedMessage";
import { useGlobalError } from "./../context/GlobalErrorContext";
import { FontAwesome } from "@expo/vector-icons";
import { removeStorage } from "@/helpers/token";
import { removeOtpParamsStorage } from "@/helpers/verificationOtpParams";
import { useAuth } from "@/context/AuthContext";
import { SharedLoader } from "./SharedLoader";

const GlobalErrorHandler = () => {
  const { error, hideError } = useGlobalError();

  const { isLoading, logoutFirebase } = useAuth();
  if (!error) return null;

  const removeEverything = async () => {
    //logout from everything
    await logoutFirebase();
    hideError();
  };

  if (isLoading) {
    return <SharedLoader />;
  }

  return (
    <SharedMessage
      isOpen={!!error}
      title={error.title}
      buttonText="OK"
      icon={<FontAwesome name={"close"} size={64} color="white" />}
      onClose={hideError}
      onConfirm={removeEverything}
    />
  );
};

export default GlobalErrorHandler;
