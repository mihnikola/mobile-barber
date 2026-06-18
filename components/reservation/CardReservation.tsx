import { ScrollView } from "react-native";
import CardReservationItem from "./CardReservationItem";

const CardReservation = ({ redirectScreen, reservations }) => {
  return (
    <ScrollView>
      {reservations?.length > 0 &&
        reservations.map((item: any) => (
          <CardReservationItem key={item._id} item={item} redirectScreen={redirectScreen} />
        ))}
    </ScrollView>
  );
};

export default CardReservation;
