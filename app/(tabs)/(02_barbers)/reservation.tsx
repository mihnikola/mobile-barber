import Reservation from "@/components/reservation/index";
import { useAuth } from "@/context/AuthContext";
import EmployersComponent from "@/app/(tabs)/(02_barbers)";

const ReservationScreen = () => {
  const { isToken } = useAuth();
  console.log("ReservationScreen isToken", isToken);
  if (!isToken) {
    return <EmployersComponent />;
  }
  return <Reservation />;
};

export default ReservationScreen;
