import React, { useState } from "react";
import LoginScreen from "../login";
import Register from "../register";
import { View } from "react-native";

const SignForm = ({ options }) => {
  const [check, setCheck] = useState(true);
  const changeHandler = () => {
    setCheck(!check);
  };
  if (check) {
    return (
      <View>
        <LoginScreen change={changeHandler} title={`Sign in to see your ${options}`} />
      </View>
    );
  }
  if (!check) {
    return <Register change={changeHandler} />;
  }
};
export default SignForm;
