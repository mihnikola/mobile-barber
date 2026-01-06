import useFetchLocations from "../../../components/places/useFetchLocations";
import PlaceComponent from "../../../components/places/PlaceComponent";
import { SharedLoader } from "../../../shared-components/SharedLoader";
import Services from "../../../components/services";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";

const EmployersComponent = () => {
  const { locationsData, isLoading, error } =
    useFetchLocations();


  if (isLoading) {
    return <SharedLoader isOpen={isLoading} />;
  }
  if (locationsData.length > 1) {
    return <PlaceComponent locationsData={locationsData} />;
  } else {
    return <Services />;
  }
};

export default withSafeArea(EmployersComponent);
