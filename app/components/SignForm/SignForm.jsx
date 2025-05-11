import React, { useState } from "react";
import LoginScreen from "../login";
import Register from "../register";

const SignForm = () => {
  const [check, setCheck] = useState(true);
  const changeHandler = () => {
    setCheck(!check);
  };
  if (check) {
    return <LoginScreen change={changeHandler} />;
  }
  if (!check) {
    return <Register change={changeHandler} />;
  }
};
export default SignForm;
