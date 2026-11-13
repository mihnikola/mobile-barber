import { View } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import type { ApiRecord } from "@/context/types";
import { makeStyles } from "@/theme";
import { AppText, Avatar, cardStyles, MetaRow } from "@/components/ui";

/** Extra service row in reservation details (compact ServiceCard look, flat in the details list). */
const SharedOthersServices = ({ data }: { data: ApiRecord; redirectHandler?: unknown }) => {
  const styles = useStyles();
  const { image, name, duration } = data;
  const { localization } = useLocalization();
  const thumb = image || data?.service?.image;
  const title = data?.service
    ? localization.code === "en"
      ? data?.service?.name?.nameEn
      : data?.service?.name?.nameLocal
    : localization.code === "en"
      ? name?.nameEn
      : name?.nameLocal;

  return (
    <View style={[cardStyles.row, styles.row]}>
      {thumb ? <Avatar uri={thumb} size="sm" /> : null}
      <View style={cardStyles.body}>
        <AppText variant="bodyStrong">{title}</AppText>
        <View style={styles.meta}>
          <MetaRow icon="clock">{`${localization.DETAILS.duration} ${data?.service?.duration || duration}`}</MetaRow>
          <MetaRow icon="price" font="bold">{`${localization.DETAILS.price} ${data?.price}`}</MetaRow>
        </View>
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  row: { paddingHorizontal: 32, paddingVertical: 10 },
  meta: { flexDirection: "row", flexWrap: "wrap", columnGap: 16 },
}));

export default SharedOthersServices;
