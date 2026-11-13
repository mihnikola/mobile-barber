import { useLocalization } from "@/context/LocalizationContext";
import { useEffect, useState } from "react";
import {
  View,
  Image,
  StatusBar,
  TextInput,
  FlatList,
} from "react-native";
import { useCompany } from "@/context/CompanyContext";
import { router } from "expo-router";
import SharedBackButton from "@/components/layout/SharedBackButton";
import SharedCoverImage from "@/components/layout/SharedCoverImage";
import SharedTitle from "@/components/layout/SharedTitle";
import { coverSettingsImage } from "@/constants";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { fonts, makeStyles, useTheme } from "@/theme";
import { AppText, Icon, Loader, Pressable, withScreen } from "@/components/ui";

const LanguageSupportScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles();
  const { changeLocalization, localization, isLoading } = useLocalization();
  const [search, setSearch] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const { company } = useCompany();

  const languageLabels = {
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
  const handleSearch = (text) => {
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
      {/* <StatusBar backgroundColor=colors.background barStyle="dark-content" /> */}
      {/* <SharedBackButton onPress={router.back} />

     
      <SharedCoverImage image={coverSettingsImage} />
      <SharedTitle title={localization.SETTINGS.changeLanguage.capture} /> */}

      <HeaderCoverImageContainer
        title={localization.SETTINGS.changeLanguage.capture}
        image={coverSettingsImage}
      />
      <TextInput
        style={styles.search}
        placeholder={localization?.SETTINGS?.changeLanguage.filterCapture}
        placeholderTextColor={colors.textInactive}
        value={search}
        onChangeText={handleSearch}
      />
      {!isLoading && (
        <FlatList
          data={filteredLanguages}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <Pressable
              style={styles.languageItem}
              onPress={() => {
                if (localization.code !== item.code) {
                  changeLocalization(item);
                }
              }}
            >
              <AppText variant="legacyBody" size={18}>{item.label}</AppText>
              <Icon name={localization.code === item.code && "check"} size={28} color="text" />
            </Pressable>
          )}
        />
      )}
      {isLoading && <Loader />}
    </View>
  );
};
const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  capture: {
    fontSize: 25,
    color: colors.text,
    fontFamily: fonts.regular,
    paddingVertical: 130,
  },

  search: {
    color: colors.textOnLight,
    backgroundColor: colors.white,
    fontFamily: fonts.regular,
    borderColor: colors.textInactive,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 20,
    fontSize: 20,
  },

  languageItem: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 7,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.white,
  },
}));

export default withScreen(LanguageSupportScreen);
