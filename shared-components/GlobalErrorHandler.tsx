import { SharedMessage } from "./SharedMessage";
import { useGlobalError } from "./../context/GlobalErrorContext";
import { FontAwesome } from "@expo/vector-icons";

const GlobalErrorHandler = () => {
  const { error, hideError } = useGlobalError();

  if (!error) return null;

  const removeEverything = () =>{
    //logout from everything
    hideError();
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
