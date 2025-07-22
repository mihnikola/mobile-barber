import { useState } from "react";

const usePhoneNumber = (phoneNumberValue) => {

  
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberValue?.slice(4) || null);
  const [isValid, setIsValid] = useState(true);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const serbianPhoneRegex = /^\d{8,9}$/;

console.log("usePhoneNumber",phoneNumber)
console.log("phoneNumberValue",phoneNumberValue)
 

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
    isValid
  };
};

export default usePhoneNumber;
