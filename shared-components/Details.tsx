import React from "react";
import { View } from "react-native";
import DetailsServices from "./DetailsServices";
import DetailsEmployer from "./DetailsEmployer";

// Define the types for employer and service objects

const Details = ({ data }) => {
  const { user, employer, service } = data;
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <DetailsEmployer data={user || employer} />
      <DetailsServices data={service} />
    </View>
  );
};

export default Details;
