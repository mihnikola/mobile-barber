import PlaceComponent from "@/components/places/PlaceComponent";
import { withScreen } from "@/components/ui";

function locations() {
  return <PlaceComponent />;
}

export default withScreen(locations);
