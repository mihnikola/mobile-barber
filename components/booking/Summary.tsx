import React from "react";
import { ScrollView, View } from "react-native";
import SummaryItem from "@/components/booking/SummaryItem";
import { makeStyles } from "@/theme";
const Summary = ({ data, selectedItem, setSelectedItem }) => {
  const styles = useStyles();
  return (
    <ScrollView snapToInterval={50} decelerationRate="normal" horizontal>
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
    </ScrollView>
  );
};

const useStyles = makeStyles((colors) => ({
  container: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: colors.background,
  },
}));

export default Summary;
