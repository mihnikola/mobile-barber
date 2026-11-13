import { View, Text, Image } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { fonts, makeStyles } from "@/theme";
import { Pressable } from "@/components/ui";

const SharedCategoryItem = (props) => {
  const styles = useStyles();
  const { redirectHandler, data, isSelected } = props;
  const { id, name } = data;

  const { localization } = useLocalization();

  return (
    <Pressable
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
    </Pressable>
  );
};

const useStyles = makeStyles((colors) => ({
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
}));

export default SharedCategoryItem;
