import { convertDateDetails } from "@/lib/date";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import { View } from "react-native";
import { fonts, makeStyles } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

const HeaderReservationTime = ({ data }) => {
  const styles = useStyles();
  const { localization } = useLocalization();
  if (!data) return null;

  return (
    <View style={styles.coverContent}>
      <View>
        <Pressable hitSlop={20} onPress={router.back}>
          <Icon name="back" size={25} />
        </Pressable>
      </View>
      <View>
        <AppText variant="legacyTitle">
          {data?.startDateTime} - {data?.finishedTime}
        </AppText>
        <AppText variant="legacyTitle">
          {convertDateDetails(data?.startDate, localization.code)}
        </AppText>
        <AppText variant="legacyTitle">{data?.place}</AppText>
      </View>
    </View>
  );
};

const useStyles = makeStyles((colors) => ({
  coverContent: {
    justifyContent: "space-between",
    height: "100%",
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  locationData: {
   color: colors.text,
    fontFamily: fonts.bold,
  },
}));

export default HeaderReservationTime;
