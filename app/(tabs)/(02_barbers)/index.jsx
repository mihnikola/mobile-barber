import Employers from "../../../components/employers";
import useFetchLocations from '../../../components/places/useFetchLocations';
import PlaceComponent from "../../../components/places/PlaceComponent";
import { SharedLoader } from './../../../shared-components/SharedLoader';
import Services from "../../../components/services";

const EmployersComponent = () => {
  const { locationsData, isLoading, error } = useFetchLocations();

  if (isLoading) {
    return <SharedLoader />
  }
  if (locationsData.length > 1) {
    return <PlaceComponent />;
  } else {
    return <Services />;
  }

};


export default EmployersComponent;
