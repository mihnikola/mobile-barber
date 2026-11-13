import { useEffect, useState } from "react";
import { Animated, ScrollView, View } from "react-native";
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
import { AppText, Icon, ListGroup, ListRow, Pressable, withScreen } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";

function App() {
  const styles = useStyles();
  const { getTokenData } = useAuth();
  const { slideAnim, slideAnimBook } = useSlideAnimations();
  const [modalVisible, setModalVisible] = useState(false);
  const { openGoogleMapsRoute } = useOpenGoogleMaps();
  const isConnected = useInternetGuard();

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
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Animated.View style={[styles.logo, { transform: [{ translateY: slideAnim }] }]}>
        <HomeImage />
      </Animated.View>

      <Animated.View style={{ transform: [{ translateY: slideAnimBook }] }}>
        {/* hero (ds-hero): the one main action of the screen */}
        <View style={styles.hero}>
          <AppText variant="displayMd" color="onPrimary" style={styles.heroTitle}>
            {localization.HOME.bookingBtn}
          </AppText>
          <AppText variant="bodySm" color="onPrimary" style={styles.heroText}>
            {localization.HOME.bookingBtnDesc}
          </AppText>
          <Pressable onPress={nextPage} style={styles.heroButton}>
            <Icon name="calendar" size="sm" color="primary" />
            <AppText variant="label" color="primary" style={styles.heroButtonText}>
              {localization.HOME.bookingBtn}
            </AppText>
          </Pressable>
        </View>

        <ListGroup style={styles.list}>
          <ListRow icon="home" label={localization.HOME.aboutUsBtn} value={localization.HOME.aboutUsBtnDesc} onPress={onAboutUs} />
          <ListRow icon="locationDot" label={localization.HOME.locationBtn} value={localization.HOME.locationBtnDesc} onPress={openLocationHandler} />
        </ListGroup>
      </Animated.View>
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) => ({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { flexGrow: 1, justifyContent: "center", paddingVertical: 24 },
  logo: { alignItems: "center", marginBottom: 16 },
  hero: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.primary,
    gap: 8,
  },
  heroTitle: { fontSize: 28, lineHeight: 30 },
  heroText: { opacity: 0.85 },
  heroButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 36,
    paddingHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: colors.onPrimary,
  },
  heroButtonText: { textTransform: "uppercase", letterSpacing: 0.84 },
  list: { marginTop: 16 },
}));

export default withScreen(App);
