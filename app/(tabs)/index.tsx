import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { saveExpoTokenStorage } from "@/helpers/expoToken";
import { FontAwesome } from "@expo/vector-icons";
import { useOpenGoogleMaps } from "../components/location/hooks/useOpenGoogleMaps";
import { router } from "expo-router";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const { height } = Dimensions.get("window");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function handleRegistrationError(errorMessage: any) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function App() {
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState("");

  const destinationLat = 48.8584;
  const destinationLon = 2.2945;

  const { openGoogleMapsRoute } = useOpenGoogleMaps();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  const nextPage = () => {
    navigation.navigate("(tabs)", { screen: "employers" });
  };
  const onAboutUs = () => {
    navigation.navigate("components/aboutUs/index");
  };

  const slideAnim = useRef(new Animated.Value(-height)).current;
  const slideAnimBook = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Animate to translateY: 0 (its natural position in the center)
      duration: 1000, // Animation duration
      useNativeDriver: true, // Use native driver for better performance
    }).start();
    setTimeout(() => {
      Animated.timing(slideAnimBook, {
        toValue: 0, // Animate to translateY: 0 (its natural position in the center)
        duration: 1000, // Animation duration
        useNativeDriver: true, // Use native driver for better performance
      }).start();
    }, 400);
  }, [slideAnim]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Return true to disable the default back button behavior
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error) => setExpoPushToken(`${error}`));

    //kada je aplikacija ubijena
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response?.notification?.request?.content?.data?.someData?.url) {
        const reservationIdValue =
          response?.notification?.request?.content?.data?.someData?.url;

        navigation.navigate("components/reservation/reservationdetails", {
          itemId: reservationIdValue,
          check: true,
        });
      }
    });
    //kada sam u aplikaciji
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notificationData) => {
        const notificationDatax = notificationData?.request?.content?.data;
        console.log("joj notification data:", notificationDatax);
        setNotification(notificationData);
        (notification) => {
          console.log("notificationListener", notification);

          setNotification(notification);
        };
      }
    );

    //kada sam van aplikacije
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        const notificationData = response.notification.request.content.data;
        navigation.navigate("components/reservation/reservationdetails", {
          itemId: notificationData.someData.reservationId,
          check: true,
        });
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  useEffect(() => {
    if (expoPushToken) {
      saveExpoTokenStorage(expoPushToken);
    }
  }, [expoPushToken]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/homeImage.jpg")}
        style={styles.backImage}
      />
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Image
          source={require("@/assets/images/logoBaber.png")}
          style={styles.logoImage}
        />
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
            <Text style={styles.titleLocation}>Booking</Text>
            <Text style={styles.address}>Book Your Spot</Text>
          </View>

          <FontAwesome name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAboutUs} style={styles.btnLocationContent}>
          <FontAwesome name="home" size={28} color="white" />
          <View style={styles.locationContent}>
            <Text style={styles.titleLocation}>About us</Text>
            <Text style={styles.address}>Our Story</Text>
          </View>
          <FontAwesome name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openGoogleMapsRoute(destinationLat, destinationLon)}
          style={styles.btnLocationContent}
        >
          <FontAwesome name="location-arrow" size={28} color="white" />
          <View style={styles.locationContent}>
            <Text style={styles.titleLocation}>Location</Text>
            <Text style={styles.address}>Where Am I?</Text>
          </View>
          <FontAwesome name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
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
