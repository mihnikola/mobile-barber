import { ScrollView, StyleSheet, View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/components/layout/SharedCoverImage";
import { useCompany } from "@/context/CompanyContext";
import { colors } from "@/theme";
import { AppText } from "@/components/ui";

const NotFoundLocations = () => {
  const { company } = useCompany();

  const { localization } = useLocalization();


  return (
    <ScrollView style={styles.container}>

      <SharedCoverImage />
      <View style={styles.contentContainer}>
        <AppText size={22} style={styles.capture}>{localization.PLACES.noFound}</AppText>
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
    alignContent: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default NotFoundLocations;
