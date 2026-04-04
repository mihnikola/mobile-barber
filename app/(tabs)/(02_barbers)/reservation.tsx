import Reservation from "@/components/reservation/index";

import { useDismissOnUnauthorizedFocus } from "@/hooks/useRouterTest";


const ReservationScreen = () => {
  useDismissOnUnauthorizedFocus();

  return <Reservation />;
};

export default ReservationScreen;
