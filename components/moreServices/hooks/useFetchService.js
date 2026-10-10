import { useState, useEffect } from "react";
import { get } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";

const useFetchService = () => {
  const [serviceData, setServicesData] = useState([]);
  const [categoriesServicesData, setCategoriesServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCategorySelected, setIsCategorySelected] = useState(null);

  const { localization } = useLocalization();
  const handleSelectCategory = (data) => {
    setIsCategorySelected(data);
  };

  const defaultCategoryHandler = (data) => {
    setIsCategorySelected(data);
  };
  const fetchAllServices = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get(`/categories/${id}`);
      
      if (response.status === 200) {
        setCategoriesServicesData(response.data);
        // const { services, categories } = response.data;
        // setServicesData(services);
        // setCategoriesData(categories);
        defaultCategoryHandler(response.data[0]);
      }
    } catch (err) {
      console.log("err", err);
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(false);
    }
  };

  return { serviceData, isLoading, error, fetchAllServices, categoriesServicesData, isCategorySelected, handleSelectCategory };
};

export default useFetchService;
