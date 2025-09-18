import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import useCompany from "../home/hooks/useCompany";
import SharedTabHeader from "@/shared-components/SharedTabHeader";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "sr", label: "Srpski" },
];

const languageSupport = () => {
  const { changeLocalization, localization } = useLocalization();
  const [search, setSearch] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState(LANGUAGES);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = LANGUAGES.filter((lang) =>
      lang.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLanguages(filtered);
  };
    const { company, getCompany } = useCompany();

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />

    

       <SharedTabHeader
        image={company?.media?.coverImageSettings}
        title={localization.SETTINGS.changeLanguage.capture}
      />
      <TextInput
        style={styles.search}
        placeholder={localization?.SETTINGS?.changeLanguage.filterCapture}
        placeholderTextColor="gray"
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredLanguages}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.languageItem}
            onPress={() => changeLocalization(item)}
          >
            <Text style={styles.languageText}>{item.label}</Text>
            <FontAwesome
              name={localization.code === item.code && "check-circle-o"}
              size={28}
              color="white"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  captureContainer: {
    position: "absolute",
    marginHorizontal: 15,
  },
  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  capture: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
    paddingVertical: 130,
  },

  search: {
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 20,
    fontSize: 20,
  },

  languageItem: {
    padding: 20,
    margin: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "gray",
  },
  languageText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
});

export default languageSupport;
