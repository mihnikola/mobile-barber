import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const SummaryItem = ({ data, selectedItem, setSelectedItem }) => {
  const { value } = data;
  const handlerPressDate = (data) => {
    setSelectedItem(data);
  };

  return (
    <TouchableOpacity
      style={[
        styles.content,
        selectedItem?.value === value && styles.selectedContent, // Apply selected style
      ]}
      key={value}
      onPress={() => handlerPressDate(data)}
    >
      <Text
        style={[
          styles.time,
          selectedItem?.value === value && styles.selectedTime, // Apply selected style
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
    justifyContent: "center",
    borderColor: "white",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  selectedTime: {
    color: "#000000",
  },
  selectedContent: {
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  time: {
    display: "flex",
    fontSize: 16,
    color: "white",
    fontWeight: "800",
    borderColor: "#ffffff",
  },
});

export default SummaryItem;
