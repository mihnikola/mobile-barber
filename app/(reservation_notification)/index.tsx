import withSafeArea from "@/components/wrapper/WrapperSafeArea";
import ResevationNotificationScreen from "../../components/reservationNotification/ResevationNotificationScreen";

const reservationNotification = () => {
  return <ResevationNotificationScreen />;
};

export default withSafeArea(reservationNotification);
