import { ColorsBarber } from "@/constants/Colors";
import { convertDateDetails } from "@/helpers";
import { useLocalization } from "@/context/LocalizationContext";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text,  View } from "react-native";
import { fonts } from "@/theme";

const HeaderReservationTime = ({ data }) => {
  const { localization } = useLocalization();
  if (!data) return null;

  return (
    <View style={styles.coverContent}>
      <View>
        <TouchableOpacity hitSlop={20} onPress={router.back}>
          <MaterialIcons name="arrow-back" size={25} color={ColorsBarber.dark.textColor} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.timeData}>
          {data?.startDateTime} - {data?.finishedTime}
        </Text>
        <Text style={styles.dateData}>
          {convertDateDetails(data?.startDate, localization.code)}
        </Text>
        <Text style={styles.dateData}>{data?.place}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  coverContent: {
    justifyContent: "space-between",
    height: "100%",
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  timeData: {
    fontSize: 20,
   color: ColorsBarber.dark.textColor,
    fontFamily: fonts.bold,
  },
  dateData: {
    fontSize: 20,
   color: ColorsBarber.dark.textColor,
    fontFamily: fonts.bold,
  },
  locationData: {
   color: ColorsBarber.dark.textColor,
    fontFamily: fonts.bold,
  },
});

export default HeaderReservationTime;
