import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
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
// import { usePushNotifications } from "@/components/home/hooks/usePushNotifications";

// 📱 Android kanal — OBAVEZAN za prikaz notifikacija iz FCM konzole
Notifications.setNotificationChannelAsync("default", {
  name: "Default",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C",
});

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

  useEffect(() => {
   

    const getFcmToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log("✅ FCM Token:", token);
      } catch (error) {
        console.error("❌ Error getting FCM token:", error);
      }
    };
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Notification permission granted.");
        getFcmToken();
      } else {
        console.log("Notification permission denied.");
      }
    };

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        console.log("📩 Foreground message:", remoteMessage);
         // Extract information from the remote message
      const { notification, data } = remoteMessage;

      // Use expo-notifications to schedule a local notification
      // based on the content of the remote message
      if (notification) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: notification.title || "New Message",
            body: notification.body,
            data: data, // Attach data for handling interaction later
            // You can add a sound, specific channel, etc. here if needed
            // sound: 'default',
          },
          trigger: null, // null means it fires immediately
        });
      }
        // showNotification(remoteMessage.notification);
      }
    );
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        console.log(
          "📨 App opened from background state:",
          remoteMessage.notification
        );
        // showNotification(remoteMessage.notification);
        // Navigate or handle as needed
      }
    );
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "🚀 App opened from quit state:",
            remoteMessage.notification
          );
          // showNotification(remoteMessage.notification);
          // Handle navigation or deep link
        }
      });

    // Initialize permissions and token
    requestPermission();

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);
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
  if (isLoading || isLoaderLocation) {
    return <SharedLoader isOpen={isLoaderLocation || isLoading} />;
  }
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
