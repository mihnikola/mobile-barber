import React, { useEffect, useState } from "react";
import { getStorage } from "@/helpers/token";
import DateComponent from "./DateComponent";
import Loader from "@/components/Loader";
import SignForm from "../SignForm/SignForm";

const DateReservation: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTokenStorage();
  }, []);

  const getTokenStorage = async () => {
    await getStorage("token")
      .then((res) => {
        if (res) {
          setIsLoggedIn(res);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((er) => {
        console.log("errr", er);
      });
  };
  return (
    <>
      {!isLoading && isLoggedIn && <DateComponent />}
      {!isLoading && !isLoggedIn && <SignForm />}
      {isLoading && <Loader />}
    </>
  );
};

export default DateReservation;
