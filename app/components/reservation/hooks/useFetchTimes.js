import { useState, useEffect, useCallback } from "react";
import { getData } from "@/api/apiService";
import { convertAmPmTo24HourFormat } from "@/helpers";


const useFetchTimes = (date, reservation) => {
  const [timesData, setTimesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTimes = useCallback(
    async (selectedDate) => {
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

      const {dateString} = selectedDate;

      const dateValue = new Date();
      const qwerttqwqew = `${dateString || selectedDate}T` + dateValue.toLocaleTimeString();
      const adasdda = convertAmPmTo24HourFormat(qwerttqwqew);
      const dateValueData = adasdda.fullDateTime24Hour;
      try {
        const response = await getData("/times", {
          date: dateValueData,
          employer: employerData,
          service: serviceData,
        });

        setTimesData(response);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching times:", err);
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    },
    [reservation]
  ); // Dependencies for useCallback

  useEffect(() => {
    if (date) {
      fetchTimes(date);
    }
  }, [date, fetchTimes]);

  return { timesData, isLoading, error, fetchTimes };
};

export default useFetchTimes;
