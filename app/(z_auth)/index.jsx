import LoginScreenComponent from "@/components/login";
import withKeyboardAvoid from "@/components/wrapper/WrapperKeyboard";

const LoginScreen = () => {
  return <LoginScreenComponent />;
};

export default withKeyboardAvoid(LoginScreen);
