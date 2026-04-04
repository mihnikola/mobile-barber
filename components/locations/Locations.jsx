import useFetchLocations from "../places/useFetchLocations";
import PlaceComponent from "../places/PlaceComponent";
import MenuServices from "../services";
import { useEffect } from "react";
import NotFoundLocations from './../notFound/index'

const Locations = () => {
  const { locationsData, isLoading, error, fetchLocations } =
    useFetchLocations();

  useEffect(() => {
    fetchLocations();
  }, []);
  if (isLoading) {
    return null;
  }

  if (locationsData.length > 1) {
    return <PlaceComponent locationsData={locationsData} />;
  } else  if (locationsData.length === 1){
    return <MenuServices />;
  }else{
    return <NotFoundLocations />;
  }
};

export default Locations;
