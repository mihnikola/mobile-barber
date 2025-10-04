import React, { useState } from "react";
import { View } from "react-native";
import SharedItem from "./SharedItem";
import SharedDetailsEmployerCard from "./SharedDetailsEmployerCard";
import SharedDetailsServiceCard from "./SharedDetailsServiceCard";

const SharedDetailsReservation = ({ data }) => {
  const { employer, service } = data;

  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <SharedDetailsEmployerCard data={employer}/>
      <SharedDetailsServiceCard data={service} />
    </View>
  );
};

export default SharedDetailsReservation;
