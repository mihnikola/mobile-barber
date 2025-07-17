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
    backgroundColor: "black",
    justifyContent: "center",
    borderColor: "grey",
    color:"white",
    alignItems: "center",
    borderWidth: 1, // Ensure the border is visible
  },
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
