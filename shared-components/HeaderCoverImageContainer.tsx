import { router } from "expo-router";
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SharedReservationData from "./SharedReservationData";
import AppointmentsStatuses from "@/components/reservation/AppointmentsStatuses";
import { useAppointment } from "@/context/AppointmentContext";
import HeaderReservationTime from "@/components/reservation/HeaderReservationTime";
import { ColorsBarber } from "@/constants/Colors";

function HeaderCoverImageContainer({
  title,
  image,
  hidden = false,
  reservation = null,
  reservationData = null,
  status = false,
  nextBtn,
  skip,
  routerHandler
}) {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.25;
  const { active, handleStatus } = useAppointment();


  return (
    <ImageBackground
      source={require("./../assets/images/tabImage.png")}
      style={[styles.heroHeader, { height: headerHeight }]}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      {!reservation && !status && !reservationData && (
        <View style={[styles.topBar, hidden ? styles.hidden : styles.show]}>
          <View style={[nextBtn && styles.nextBtn]}>
            {!hidden && (
              <TouchableOpacity hitSlop={20} onPress={router.back}>
                <MaterialIcons
                  name="arrow-back"
                  size={25}
                  color={ColorsBarber.dark.textColor}
                />
              </TouchableOpacity>
            )}
            {nextBtn && (
              <>
                <TouchableOpacity
                  hitSlop={20}
                  onPress={routerHandler}
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.nextBtnTitle}>{skip}</Text>

                  <MaterialIcons
                    name="arrow-forward"
                    size={25}
                    color={ColorsBarber.dark.textColor}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
          <Text style={styles.capture}>{title}</Text>
        </View>
      )}
      {reservation && <SharedReservationData reservation={reservation} />}
      {reservationData && <HeaderReservationTime data={reservationData} />}

      {status && (
        <View style={styles.containerStatus}>
          <View style={styles.containerStatusTitle}>
            <Text style={styles.capture}>{title}</Text>
          </View>
          <View>
            <AppointmentsStatuses handleStatus={handleStatus} active={active} />
          </View>
        </View>
      )}
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  heroHeader: {
    width: "100%",
    backgroundColor: ColorsBarber.dark.background,
  },
  nextBtnTitle: {
    fontSize: 15,
    color: ColorsBarber.dark.inputColor,
    fontFamily: "OldStandard-Regular",
  },
  backgroundImage: {
    opacity: 0.6,
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
  capture: {
    fontSize: 32,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Regular",
  },
  containerStatus: {
    height: "100%",
    justifyContent: "flex-end",
  },
  containerStatusTitle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
export default HeaderCoverImageContainer;
