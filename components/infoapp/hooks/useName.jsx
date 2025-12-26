import { useState, useCallback, useEffect, useRef } from "react";

const useName = (userName) => {
  const nameRef = useRef(null);
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

  return { name, handleNameChange, setName, nameRef };
};

export default useName;