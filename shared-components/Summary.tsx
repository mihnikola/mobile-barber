import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SummaryItem from "./SummaryItem";
const Summary = ({ data, selectedItem, setSelectedItem }) => {
  
  return (
    <ScrollView snapToInterval={50} decelerationRate="normal" horizontal>
      <View style={styles.container}>
        {data?.map((item: any) => (
          <SummaryItem key={item._id} data={item} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Summary;
