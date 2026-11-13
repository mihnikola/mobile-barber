import { StyleSheet } from "react-native";
import React from "react";
import InfoContainerFuture from "./InfoContainerFuture";
import InfoContainerPast from "./InfoContainerPast";
import DateFormatComponent from "./DateFormatComponent";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { colors } from "@/theme";

const CardReservationItem = ({ redirectScreen, item }) => {
  return (
    <TouchableOpacity
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardReservationCurrent: {
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
});

export default CardReservationItem;
