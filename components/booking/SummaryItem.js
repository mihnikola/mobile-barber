
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

/** Time slot (design system `ds-slot`): outlined, selected = filled primary. */
const useStyles = makeStyles((colors) => ({
  content: {
    width: "22.5%",
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
  },
  selectedContent: { backgroundColor: colors.primary, borderColor: colors.primary },
  time: { fontSize: 15, color: colors.ink, fontFamily: fonts.sansSemiBold, fontVariant: ["tabular-nums"] },
  selectedTime: { color: colors.onPrimary },
}))

export default SummaryItem;
