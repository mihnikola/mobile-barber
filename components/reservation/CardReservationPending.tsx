import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import InfoContainerFuture from "./InfoContainerFuture";
import DateFormatComponent from "./DateFormatComponent";

const CardReservationPending = ({ redirectScreen, item }) => {
  return (
    <TouchableOpacity
      style={styles.cardReservation}
      key={item._id}
      onPress={() => redirectScreen(item)}
    >
      <DateFormatComponent item={item} />
      <InfoContainerFuture item={item} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardReservation: {
    backgroundColor: "#1E1E1E",
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

export default CardReservationPending;
