import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useOpenGoogleMaps } from "../../../components/location/hooks/useOpenGoogleMaps";
import { router } from "expo-router";
import { useSlideAnimations } from "./../../../components/home/hooks/useSlideAnimations";
import HomeCoverImage from "@/components/home/HomeCoverImage";
import HomeImage from "@/components/home/HomeImage";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import { SharedLoader } from "@/shared-components/SharedLoader";
import useFetchLocations from "@/components/places/useFetchLocations";
import LocationsComponent from "@/components/home/LocationsComponent";
import messaging from "@react-native-firebase/messaging";

import * as Notifications from "expo-notifications";
import { saveExpoTokenStorage } from "@/helpers/expoToken";

// 📱 Android kanal — OBAVEZAN za prikaz notifikacija iz FCM konzole
//FIREBASE
Notifications.setNotificationChannelAsync("default", {
  name: "Default",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C",
});
//FIREBASE
let hasHandledInitial = false;
let permissionRequested = false; // globalno, da se permission i token traže samo jednom

export default function App() {
  const { slideAnim, slideAnimBook } = useSlideAnimations();
  const { company, isLoading } = useCompany();
  const [modalVisible, setModalVisible] = useState(false);
  const { openGoogleMapsRoute } = useOpenGoogleMaps();
  const {
    locationsData,
    isLoading: isLoaderLocation,
    error,
    fetchLocations,
  } = useFetchLocations();

  //FIREBASE
  const redirectReservation = (notification) => {
    console.log("notification zocccccccc", notification);
    const id = notification.data.url;
    console.log("NE NotificationProvider+++");

    router.replace({
      pathname: "/(zz_notification)",
      params: { itemId: id },
    });
  };

  //FIREBASE
  // 🔐 Dozvole i token — SAMO JEDNOM
  useEffect(() => {
    const requestPermissionAndToken = async () => {
      try {
        if (permissionRequested) return; // ⚡️ već urađeno
        permissionRequested = true;
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log("✅ Notification permission granted.");
          const token = await messaging().getToken();
          console.log("🔑 FCM Token:", token);
          await saveExpoTokenStorage(token);
        } else {
          console.log("🚫 Notification permission denied.");
        }
      } catch (error) {
        console.error("❌ Error with notification permission/token:", error);
      }
    };

    requestPermissionAndToken();
  }, []);

  //FIREBASE
  useEffect(() => {
    let isMounted = true; // zaštita ako se komponenta unmountuje tokom async poziva
    const setup = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log("🔔 Notification permission:", status);

      // 🔹 2. Android channel (NEOPHODNO za prikaz)
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
        console.log("📢 Notification channel created");
      }
    };
    setup();
    // 📨 App otvorena iz backgrounda
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        console.log(
          "📨 App opened from background:",
          remoteMessage?.notification
        );
        redirectReservation(remoteMessage);
      }
    );

    const clickListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("object",response)
        const data = response?.notification?.request?.content;
        redirectReservation(data);
      }
    );

    // 🚀 App otvorena iz "killed" stanja
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log("hasHandledInitial", hasHandledInitial);

        if (isMounted && remoteMessage && !hasHandledInitial) {
          hasHandledInitial = true; // ✅ obradi samo jednom
          console.log("🚀 App opened from quit:", remoteMessage.notification);
          redirectReservation(remoteMessage);
        }
      })
      .catch((err) => console.log("Error getting initial notification:", err))
      .finally(() => {
        // 🧹 Cleanup – u sledećem mountu neće opet proći
        hasHandledInitial = true;
      });
    // requestPermission();

    return () => {
      isMounted = false;
      unsubscribeOnNotificationOpened();
      Notifications.removeNotificationSubscription(clickListener);
    };
  }, []);
  //END OF FIREBASE

  const { localization } = useLocalization();

  const nextPage = () => {
    router.push("/(tabs)/(02_barbers)");
  };
  const onAboutUs = () => {
    router.push("/(tabs)/(01_home)/whoWeAre");
  };
  const handleLocationSelect = (locationData: any) => {
    setModalVisible(false);
    openGoogleMapsRoute(locationData?.mapLink);
  };

  const openLocationHandler = async () => {
    await fetchLocations();

    console.log("openLocationHandler", locationsData);

    if (locationsData?.length === 1) {
      openGoogleMapsRoute(locationsData[0]?.mapLink);
    } else {
      setModalVisible(true);
    }
  };
  // if (isLoading || isLoaderLocation) {
  //   return <SharedLoader isOpen={isLoaderLocation || isLoading} />;
  // }
  if (modalVisible && locationsData?.length > 1) {
    return (
      <LocationsComponent
        locations={locationsData}
        handleLocationSelect={handleLocationSelect}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={localization.PLACES.title}
        buttonText={localization.PLACES.close}
      />
    );
  }

  if (company) {
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
          <TouchableOpacity
            onPress={nextPage}
            style={styles.btnLocationContent}
          >
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
          <TouchableOpacity
            onPress={onAboutUs}
            style={styles.btnLocationContent}
          >
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
            onPress={openLocationHandler}
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
}

const styles = StyleSheet.create({
  box: {
    width: 400,
    height: 400,
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  boxBook: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
    paddingTop: 330,
  },

  locationContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btnLocationContent: {
    width: "90%",
    backgroundColor: "#222224",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 0,
  },

  address: {
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
});
