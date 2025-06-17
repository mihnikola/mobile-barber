import { useState, useCallback, useEffect } from "react";

const usePhoneNumber = (phoneNumberValue) => {
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberValue || "");


  // Update state when phoneNumberValue becomes available
  useEffect(() => {
    if (phoneNumberValue) {
      setPhoneNumber(phoneNumberValue);
    }
  }, [phoneNumberValue]);


  const handlePhoneNumberChange = useCallback((text) => {
    setPhoneNumber(text);
  }, []);

  return { phoneNumber, handlePhoneNumberChange, setPhoneNumber };
};

export default usePhoneNumber;
