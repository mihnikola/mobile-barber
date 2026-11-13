import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { TouchableOpacity } from "./TouchableOpacity";
import { colors, fonts } from "@/theme";

const SharedCategoryItem = (props) => {
  const { redirectHandler, data, isSelected } = props;
  const { id, name } = data;

  const { localization } = useLocalization();

  return (
    <TouchableOpacity
      key={id}
      onPress={() => redirectHandler(data)}
      style={[styles.card, isSelected._id === data?._id && styles.isSelected]}
    >
      <View>
        <Text
          style={[
            styles.name,
            isSelected._id === data?._id && styles.nameSelected,
          ]}
        >
          {localization.code === 'en' ? name?.nameEn : name?.nameLocal}

        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  isSelected: {
    backgroundColor: colors.white,
  },
  nameSelected: {
    color: colors.textOnLight,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text,
  },
});

export default SharedCategoryItem;
