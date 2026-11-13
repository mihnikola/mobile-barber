import React from "react";
import { Linking, ScrollView } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { makeStyles } from "@/theme";
import { ListGroup, ListRow, withScreen } from "@/components/ui";

const companyInfo = {
  name: "FusionTechAgency Ltd",
  email: "fusiontechagency.support@gmail.com",
};

/** Help & support (Phase 5.6): company row + support e-mail row (opens the mail app, as before). */
const HelpSupportScreen = () => {
  const styles = useStyles();
  const { localization } = useLocalization();
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${companyInfo.email}`);
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer title={localization.SETTINGS.HELP.title} />
      <ListGroup>
        <ListRow label={localization.SETTINGS.HELP.company} value={companyInfo.name} />
        <ListRow icon="email" label={localization.SETTINGS.HELP.support} onPress={handleEmailPress} />
      </ListGroup>
      <ListGroup>
        <ListRow label={companyInfo.email} onPress={handleEmailPress} />
      </ListGroup>
    </ScrollView>
  );
};

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
}));

export default withScreen(HelpSupportScreen);
