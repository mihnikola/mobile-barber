import React from "react";
import { View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { fonts, makeStyles } from "@/theme";
import { AppText } from "@/components/ui";

function SummaryService({ service, data, totalDuration, totalPrice }) {
  const styles = useStyles();
  const totals = data?.reduce(
    (acc, current) => {
      acc.totalPrice += current.price;
      acc.totalDuration += current.duration;
      return acc;
    },
    { totalPrice: 0, totalDuration: 0 },
  );
  const { localization } = useLocalization();
  return (
    <View>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View>
            <AppText variant="legacySubtitle">
              {localization.SERVICES.totalDuration}
            </AppText>
          </View>
          <View>
            {totalDuration && <AppText variant="legacyBody" size={18}>{totalDuration}{" min"}</AppText>}
            {!totalDuration && (
              <AppText variant="legacyBody" size={18}>
                {totals.totalDuration + service?.serviceDuration ||
                  service?.duration}
                {" min"}
              </AppText>
            )}
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View>
            <AppText variant="legacySubtitle">
              {localization.SERVICES.totalPrice}
            </AppText>
          </View>
          <View>
            {totalPrice && <AppText variant="legacyBody" size={18}>{totalPrice}{" rsd"}</AppText>}
            {!totalPrice && (
              <AppText variant="legacyBody" size={18}>
                {totals.totalPrice + service?.servicePrice || service?.price}
                {" rsd"}
              </AppText>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
const useStyles = makeStyles((colors) => ({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.surfaceRaised,
  },
  dividerText: {
    color: colors.text,
    marginHorizontal: 10,
    fontSize: 15,
    fontFamily: fonts.bold,
  },
}));
export default SummaryService;
