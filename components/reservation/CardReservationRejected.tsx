import React from "react";
import InfoContainerFuture from "./InfoContainerFuture";
import DateFormatComponent from "./DateFormatComponent";
import { makeStyles } from "@/theme";
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
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
    gap: 12,
    height: 120,
  },
}));

export default CardReservationRejected;
