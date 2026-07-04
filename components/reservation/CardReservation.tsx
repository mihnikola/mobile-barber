import { ScrollView } from "react-native";
import CardReservationItem from "./CardReservationItem";
import CardReservationPending from "./CardReservationPending";
import CardReservationRejected from "./CardReservationRejected";

const reservationComponents = {
  0: CardReservationItem,
  1: CardReservationRejected,
  2: CardReservationPending,
  
};

const CardReservation = ({ reservations = [], redirectScreen }) => (
  <ScrollView>
    {reservations.map((item) => {
      const Component = reservationComponents[item.status];

      if (!Component) return null;

      return (
        <Component key={item._id} item={item} redirectScreen={redirectScreen} />
      );
    })}
  </ScrollView>
);

export default CardReservation;
