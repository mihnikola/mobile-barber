import MoreServiceComponent from "@/components/moreServices/MoreServiceComponent";
import { withScreen } from "@/components/ui";
const moreServices = () => {
  return <MoreServiceComponent />;
};

export default withScreen(moreServices);
