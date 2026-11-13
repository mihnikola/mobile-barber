import { ScrollView } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { makeStyles } from "@/theme";
import { EmptyState } from "@/components/ui";

/** "No locations" screen (Phase 5.6): DS empty state instead of the faded cover photo. */
const NotFoundLocations = () => {
  const styles = useStyles();
  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <EmptyState icon="locationDot" title={localization.PLACES.noFound} />
    </ScrollView>
  );
};

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { flexGrow: 1, justifyContent: "center" },
}));

export default NotFoundLocations;
