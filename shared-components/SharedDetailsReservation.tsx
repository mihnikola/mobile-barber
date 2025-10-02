import React from "react";
import { View } from "react-native";
import SharedItem from "./SharedItem";
import SharedDetailsEmployerCard from "./SharedDetailsEmployerCard";

const SharedDetailsReservation = ({ data }) => {
  const { employer, service } = data;
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <SharedDetailsEmployerCard data={employer} />
      <SharedItem data={service} />
    </View>
  );
};

export default SharedDetailsReservation;
