import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const SummaryItem = ({ data, selectedItem, setSelectedItem }) => {
  const { _id: id, value } = data;
  const handlerPressDate = (data) => {
    setSelectedItem(data);
  };

  return (
    <TouchableOpacity
      style={[
        styles.content,
        selectedItem?._id === id && styles.selectedContent, // Apply selected style
      ]}
      key={id}
      onPress={() => handlerPressDate(data)}
    >
      <Text
        style={[
          styles.time,
          selectedItem?._id === id && styles.selectedTime, // Apply selected style
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    width: 100,
    height: 50,
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    borderColor: "white",
    color: "white",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  // btn: {
  //   paddingVertical: 15,
  //   marginTop: 20,
  //   marginBottom: 30,
  // },
  selectedTime: {
    color: "black",
  },
  selectedContent: {
    backgroundColor: "white", // Green background when selected
    borderColor: "black", // Darker border when selected
  },
  time: {
    display: "flex",
    fontSize: 16,
    color: "white",
    fontWeight: "800",
  },
});

export default SummaryItem;
