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
    backgroundColor: colors.surfaceItem,
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
    gap: 12,
    height: 120,
  },

  cardReservationPast: {
    backgroundColor: colors.surfaceModal,
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

export default CardReservationItem;
