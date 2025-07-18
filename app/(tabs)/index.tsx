import OnboardingComponent from "@/components/OnboardingComponent";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Animated,
  Dimensions,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";

import FlatButton from "@/shared-components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createOpenLink } from "react-native-open-maps";
import { saveExpoTokenStorage } from "@/helpers/expoToken";
import { PulsingButton } from "@/components/PulsingButton";
import { FontAwesome } from "@expo/vector-icons";
import useOpenGoogleMaps from "../components/location/hooks/useOpenGoogleMaps";

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
const yosemite = { latitude: 43.724943, longitude: 20.6952 };

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
  const destinationName = "Eiffel Tower, Paris";
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

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
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
        <TouchableOpacity onPress={nextPage} style={styles.btnContent}>
          <FontAwesome name="calendar" size={28} color="white" />
          <Text style={styles.title}>Booking</Text>
          <FontAwesome name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAboutUs} style={styles.btnContent}>
          <FontAwesome name="home" size={28} color="white" />
          <Text style={styles.title}>About us</Text>
          <FontAwesome name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openGoogleMapsRoute(destinationLat, destinationLon, destinationName)
          }
          style={styles.btnContent}
        >
          <FontAwesome name="location-arrow" size={28} color="white" />
          <Text style={styles.title}>Location</Text>
          <FontAwesome name="chevron-right" size={28} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* 
      <AboutUsInfo />
      <View style={styles.content}>
        <ListAboutUs />
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.reviewCapture}> {MAIN_DATA.review} </Text>
        <OnboardingComponent />
      </View>

      <View style={styles.content}>
        <Text style={styles.reviewCapture}>{MAIN_DATA.contact}</Text>
        <Text style={styles.text}>{MAIN_DATA.workDays}</Text>
        <Text style={styles.text}>{MAIN_DATA.workSaturday}</Text>
        <Text style={styles.text}>{MAIN_DATA.sunday}</Text>
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.mapCapture}> Location </Text>
        <TouchableHighlight onPress={openYosemiteZoomedOut}>
          <Image
            source={require("../../assets/images/mapimage.jpg")}
            style={styles.mapImage}
          />
        </TouchableHighlight>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 500,
    color: "white",
  },
  btnContent: {
    width: 300,
    backgroundColor: "#222224",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 15,
  },
  contentBtn: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    fontSize: 30,
    fontWeight: 900,
    fontStyle: "italic",
    borderRadius: 300,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  box: {
    width: 400,
    height: 400,
    borderRadius: 10,
    top: 100,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  boxBook: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    gap: 20,
    left: 50,
    bottom: 50,
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
