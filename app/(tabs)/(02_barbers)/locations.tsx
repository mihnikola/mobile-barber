import PlaceComponent from "@/components/places/PlaceComponent";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";

function locations() {
  return <PlaceComponent />;
}

export default withSafeArea(locations);
