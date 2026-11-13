import { useLocalization } from "@/context/LocalizationContext";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  FlatList,
} from "react-native";
import { useCompany } from "@/context/CompanyContext";
import { router } from "expo-router";
import SharedBackButton from "@/shared-components/SharedBackButton";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedTitle from "@/shared-components/SharedTitle";
import { SharedLoader } from "@/shared-components/SharedLoader";
import Loader from "@/components/Loader";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";
import { coverSettingsImage } from "@/constants";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";
import { ColorsBarber } from "@/constants/Colors";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { fonts } from "@/theme";
import { Icon } from "@/components/ui";

const LanguageSupportScreen = () => {
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
      {/* <StatusBar backgroundColor=ColorsBarber.dark.background barStyle="dark-content" /> */}
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
        placeholderTextColor={ColorsBarber.dark.inActiveTextColor}
        value={search}
        onChangeText={handleSearch}
      />
      {!isLoading && (
        <FlatList
          data={filteredLanguages}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.languageItem}
              onPress={() => {
                if (localization.code !== item.code) {
                  changeLocalization(item);
                }
              }}
            >
              <Text style={styles.languageText}>{item.label}</Text>
              <Icon name={localization.code === item.code && "check"} size={28} color="text" />
            </TouchableOpacity>
          )}
        />
      )}
      {isLoading && <Loader />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
  },

  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  capture: {
    fontSize: 25,
    color: ColorsBarber.dark.textColor,
    fontFamily: fonts.regular,
    paddingVertical: 130,
  },

  search: {
    color: ColorsBarber.dark.textColorInput,
    backgroundColor: ColorsBarber.dark.inputColor,
    fontFamily: fonts.regular,
    borderColor: ColorsBarber.dark.inActiveTextColor,
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
    backgroundColor: ColorsBarber.dark.btnBgColor,
    borderWidth: 1,
    borderColor: ColorsBarber.dark.borderColor,
  },
  languageText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: ColorsBarber.dark.textColor,
  },
});

export default withSafeArea(LanguageSupportScreen);
