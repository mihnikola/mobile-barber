import Reservation from "@/components/reservation/index";
import { useAuth } from "@/context/AuthContext";
import EmployersComponent from "@/app/(tabs)/(02_barbers)";
import { useDismissOnUnauthorizedFocus } from "@/hooks/useRouterTest";

const ReservationScreen = () => {
  useDismissOnUnauthorizedFocus();

  return <Reservation />;
};

export default ReservationScreen;
