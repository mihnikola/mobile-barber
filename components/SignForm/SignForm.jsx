import LoginScreen from "../login";
import { ScrollView } from "react-native";
import { useTheme } from "@/theme";


const SignForm = () => {
  const { colors } = useTheme();
  return (
    <ScrollView style={{ backgroundColor: colors.black }}>
     <LoginScreen /> 
    </ScrollView>
  );
};

export default SignForm;
