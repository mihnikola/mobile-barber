import React from "react";
import InfoContainerFuture from "./InfoContainerFuture";
import DateFormatComponent from "./DateFormatComponent";
import { cardShadow, makeStyles, radii } from "@/theme";
import { Pressable } from "@/components/ui";

const CardReservationPending = ({ redirectScreen, item }) => {
  const styles = useStyles();
  return (
    <Pressable
      style={styles.cardReservation}
      key={item._id}
      onPress={() => redirectScreen(item)}
    >
      <DateFormatComponent item={item} />
      <InfoContainerFuture item={item} key={item.id || item._id} />
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
    borderRadius: radii.lg,
    ...cardShadow(colors),
  },
}));

export default CardReservationPending;
