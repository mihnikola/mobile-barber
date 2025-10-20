import * as Notifications from "expo-notifications";
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
import { usePushNotifications } from "./../../../components/home/hooks/usePushNotifications";
import HomeCoverImage from "@/components/home/HomeCoverImage";
import HomeImage from "@/components/home/HomeImage";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import { SharedLoader } from "@/shared-components/SharedLoader";
import useFetchLocations from "@/components/places/useFetchLocations";
import LocationsComponent from "@/components/home/LocationsComponent";

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
  const { company, isLoading } = useCompany();
  const [modalVisible, setModalVisible] = useState(false);

  const { openGoogleMapsRoute } = useOpenGoogleMaps();
  const {
    locationsData,
    isLoading: isLoaderLocation,
    error,
    fetchLocations,
  } = useFetchLocations();

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

  useEffect(() => {
    setTimeout(async () => {
      console.log("xxxxxxxxxx");
      await registerForPushNotifications();
    }, 1500);
  }, []);

  const openLocationHandler = async () => {
    await fetchLocations();

    console.log("openLocationHandler", locationsData);

    if (locationsData?.length === 1) {
      openGoogleMapsRoute(locationsData[0]?.mapLink);
    } else {
      setModalVisible(true);
    }
  };
  console.log("isLoading || isLoaderLocation", isLoading, isLoaderLocation);
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
    marginBottom: 0
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
