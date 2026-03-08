import React from "react";
import OtpCodeComponent from "@/components/otpCode/index";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";

const otpCode = () => {
  return <OtpCodeComponent />;
};

export default withSafeArea(otpCode);
