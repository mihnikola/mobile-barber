import { useState, useEffect } from "react";

const usePhoneNumber = (phoneNumberValue) => {
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberValue || "");
const phoneNumberRegex = /^\+?(\d{1,3})?[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}$/;

const [isValidPhoneNumber, setIsValid] = useState(true);
  // Update state when phoneNumberValue becomes available
  useEffect(() => {
    if (phoneNumberValue) {
      setPhoneNumber(phoneNumberValue);
    }
  }, [phoneNumberValue]);


const handlePhoneNumberChange = (text) => {
  setPhoneNumber(text);
  if (phoneNumberRegex.test(text)) {
    setIsValid(true);
  } else {
    setIsValid(false);
  }
};

  return { phoneNumber, handlePhoneNumberChange, setPhoneNumber, isValidPhoneNumber };
};

export default usePhoneNumber;
