import { useLocalization } from "@/context/LocalizationContext";
import { useRef, useState } from "react";

const usePhoneNumber = (phoneNumberValue) => {
  const phoneNumberRefInput = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState(phoneNumberValue?.slice(4) || null);
  const [isValid, setIsValid] = useState(true);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const { localization } = useLocalization();

  const serbianPhoneRegex = /^\d{8,9}$/;


  const validateSerbianPhoneNumber = (number) => {

    if (number.length === 0) {
      setIsValid(true);
      setErrorPhoneNumber("");
      return true;
    }
    if (serbianPhoneRegex.test(number)) {
      setIsValid(true);
      setErrorPhoneNumber("");
      return true;
    } else {
      setIsValid(false);
      setErrorPhoneNumber(localization.SETTINGS.PROFILE.errorPhoneNumber);
      return false;
    }
  };

  const handlePhoneNumberChange = (text) => {

    setPhoneNumber(text);
    validateSerbianPhoneNumber(text);
  };

  return {
    handlePhoneNumberChange,
    phoneNumber,
    errorPhoneNumber,
    isValid,
    phoneNumberRefInput
  };
};

export default usePhoneNumber;
