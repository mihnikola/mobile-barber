import { useEffect, useState } from "react";

const usePhoneNumber = (phoneNumberValue) => {

  
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberValue?.slice(4) || "");
  const [isValid, setIsValid] = useState(true);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const serbianPhoneRegex = /^(?:6\d|1\d|2\d|3\d|4\d|5\d)\d{6,9}$/;


 

  const validateSerbianPhoneNumber = (number) => {
    const cleanedNumber = number.replace(/[^\d+]/g, "");

    if (cleanedNumber.length === 0) {
      setIsValid(true);
      setErrorPhoneNumber("");
      return true;
    }
    if (serbianPhoneRegex.test(cleanedNumber)) {
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
