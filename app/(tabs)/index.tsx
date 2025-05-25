import OnboardingComponent from "@/components/OnboardingComponent";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import ListAboutUs from "../components/home/ListAboutUs";
import AboutUsInfo from "../components/home/AboutUsInfo";
import { MAIN_DATA } from "@/constants";
import FlatButton from "@/shared-components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createOpenLink } from "react-native-open-maps";
import { saveExpoTokenStorage } from "@/helpers";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
const yosemite = { latitude: 43.724943, longitude: 20.6952 };

function handleRegistrationError(errorMessage) {
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
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  const nextPage = () => {
    navigation.navigate("(tabs)", { screen: "employers" });
  };

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

  const openYosemite = createOpenLink(yosemite);

  const openYosemiteZoomedOut = createOpenLink({ ...openYosemite, zoom: 300 });
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/logoImage.png")}
        style={styles.reactLogo}
      />

      <View style={styles.contentBtn}>
        <FlatButton text="Book" onPress={nextPage} />
      </View>

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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonga: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "white",
    color: "black",
  },
  mapImage: {
    width: 400,
    height: 200,
  },
  mapContainer: {
    flex: 3,
  },
  map: {
    width: 500,
    height: 200,
    marginBottom: 20,
    marginTop: 10,
  },
  reactLogo: {
    height: 300,
    width: 320,
    margin: "auto",
    marginTop: 40,
  },
  reviewContent: {
    margin: 0,
  },
  mapCapture: {
    color: "#ffffff",
    fontSize: 40,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "#ffff",
    margin: 5,
  },
  reviewCapture: {
    color: "#ffffff",
    fontSize: 40,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  aboutUs: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    color: "#ffff",
  },
  itemText: {
    backgroundColor: "#f9c2ff",
    color: "#ffff",
  },
  content: {
    flexGrow: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: "black",
  },
  contentBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
  },
});
