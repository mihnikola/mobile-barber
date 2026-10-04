import MoreServiceComponent from "@/components/moreServices/MoreServiceComponent";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";
const moreServices = () => {
  return <MoreServiceComponent />;
};

export default withSafeArea(moreServices);
