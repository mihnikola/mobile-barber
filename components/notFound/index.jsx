import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { useCompany } from "@/context/CompanyContext";
import { colors, fonts } from "@/theme";

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
   color: colors.text,
    fontFamily: fonts.regular,
    alignContent: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default NotFoundLocations;
