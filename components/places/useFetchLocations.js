import { get } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";
import ReservationContext from "@/context/ReservationContext";
import { useState, useEffect, useContext } from "react";

const useFetchLocations = () => {
  const { reservation, updateReservation } = useContext(ReservationContext);

  const [locationsData, setLocationsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();

  const fetchLocations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get("/places");
      if (response.status === 200) {
        setIsLoading(false);
        const { data } = response;
        if (data?.length > 1) {
          setLocationsData(data);
        } else {
          setLocationsData(data);

          updateReservation({ ...reservation, location: data[0] });
        }
      }
    } catch (err) {
      setError(localization.PLACES.error);
      setIsLoading(false);
    }
  };


  return { locationsData, isLoading, error, fetchLocations };
};

export default useFetchLocations;
