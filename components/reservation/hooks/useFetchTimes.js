import { useState, useEffect, useCallback } from "react";
import { getData } from "@/api/apiService";
import { getCurrentUTCOffset, getTimeForUTCOffset } from "@/helpers";

const useFetchTimes = (date, reservation, isSunday) => {
  const [timesData, setTimesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetError, setResetError] = useState(false);

  const fetchTimes = useCallback(
    async (selectedDate) => {
      setResetError(false);
      setIsLoading(true);
      setError(null);
      if (!selectedDate) {
        setIsLoading(false);
        return; // Don't fetch if no date is selected
      }
      const { employer, service } = reservation;

      if (!employer || !service) {
        setIsLoading(false);
        setError(
          "Employer and service must be selected before fetching times."
        );
        return;
      }

      const serviceData = {
        id: service.id,
        duration: service.duration,
      };
      const employerData = {
        id: employer.id,
      };
      const dateTimeStampValue = getTimeForUTCOffset(getCurrentUTCOffset());

      if (selectedDate.length > 0 || Object.keys(selectedDate).length > 0) {
        try {
          const response = await getData("/times", {
            date: selectedDate,
            employer: employerData,
            service: serviceData,
            dateTimeStampValue,
          });

          setTimesData(response);
          setIsLoading(false);
        } catch (err) {
          setError(err.message || "Error fetching times.");
          setIsLoading(false);
        }
      } else {
        setTimesData([]);
        setResetError(true);
        setIsLoading(false);
      }
    },
    [reservation]
  ); // Dependencies for useCallback

  useEffect(() => {
    if (date && !isSunday) {
      fetchTimes(date);
    }
  }, [date, fetchTimes]);

  return { timesData, isLoading, error, fetchTimes, resetError };
};

export default useFetchTimes;
