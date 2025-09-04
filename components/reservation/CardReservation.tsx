import CardReservationItem from "./CardReservationItem";

const CardReservation = ({ redirectScreen, reservations }) => {
  return (
    <>
      {reservations?.length > 0 &&
        reservations.map((item: any) => (
          <CardReservationItem key={item._id} item={item} redirectScreen={redirectScreen} />
        ))}
    </>
  );
};

export default CardReservation;
