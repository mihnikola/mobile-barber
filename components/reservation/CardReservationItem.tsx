import React from "react";
import InfoContainerFuture from "./InfoContainerFuture";
import InfoContainerPast from "./InfoContainerPast";
import DateFormatComponent from "./DateFormatComponent";
import { makeStyles } from "@/theme";
import { Pressable } from "@/components/ui";

const CardReservationItem = ({ redirectScreen, item }) => {
  const styles = useStyles();
  return (
    <Pressable
      style={[
        item?.past
          ? styles.cardReservationPast
          : styles.cardReservationCurrent,
      ]}
      key={item._id}
      onPress={() => redirectScreen(item)}
    >
      <DateFormatComponent item={item} />
      {!item?.past && <InfoContainerFuture item={item} />}
      {item?.past && <InfoContainerPast item={item} />}
    </Pressable>
  );
};

const useStyles = makeStyles((colors) => ({
  cardReservationCurrent: {
    backgroundColor: colors.surface,
    flexDirection: "row",
    gap: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
  },
  cardReservationPast: {
    backgroundColor: colors.surface,
    flexDirection: "row",
    gap: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
  },
}));

export default CardReservationItem;
