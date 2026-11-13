import { useLocalization } from "@/context/LocalizationContext";
import { ScrollView } from "react-native";
import * as Application from "expo-application";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { makeStyles } from "@/theme";
import { ListGroup, ListRow, withScreen } from "@/components/ui";

/** About the app (Phase 5.6): label/value rows in one list group. */
const AboutApplicationScreen = () => {
  const styles = useStyles();
  const appName = "Book Hair";
  const developerName = "FTA DOO";
  const appVersion = Application.nativeApplicationVersion;

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer title={localization.SETTINGS.ABOUTAPP.title} />
      <ListGroup>
        <ListRow label={localization.SETTINGS.ABOUTAPP.name} value={appName} />
        <ListRow label={localization.SETTINGS.ABOUTAPP.version} value={appVersion} />
        <ListRow label={localization.SETTINGS.ABOUTAPP.dev} value={developerName} />
      </ListGroup>
    </ScrollView>
  );
};

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
}));

export default withScreen(AboutApplicationScreen);
