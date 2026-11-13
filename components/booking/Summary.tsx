import React from "react";
import { View } from "react-native";
import SummaryItem from "@/components/booking/SummaryItem";
import { makeStyles } from "@/theme";
const Summary = ({ data, selectedItem, setSelectedItem }) => {
  const styles = useStyles();
  return (
    // ds-slots: 4-column grid instead of a horizontal scroller
    <View>
      <View style={styles.container}>
        {data?.map((item: any) => (
          <SummaryItem
            key={item.value}
            data={item}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 16, paddingVertical: 8 },
}))

export default Summary;
