import React, { useEffect, useState } from "react";
import { getStorage } from "@/helpers/token";
import DateComponent from "./DateComponent";
import Loader from "@/components/Loader";
import SignForm from "../SignForm/SignForm";
import { router } from "expo-router";

const DateReservation: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTokenStorage();
  }, []);

  const getTokenStorage = async () => {
        console.log("getTokenStorage")

    await getStorage("token")
      .then((res) => {
        console.log("{dsasdasdsa}",res)
        if (res) {

          setIsLoggedIn(res);
          setIsLoading(false);
        } else {
          console.log("unproved")
          router.push("/(tabs)/(04_settings)/login")
          setIsLoading(false);
        }
      })
      .catch((er) => {
        console.log("errr", er);
      });
  };
  console.log("object",isLoading,isLoggedIn)
  return (
    <>
      {!isLoading && isLoggedIn && <DateComponent />}
      {!isLoading && !isLoggedIn && <SignForm />}
      {isLoading && <Loader />}
    </>
  );
};

export default DateReservation;
