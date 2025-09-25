import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useOpenGoogleMaps } from "../../../components/location/hooks/useOpenGoogleMaps";
import { router } from "expo-router";
import { useSlideAnimations } from "./../../../components/home/hooks/useSlideAnimations";
import { usePushNotifications } from "./../../../components/home/hooks/usePushNotifications";
import HomeCoverImage from "@/components/home/HomeCoverImage";
import HomeImage from "@/components/home/HomeImage";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const { registerForPushNotifications } = usePushNotifications();
  const { slideAnim, slideAnimBook } = useSlideAnimations();
  const { company } = useCompany();
  const { openGoogleMapsRoute } = useOpenGoogleMaps();
  const { localization } = useLocalization();

  const nextPage = () => {
    router.push("/(tabs)/(02_barbers)");
  };
  const onAboutUs = () => {
    router.push("/(tabs)/(01_home)/whoWeAre");
  };

  useEffect(() => {
    setTimeout(async () => {
      await registerForPushNotifications();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <HomeCoverImage image={company?.media?.coverImageHome} />

      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <HomeImage image={company?.media?.logo} />
      </Animated.View>
      <Animated.View
        style={[
          styles.boxBook,
          {
            transform: [{ translateY: slideAnimBook }],
          },
        ]}
      >
        <TouchableOpacity onPress={nextPage} style={styles.btnLocationContent}>
          <FontAwesome name="calendar" size={28} color="white" />

          <View style={styles.locationContent}>
            <Text style={styles.titleLocation}>
              {localization.HOME.bookingBtn}
            </Text>
            <Text style={styles.address}>
              {localization.HOME.bookingBtnDesc}
            </Text>
          </View>

          <FontAwesome name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAboutUs} style={styles.btnLocationContent}>
          <FontAwesome name="home" size={28} color="white" />
          <View style={styles.locationContent}>
            <Text style={styles.titleLocation}>
              {localization.HOME.aboutUsBtn}
            </Text>
            <Text style={styles.address}>
              {localization.HOME.aboutUsBtnDesc}
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openGoogleMapsRoute(company?.mapsLink)}
          style={styles.btnLocationContent}
        >
          <FontAwesome name="location-arrow" size={28} color="white" />
          <View style={styles.locationContent}>
            <Text style={styles.titleLocation}>
              {localization.HOME.locationBtn}
            </Text>
            <Text style={styles.address}>
              {localization.HOME.locationBtnDesc}
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  address: {
    fontStyle: "italic",
    fontSize: 15,
    color: "grey",
  },
  titleLocation: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
  btnContent: {
    width: 300,
    backgroundColor: "#222224",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 15,
  },
  btnLocationContent: {
    width: 300,
    backgroundColor: "#222224",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    marginTop: 10,
  },
  locationContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  box: {
    width: 400,
    height: 400,
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 100,
  },
  boxBook: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
    paddingTop: 330,
  },

  backImage: {
    width: windowWidth,
    height: windowHeight - 30,
    opacity: 0.6,
  },
  logoImage: {
    width: 200,
    height: 300,
  },
});
