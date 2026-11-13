import React from "react";
import OtpCodeComponent from "@/components/otpCode/index";
import { withScreen } from "@/components/ui";

const otpCode = () => {
  return <OtpCodeComponent />;
};

export default withScreen(otpCode);
