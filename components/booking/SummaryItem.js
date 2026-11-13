
import React from "react";
import { fonts, makeStyles } from "@/theme";
import { AppText, Pressable } from "@/components/ui";

const SummaryItem = ({ data, selectedItem, setSelectedItem }) => {
  const styles = useStyles();
  const { value } = data;
  const handlerPressDate = (data) => {
    setSelectedItem(data);
  };

  return (
    <Pressable
      style={[
        styles.content,
        selectedItem?.value === value && styles.selectedContent, // Apply selected style
      ]}
      key={value} 
      onPress={() => handlerPressDate(data)}
    >
      <AppText
        style={[
          styles.time,
          selectedItem?.value === value && styles.selectedTime, // Apply selected style
        ]}
      >
        {value}
      </AppText>
    </Pressable>
  );
};

const useStyles = makeStyles((colors) => ({
  content: {
    width: 100,
    height: 50,
    justifyContent: "center",
    borderColor: colors.inkMuted,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  selectedTime: {
    color: colors.onPrimary,
  },
  selectedContent: {
    backgroundColor: colors.primary,
  },
  time: {
    fontSize: 16,
    color: colors.ink,
    fontFamily: fonts.sansSemiBold,
    borderColor: colors.primary,
  },
}));

export default SummaryItem;
