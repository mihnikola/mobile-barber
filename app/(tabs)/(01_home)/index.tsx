import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useOpenGoogleMaps } from "../../../components/location/hooks/useOpenGoogleMaps";
import { router } from "expo-router";
import { useSlideAnimations } from "./../../../components/home/hooks/useSlideAnimations";
import HomeCoverImage from "@/components/home/HomeCoverImage";
import HomeImage from "@/components/home/HomeImage";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import useFetchLocations from "@/components/places/useFetchLocations";
import LocationsComponent from "@/components/home/LocationsComponent";

import useInternetGuard from "@/services/useInternetGuard";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";

function App() {
  const { slideAnim, slideAnimBook } = useSlideAnimations();
  const { company, isLoading, getCompany } = useCompany();
  const [modalVisible, setModalVisible] = useState(false);
  const { openGoogleMapsRoute } = useOpenGoogleMaps();
  const isConnected = useInternetGuard();

  const {
    locationsData,
    isLoading: isLoaderLocation,
    error,
    fetchLocations,
  } = useFetchLocations();

  useEffect(() => {
    if (isConnected) {
      getCompany();
      fetchLocations();
    }
  }, [isConnected]);

  const { localization } = useLocalization();

  const nextPage = () => {
    router.replace({
      pathname: "/(tabs)/(02_barbers)",
      params: { data: "1" },
    });
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


    if (locationsData?.length === 1) {
      openGoogleMapsRoute(locationsData[0]?.mapLink);
    } else {
      setModalVisible(true);
    }
  };

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
    alignItems: "center",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? 20 : 90,
  },
  boxBook: {
    marginTop: Platform.OS === "ios" ? 20 : 80,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
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

export default withSafeArea(App);
