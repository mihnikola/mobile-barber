import useFetchLocations from "../../../components/places/useFetchLocations";
import PlaceComponent from "../../../components/places/PlaceComponent";
import { SharedLoader } from "../../../shared-components/SharedLoader";
import Services from "../../../components/services";
import { useCallback, useEffect } from "react";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

const EmployersComponent = () => {
  const { locationsData, isLoading, error, fetchLocations } =
    useFetchLocations();

  const { data } = useLocalSearchParams();
  console.log("data", data);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (data) router.dismissAll();
  //   }, [])
  // );

  useEffect(() => {
    fetchLocations();
  }, [data]);

  if (isLoading) {
    return <SharedLoader />;
  }
  if (locationsData.length > 1) {
    return <PlaceComponent />;
  } else {
    return <Services />;
  }
};

export default withSafeArea(EmployersComponent);
