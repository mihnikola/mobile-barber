// src/hooks/useFetchServices.js
import { useState, useEffect, useContext } from "react";
import { get, getData } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";
import ReservationContext from "@/context/ReservationContext";
import { router } from "expo-router";

const useFetchServices = () => {
  const [serviceData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { reservation, updateReservation } = useContext(ReservationContext);


  const { localization } = useLocalization();
  const fetchAllServices = async () => {
    setIsLoading(true);
    setError(null);
    const { location } = reservation;

    try {
      const response = await get(`/services/location/${location.id}`);
      if (response.status === 200) {
        setServicesData(response.data);
      }
    } catch (err) {
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOtherServiceOrEmployers = async (id, service) => {
    console.log("fetchOtherServiceOrEmployers");

    setIsLoading(true);
    setError(null);
    const categoryId = id;
    const placeId = reservation?.location?.id;
    const serviceId = service?.serviceId;
    console.log("categoryId", categoryId);
    console.log("placeId", placeId);
    console.log("serviceId", serviceId);
    updateReservation({ ...reservation, service });

    try {
      const response = await getData(`/categories/${id}`, {
        placeId,
        categoryId,
        serviceId,
      });
      const { type, data, status } = response;

      if (status === 200) {
        if (type === "barbers") {
          // console.log("barbers data",data)
          // setEmployeesData(data);

          router.push("/(tabs)/(02_barbers)/employers");
        }
        if (response.type === "services") {
          const pathName = "/(tabs)/(02_barbers)/moreServices";
          router.push({
            pathname: pathName,
            params: { categoryId },
          });
          // setCategoriesServicesData(response.data);
          // defaultCategoryHandler(response.data[0]);
        }
      }
    } catch (err) {
      console.log("err", err);
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(false);
    }
  };

  const funcDateTimeReservation = async (serviceData) => {
    const service = {
      serviceId: serviceData.id,
      serviceDuration: serviceData.duration,
      servicePrice: serviceData.price,
      name: serviceData.name,
      image: serviceData.image,
    };
    fetchOtherServiceOrEmployers(serviceData.category, service);
    // const pathName = "/(tabs)/(02_barbers)/moreServices";
    // router.push({
    //   pathname: pathName,
    //   params: { categoryId: serviceData.category },
    // });
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  return {
    serviceData,
    isLoading,
    error,
    fetchAllServices,
    funcDateTimeReservation,
  };
};

export default useFetchServices;
