import React from "react";
import { View } from "react-native";
import SharedItem from "./SharedItem";

const Details = ({ data }) => {
  const { employer, service } = data;
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <SharedItem data={employer} />
      <SharedItem data={service} />
    </View>
  );
};

export default Details;
