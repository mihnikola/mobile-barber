import Reservation from "@/components/reservation/index";

import { useDismissOnUnauthorizedFocus } from "@/hooks/useRouterTest";
import { withScreen } from "@/components/ui";


const ReservationScreen = () => {
  useDismissOnUnauthorizedFocus();

  return <Reservation />;
};

export default withScreen(ReservationScreen);
