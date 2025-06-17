import { useState, useCallback, useEffect } from "react";

const useName = (userName) => {
  const [name, setName] = useState(userName || "");

  // Update state when userName becomes available
  useEffect(() => {
    if (userName) {
      setName(userName);
    }
  }, [userName]);

  const handleNameChange = useCallback((text) => {
    setName(text);
  }, []);

  return { name, handleNameChange, setName };
};

export default useName;