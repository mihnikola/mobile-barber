import ConfirmBookReservation from "@/components/reservation/ConfirmBookReservation";
import { withScreen } from "@/components/ui";

const ReservationSuccessScreen = () => {
  return <ConfirmBookReservation />;
};

export default withScreen(ReservationSuccessScreen);
