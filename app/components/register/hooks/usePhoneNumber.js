import { useState } from "react";

const usePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

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
      setErrorPhoneNumber("Please enter a valid phone number.");
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
  };
};

export default usePhoneNumber;
