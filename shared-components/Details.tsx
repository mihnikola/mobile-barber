import React from "react";
import { View } from "react-native";
import SharedDetailsEmployerCard from "./SharedDetailsEmployerCard";
import SharedDetailsServiceCard from "./SharedDetailsServiceCard";

const Details = ({ data }) => {
  const { employer, service } = data;
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
       <SharedDetailsEmployerCard data={employer}/>
      <SharedDetailsServiceCard data={service} />
    </View>
  );
};

export default Details;
