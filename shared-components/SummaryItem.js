import { StyleSheet, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "./TouchableOpacity";
import { colors, fonts } from "@/theme";

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
    borderColor: colors.textInactive,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  selectedTime: {
    color: colors.textOnLight,
  },
  selectedContent: {
    backgroundColor: colors.white,
  },
  time: {
    fontSize: 16,
    color: colors.text,
    fontFamily: fonts.bold,
    borderColor: colors.white,
  },
});

export default SummaryItem;
