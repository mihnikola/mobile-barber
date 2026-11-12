import LoginScreen from "../login";
import { ScrollView } from "react-native";
import { colors } from "@/theme";


const SignForm = () => {
  return (
    <ScrollView style={{ backgroundColor: colors.black }}>
     <LoginScreen /> 
    </ScrollView>
  );
};

export default SignForm;
