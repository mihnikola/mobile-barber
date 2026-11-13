import React from "react";
import InfoContainerFuture from "./InfoContainerFuture";
import DateFormatComponent from "./DateFormatComponent";
import { cardShadow, makeStyles } from "@/theme";
import { Pressable } from "@/components/ui";

const CardReservationRejected = ({ redirectScreen, item }) => {
  const styles = useStyles();
  return (
    <Pressable
      style={styles.cardReservation}
      key={item._id}
      onPress={() => redirectScreen(item)}
    >
      <DateFormatComponent item={item} rejected={1} />
      <InfoContainerFuture key={item.id} item={item} />
    </Pressable>
  );
};

const useStyles = makeStyles((colors) => ({
  cardReservation: {
    backgroundColor: colors.surface,
    flexDirection: "row",
    gap: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    ...cardShadow(colors),
  },
}));

export default CardReservationRejected;
