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

function HeaderCoverImageContainer({
  title,
  image,
  hidden = false,
  reservation = null,
  reservationData = null,
  status = false,
}) {
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.25;
  const { active, handleStatus } = useAppointment();
  return (
    <ImageBackground
      source={{ uri: image }}
      style={[styles.heroHeader, { height: headerHeight }]}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      {!reservation && !status && !reservationData && (
        <View style={[styles.topBar, hidden ? styles.hidden : styles.show]}>
          {!hidden && (
            <TouchableOpacity hitSlop={20} onPress={router.back}>
              <MaterialIcons name="arrow-back" size={25} color="white" />
            </TouchableOpacity>
          )}
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
    backgroundColor: "#000000",
  },
  backgroundImage: {
    opacity: 0.5,
  },
  topBar: {
    paddingHorizontal: 15,
    paddingVertical: 10,
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
    color: "white",
    fontWeight: "500",
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
