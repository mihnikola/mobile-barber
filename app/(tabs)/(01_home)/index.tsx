import { useEffect, useState } from "react";
import {
  StyleSheet,
  Animated,
  View,
  Platform,
  useWindowDimensions,
  Image,
} from "react-native";
import { useOpenGoogleMaps } from "../../../components/location/hooks/useOpenGoogleMaps";
import { router } from "expo-router";
import { usePersistentSlideAnimations as useSlideAnimations } from "./../../../components/home/hooks/useSlideAnimations";
import HomeImage from "@/components/home/HomeImage";
import { useLocalization } from "@/context/LocalizationContext";
import useFetchLocations from "@/components/places/useFetchLocations";
import LocationsComponent from "@/components/home/LocationsComponent";

import useInternetGuard from "@/services/useInternetGuard";
import { useAuth } from "@/context/AuthContext";
import LocationNotFound from "@/components/home/LocationNotFound";
import { makeStyles } from "@/theme";
import { AppText, Icon, Pressable, withScreen } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";

function App() {
  const styles = useStyles();
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
    router.push({ pathname: routes.booking.tab });
  };

  const onAboutUs = () => {
    router.push(routes.home.whoWeAre);
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
        <Pressable
          onPress={nextPage}
          style={styles.btnLocationContent}
        >
          <Icon name="calendar" size={28} color="text" />

          <View style={styles.locationContent}>
            <AppText variant="legacyHeading" style={styles.titleLocation}>
              {localization.HOME.bookingBtn}
            </AppText>
            <AppText variant="legacyBody" size={15} color="textDeactivated">
              {localization.HOME.bookingBtnDesc}
            </AppText>
          </View>

          <Icon name="chevronRight" size={28} color="iconMuted" />
        </Pressable>
        <Pressable
          onPress={onAboutUs}
          style={styles.btnLocationContent}
        >
          <Icon name="home" size={28} color="text" />
          <View style={styles.locationContent}>
            <AppText variant="legacyHeading" style={styles.titleLocation}>
              {localization.HOME.aboutUsBtn}
            </AppText>
            <AppText variant="legacyBody" size={15} color="textDeactivated">
              {localization.HOME.aboutUsBtnDesc}
            </AppText>
          </View>
          <Icon name="chevronRight" size={28} color="iconMuted" />
        </Pressable>

        <Pressable
          onPress={openLocationHandler}
          style={styles.btnLocationContent}
        >
          <Icon name="locationArrow" size={28} color="text" />
          <View style={styles.locationContent}>
            <AppText variant="legacyHeading" style={styles.titleLocation}>
              {localization.HOME.locationBtn}
            </AppText>
            <AppText variant="legacyBody" size={15} color="textDeactivated">
              {localization.HOME.locationBtnDesc}
            </AppText>
          </View>
          <Icon name="chevronRight" size={28} color="iconMuted" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.surfaceItem,
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

  titleLocation: {
    textAlign: "center",

  },
  btnContent: {
    width: 300,
    backgroundColor: colors.surfaceHome,
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 15,
  },
}));

export default withScreen(App);
