import { View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { fonts, makeStyles } from "@/theme";
import { AppText, Pressable } from "@/components/ui";

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
        <AppText
          style={[
            styles.name,
            isSelected._id === data?._id && styles.nameSelected,
          ]}
        >
          {localization.code === 'en' ? name?.nameEn : name?.nameLocal}

        </AppText>
      </View>
    </Pressable>
  );
};

/** Filter chip (design system `ds-chip`): outlined pill, selected = filled primary. */
const useStyles = makeStyles((colors) => ({
  isSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  nameSelected: { color: colors.onPrimary },
  card: {
    minHeight: 36,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  name: { fontSize: 14, fontFamily: fonts.sansMedium, color: colors.ink },
}));

export default SharedCategoryItem;
