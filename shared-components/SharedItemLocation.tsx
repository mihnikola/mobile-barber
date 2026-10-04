import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useLocalization } from "@/context/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";

const SharedItemLocation = (props: any) => {
  const { redirectHandler, data } = props;
  const { id, address } = data;
  const { localization } = useLocalization();

  return (
    <TouchableOpacity
      key={id}
      onPress={() => redirectHandler(data)}
      style={styles.card}
    >
      <FontAwesome6 name="location-dot" size={30} color={ColorsBarber.dark.locationIcon} />
      <View style={styles.detailsContainer}>
        <Text style={styles.address}>{address}</Text>
      </View>
       <FontAwesome name="chevron-right" size={32} color={ColorsBarber.dark.arrowIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: ColorsBarber.dark.item, // Dark background from your image
    borderRadius: 12,
    padding: 20,
    marginVertical: 8, // Spacing between cards
    marginHorizontal: 15, // Side padding for the list
    alignItems: "center",
    shadowColor: ColorsBarber.dark.background, // For a subtle shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap:20,
    alignContent:"center",
    alignSelf: 'center',
    elevation: 5, // For Android shadow
  },

  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  address: {
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.dark.textColor, // White text color
    marginBottom: 4,
  },
});

export default SharedItemLocation;
