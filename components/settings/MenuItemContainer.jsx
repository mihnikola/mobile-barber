import { View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { ListGroup, ListRow } from "@/components/ui";
import { useTheme } from "@/theme";

/** Profile menu (design system `ds-list` groups, Ekran12). Ids are handled by SettingsComponent. */
const MenuItemContainer = ({ onPress, isToken }) => {
  const { localization } = useLocalization();
  const { mode } = useTheme();
  return (
    <View>
      <ListGroup>
        <ListRow icon="translate" label={localization.SETTINGS.changeLanguage.capture} onPress={() => onPress("2")} />
        <ListRow
          icon="theme"
          label={localization.SETTINGS.THEME.title}
          value={localization.SETTINGS.THEME[mode]}
          onPress={() => onPress("300")}
        />
      </ListGroup>
      <ListGroup>
        <ListRow icon="contacts" label={localization.SETTINGS.ABOUTAPP.title} onPress={() => onPress("100")} />
        <ListRow icon="support" label={localization.SETTINGS.HELP.title} onPress={() => onPress("900")} />
        <ListRow icon="document" label={localization.SETTINGS.LEGAL.title} onPress={() => onPress("200")} />
      </ListGroup>
      {isToken && (
        <ListGroup>
          <ListRow icon="logout" label={localization.SETTINGS.LOGOUT.title} onPress={() => onPress("6")} danger />
        </ListGroup>
      )}
    </View>
  );
};

export default MenuItemContainer;
