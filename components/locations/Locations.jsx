import useFetchLocations from "../places/useFetchLocations";
import PlaceComponent from "../places/PlaceComponent";
import MenuServices from "../services";
import { useEffect } from "react";
import NotFoundLocations from "./../notFound/index";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import Loader from "@/components/legacy/Loader";

const Locations = () => {
  const { locationsData, isLoading, error, fetchLocations } =
    useFetchLocations();

  useEffect(() => {
    fetchLocations();
  }, []);

  if (isLoading) {
    return <PlaceholderComponent isLoading={isLoading} />;
  }

  if (locationsData.length > 1) {
    return <PlaceComponent locationsData={locationsData} />;
  } else if (locationsData.length === 1) {
    return <MenuServices />;
  } else {
    return <NotFoundLocations />;
  }
};

const PlaceholderComponent = ({ isLoading }) => {
  return (
    <>
      <HeaderCoverImageContainer hidden />
      {isLoading && <Loader />}
    </>
  );
};

export default Locations;
