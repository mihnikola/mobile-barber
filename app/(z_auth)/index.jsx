import LoginScreenComponent from "@/components/login";
import { withScreen } from "@/components/ui";

const LoginScreen = () => {
  return <LoginScreenComponent />;
};

export default withScreen(LoginScreen, "keyboard");
