import { StyleSheet } from "react-native";
import React from "react";
import InfoContainerFuture from "./InfoContainerFuture";
import DateFormatComponent from "./DateFormatComponent";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { colors } from "@/theme";

const CardReservationRejected = ({ redirectScreen, item }) => {
  return (
    <TouchableOpacity
      style={styles.cardReservation}
      key={item._id}
      onPress={() => redirectScreen(item)}
    >
      <DateFormatComponent item={item} rejected={1} />
      <InfoContainerFuture key={item.id} item={item} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default CardReservationRejected;
