import React, { useState } from "react";
import LoginScreen from "../login";
import Register from "../register";
import { ScrollView } from "react-native";


const SignForm = ({ options }) => {
  const [check, setCheck] = useState(true);

  return (
    <ScrollView>
      {check ? <LoginScreen valueText={options} /> : <Register />}
      
    </ScrollView>
  );
};

export default SignForm;
