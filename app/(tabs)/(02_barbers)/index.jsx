import useFetchLocations from "../../../components/places/useFetchLocations";
import PlaceComponent from "../../../components/places/PlaceComponent";
import { SharedLoader } from "./../../../shared-components/SharedLoader";
import Services from "../../../components/services";
import { useEffect } from "react";

const EmployersComponent = () => {
  const { locationsData, isLoading, error, fetchLocations } =
    useFetchLocations();

  useEffect(() => {
    fetchLocations();
  }, []);

  if (isLoading) {
    return <SharedLoader />;
  }
  if (locationsData.length > 1) {
    return <PlaceComponent />;
  } else {
    return <Services />;
  }
};

export default EmployersComponent;
