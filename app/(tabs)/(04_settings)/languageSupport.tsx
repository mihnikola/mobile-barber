import { useLocalization } from "@/context/LocalizationContext";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import { useCompany } from "@/context/CompanyContext";
import { coverSettingsImage } from "@/constants";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { fonts, makeStyles, useTheme } from "@/theme";
import { ListGroup, ListRow, Loader, Radio, withScreen } from "@/components/ui";

const LanguageSupportScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles();
  const { changeLocalization, localization, isLoading } = useLocalization();
  const [search, setSearch] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState<{ code: string; label: string }[]>([]);
  const { company } = useCompany();

  const languageLabels: Record<string, { en: string; sr: string }> = {
    sr: {
      en: "Engleski",
      sr: "Srpski",
    },
    en: {
      en: "English",
      sr: "Serbian",
    },
  };
  const LANGUAGES = [
    { code: "en", label: languageLabels[localization.code]?.en || "English" },
    { code: "sr", label: languageLabels[localization.code]?.sr || "Serbian" },
  ];
  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = LANGUAGES.filter((lang) =>
      lang.label.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredLanguages(filtered);
  };

  useEffect(() => {
    setFilteredLanguages(LANGUAGES);
  }, [localization.code]);

  return (
    <View style={styles.container}>
      <HeaderCoverImageContainer title={localization.SETTINGS.changeLanguage.capture} image={coverSettingsImage} />
      <TextInput
        style={styles.search}
        placeholder={localization?.SETTINGS?.changeLanguage.filterCapture}
        placeholderTextColor={colors.inkFaint}
        value={search}
        onChangeText={handleSearch}
      />
      {!isLoading && (
        <ListGroup>
          {filteredLanguages.map((item) => (
            <ListRow
              key={item.code}
              label={item.label}
              onPress={() => {
                if (localization.code !== item.code) {
                  changeLocalization(item);
                }
              }}
              right={<Radio selected={localization.code === item.code} />}
            />
          ))}
        </ListGroup>
      )}
      {isLoading && <Loader />}
    </View>
  );
};

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
  // ds-input
  search: {
    minHeight: 48,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
    backgroundColor: colors.surface,
    color: colors.ink,
    fontFamily: fonts.sans,
    fontSize: 16,
  },
}));

export default withScreen(LanguageSupportScreen);
