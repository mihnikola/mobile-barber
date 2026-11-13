import { router } from "expo-router";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Image,
} from "react-native";
import SharedReservationData from "@/components/booking/SharedReservationData";
import AppointmentsStatuses from "@/components/reservation/AppointmentsStatuses";
import { useAppointment } from "@/context/AppointmentContext";
import HeaderReservationTime from "@/components/reservation/HeaderReservationTime";
import { fonts, makeStyles } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

function HeaderCoverImageContainer({
  title,
  image,
  hidden = false,
  reservation = null,
  reservationData = null,
  status = false,
  nextBtn,
  skip,
  routerHandler,
}) {
  const styles = useStyles();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.25;
  const headerHeightnextBtn = height * 0.15;
  const { active, handleStatus } = useAppointment();

  return (
    <View
      style={[
        styles.heroHeader,
        { height: nextBtn ? headerHeightnextBtn : headerHeight },
      ]}
    >
      {/* Background Image (Rendered only if nextBtn is false) */}
      {!nextBtn && (
        <Image
          source={require("@/assets/images/tabImage.png")}
          style={[StyleSheet.absoluteFill, styles.backgroundImage]}
          resizeMode="cover"
        />
      )}

      {!reservation && !status && !reservationData && (
        <View style={[styles.topBar, hidden ? styles.hidden : styles.show]}>
          {!hidden && (
            <Pressable hitSlop={20} onPress={router.back}>
              <Icon name="back" size={25} />
            </Pressable>
          )}
          <AppText variant="legacyBody" size={32} style={nextBtn && styles.captureNextBtn}>
            {title}
          </AppText>
        </View>
      )}
      {reservation && <SharedReservationData reservation={reservation} />}
      {reservationData && <HeaderReservationTime data={reservationData} />}

      {status && (
        <View style={styles.containerStatus}>
          <View style={styles.containerStatusTitle}>
            <AppText variant="legacyBody" size={32}>{title}</AppText>
          </View>
          <View>
            <AppointmentsStatuses handleStatus={handleStatus} active={active} />
          </View>
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  heroHeader: {
    width: "100%",
    backgroundColor: colors.background,
    overflow: "hidden", // Ensures absolute image doesn't bleed past rounded borders
  },
  nextBtnTitle: {
    fontSize: 15,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  backgroundImage: {
    opacity: 0.6,
    width: "100%",
    height: "100%",
  },
  nextBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBar: {
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: "100%",
  },
  show: {
    justifyContent: "space-between",
  },
  hidden: {
    justifyContent: "flex-end",
  },
  captureNextBtn: {
    fontSize: 28,
    color: colors.text,
    fontFamily: fonts.regular,
  },
  containerStatus: {
    height: "100%",
    justifyContent: "flex-end",
  },
  containerStatusTitle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
}));

export default HeaderCoverImageContainer;