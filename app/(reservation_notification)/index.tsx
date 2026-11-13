import ResevationNotificationScreen from "../../components/reservationNotification/ResevationNotificationScreen";
import { withScreen } from "@/components/ui";

const reservationNotification = () => {
  return <ResevationNotificationScreen />;
};

export default withScreen(reservationNotification);
