import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { useCompany } from "@/context/CompanyContext";
import { ColorsBarber } from "@/constants/Colors";

const NotFoundLocations = () => {
  const { company } = useCompany();

  const { localization } = useLocalization();


  return (
    <ScrollView style={styles.container}>

      <SharedCoverImage />
      <View style={styles.contentContainer}>
        <Text style={styles.capture}>{localization.PLACES.noFound}</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  capture: {
    fontSize: 22,
   color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Regular",
    alignContent: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
  },
});

export default NotFoundLocations;
