import { ScrollView } from "react-native";

import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { AppText, ListGroup, ListRow, Radio, withScreen } from "@/components/ui";
import { useLocalization } from "@/context/LocalizationContext";
import { makeStyles, type ThemeMode, useTheme } from "@/theme";

const MODES: ThemeMode[] = ["system", "light", "dark"];

/** Profile → Theme: System / Light / Dark (persisted, D-024). */
function ThemeScreen() {
  const styles = useStyles();
  const { localization } = useLocalization();
  const { mode, setMode } = useTheme();

  return (
    <ScrollView style={styles.screen}>
      <HeaderCoverImageContainer title={localization.SETTINGS.THEME.title} />
      <ListGroup>
        {MODES.map((m) => (
          <ListRow
            key={m}
            label={localization.SETTINGS.THEME[m]}
            onPress={() => setMode(m)}
            right={<Radio selected={mode === m} />}
          />
        ))}
      </ListGroup>
      <AppText variant="bodySm" color="inkMuted" style={styles.hint}>
        {localization.SETTINGS.THEME.hint}
      </AppText>
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) => ({
  screen: { flex: 1, backgroundColor: colors.bg },
  hint: { marginHorizontal: 16, marginTop: 4 },
}));

export default withScreen(ThemeScreen);
