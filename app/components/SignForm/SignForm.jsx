import React, { useState } from "react";
import LoginScreen from "../login";
import Register from "../register";
import { ScrollView } from "react-native";
import InfoComponent from "@/shared-components/InfoComponent";
import CheckChangeSignInUp from "./CheckChangeSignInUp";

const SignForm = ({ options }) => {
  const [check, setCheck] = useState(true);
  const changeHandler = () => {
    console.log("changeHandler",check,options)
    setCheck(!check);
  };
  if (check) {
    return (
      <ScrollView>
        <LoginScreen />
        <CheckChangeSignInUp check={changeHandler} />
        <InfoComponent title={`Sign in to see your ${options}`} />
      </ScrollView>

    );
  }
  if (!check) {
    return <Register change={changeHandler} />;
  }
};


export default SignForm;
