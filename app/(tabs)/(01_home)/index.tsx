import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  View,
  Platform,
  useWindowDimensions,
  Image,
} from "react-native";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { FontAwesome } from "@expo/vector-icons";
import { useOpenGoogleMaps } from "../../../components/location/hooks/useOpenGoogleMaps";
import { router } from "expo-router";
import { usePersistentSlideAnimations as useSlideAnimations } from "./../../../components/home/hooks/useSlideAnimations";
import HomeImage from "@/components/home/HomeImage";
import { useLocalization } from "@/context/LocalizationContext";
import useFetchLocations from "@/components/places/useFetchLocations";
import LocationsComponent from "@/components/home/LocationsComponent";

import useInternetGuard from "@/services/useInternetGuard";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";
import { useAuth } from "@/context/AuthContext";
import LocationNotFound from "@/components/home/LocationNotFound";
import { ColorsBarber } from "@/constants/Colors";
import { colors, fonts } from "@/theme";

function App() {
  const { getTokenData } = useAuth();
  const { slideAnim, slideAnimBook } = useSlideAnimations();
  const [modalVisible, setModalVisible] = useState(false);
  const { openGoogleMapsRoute } = useOpenGoogleMaps();
  const isConnected = useInternetGuard();
  const { height, width } = useWindowDimensions();

  // 🔒 Guards to prevent re-fetch on reset remount
  // const hasFetchedCompany = useRef(false);
  // const hasFetchedLocations = useRef(false);
  const {
    locationsData,
    isLoading: isLoaderLocation,
    error,
    fetchLocations,
  } = useFetchLocations();

  useEffect(() => {
    if (!isConnected) return;
    getTokenData();
    fetchLocations();
  }, [isConnected]);


  const { localization } = useLocalization();
  const nextPage = () => {
    router.push({ pathname: "(02_barbers)" });
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
  if (modalVisible && locationsData?.length === 0) {
    return (
      <LocationNotFound
        modalVisible={modalVisible}
        title={localization.PLACES.noFound}
        buttonText={localization.PLACES.close}
        setModalVisible={setModalVisible}
      />
    );
  }

  return (
    <View style={styles.container}>
    
      <Image
        source={require("../../../assets/images/homeImage.png")}
        style={[StyleSheet.absoluteFill, styles.bgImage]}
        resizeMode="cover"
      />
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <HomeImage />
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
          <FontAwesome name="calendar" size={28} color={ColorsBarber.dark.textColor} />

          <View style={styles.locationContent}>
            <Text style={styles.titleLocation}>
              {localization.HOME.bookingBtn}
            </Text>
            <Text style={styles.address}>
              {localization.HOME.bookingBtnDesc}
            </Text>
          </View>

          <FontAwesome name="chevron-right" size={28} color={ColorsBarber.dark.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAboutUs}
          style={styles.btnLocationContent}
        >
          <FontAwesome name="home" size={28} color={ColorsBarber.dark.textColor} />
          <View style={styles.locationContent}>
            <Text style={styles.titleLocation}>
              {localization.HOME.aboutUsBtn}
            </Text>
            <Text style={styles.address}>
              {localization.HOME.aboutUsBtnDesc}
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={28} color={ColorsBarber.dark.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openLocationHandler}
          style={styles.btnLocationContent}
        >
          <FontAwesome name="location-arrow" size={28} color={ColorsBarber.dark.textColor} />
          <View style={styles.locationContent}>
            <Text style={styles.titleLocation}>
              {localization.HOME.locationBtn}
            </Text>
            <Text style={styles.address}>
              {localization.HOME.locationBtnDesc}
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={28} color={ColorsBarber.dark.arrowIcon} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? 20 : 90,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  backImage: {
    opacity: 1,
  },
  boxBook: {
    marginTop: Platform.OS === "ios" ? 20 : 80,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  locationContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btnLocationContent: {
    width: "90%",
    backgroundColor: ColorsBarber.dark.btnContent,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },

  address: {
    fontSize: 15,
    color: ColorsBarber.dark.textColorDeactivated,
    fontFamily: fonts.regular
  },
  titleLocation: {
    fontSize: 22,
    color: ColorsBarber.dark.textColor,
    textAlign: "center",
    fontFamily: fonts.bold

  },
  btnContent: {
    width: 300,
    backgroundColor: colors.surfaceHome,
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 15,
  },
});

export default withSafeArea(App);
