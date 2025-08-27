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
  Platform,
  Button,
} from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { FontAwesome } from "@expo/vector-icons";
import { useOpenGoogleMaps } from "../../../components/location/hooks/useOpenGoogleMaps";
import { router } from "expo-router";
import { useSlideAnimations } from "./../../../components/home/hooks/useSlideAnimations";
import { usePushNotifications } from "@/components/home/hooks/usePushNotifications";

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

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
// 226477309327-f76v9adhck2pbfiihstjdfi6ua5t7u1e.apps.googleusercontent.com

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
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
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function App() {
  const { slideAnim, slideAnimBook } = useSlideAnimations();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const destinationLat = 48.8584;
  const destinationLon = 2.2945;

  const { openGoogleMapsRoute } = useOpenGoogleMaps();

  const nextPage = () => {
    router.push("/(tabs)/(02_barbers)");
  };
  const onAboutUs = () => {
    router.push("/(tabs)/(01_home)/whoWeAre");
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));

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
         <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
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
