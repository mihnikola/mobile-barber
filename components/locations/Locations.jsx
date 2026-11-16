import useFetchLocations from "../places/useFetchLocations";
import PlaceComponent from "../places/PlaceComponent";
import MenuServices from "../services";
import { useEffect } from "react";
import NotFoundLocations from "./../notFound/index";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { Loader } from "@/components/ui";
import { useLocationsRefresh } from "@/lib/locationsRefresh";

const Locations = () => {
  const { locationsData, isLoading, error, fetchLocations } =
    useFetchLocations();

  // live data: fetched on first open and again on every "Rezerviši" press (never reused)
  const refresh = useLocationsRefresh();
  useEffect(() => {
    fetchLocations();
  }, [refresh]);

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
