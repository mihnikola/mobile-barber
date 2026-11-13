import { useEffect, useState } from "react";
import { Linking, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { useOpenGoogleMaps } from "@/components/location/hooks/useOpenGoogleMaps";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import useFetchLocations from "@/components/places/useFetchLocations";
import LocationsComponent from "@/components/home/LocationsComponent";
import LocationNotFound from "@/components/home/LocationNotFound";
import SectionLabel from "@/components/home/SectionLabel";
import { useNextAppointment } from "@/components/home/useNextAppointment";
import CardReservationItem from "@/components/reservation/CardReservationItem";
import CardReservationPending from "@/components/reservation/CardReservationPending";
import useInternetGuard from "@/services/useInternetGuard";
import { useAuth } from "@/context/AuthContext";
import type { ApiRecord } from "@/context/types";
import { fonts, makeStyles } from "@/theme";
import { AppText, Avatar, Icon, ListGroup, ListRow, Pressable, withScreen } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";

/**
 * Home (design Ekran01c "Početna · jednostavna"): brand row + avatar, greeting, one booking hero,
 * next appointment (only when there is one), About us / Location / Contact list.
 * Same actions as before; "next appointment" and "contact" only reuse existing data/endpoints.
 */
function App() {
  const styles = useStyles();
  const { getTokenData, isToken, userData } = useAuth();
  const { company } = useCompany();
  const [modalVisible, setModalVisible] = useState(false);
  const { openGoogleMapsRoute } = useOpenGoogleMaps();
  const isConnected = useInternetGuard();
  const { localization } = useLocalization();
  const nextAppointment = useNextAppointment(Boolean(isToken));

  const { locationsData, fetchLocations } = useFetchLocations();

  useEffect(() => {
    if (!isConnected) return;
    getTokenData();
    fetchLocations();
  }, [isConnected]);

  const nextPage = () => {
    router.push({ pathname: routes.booking.tab });
  };

  const onAboutUs = () => {
    router.push(routes.home.whoWeAre);
  };

  const handleLocationSelect = (locationData: ApiRecord) => {
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

  const callSalon = () => {
    const phone = String(company?.contact ?? "").replace(/[^\d+]/g, "");
    if (phone) Linking.openURL(`tel:${phone}`);
  };

  const openAppointment = (item: ApiRecord) => {
    router.push({
      pathname: routes.appointments.details,
      params: { itemId: item._id, past: item?.past, rating: item?.rating, status: item.status },
    });
  };

  const firstName = String(userData?.name ?? "").trim().split(/\s+/)[0];
  // time-of-day greeting in place of the brand name: 05–12 jutro, 12–18 dan, otherwise veče
  const hour = new Date().getHours();
  const timeGreeting =
    hour >= 5 && hour < 12
      ? localization.HOME.goodMorning
      : hour >= 12 && hour < 18
        ? localization.HOME.goodDay
        : localization.HOME.goodEvening;
  // one salon → show its address (design shows the place); several → the generic hint
  const locations = (locationsData ?? []) as ApiRecord[];
  const locationValue =
    locations.length === 1 && locations[0]?.address ? locations[0].address : localization.HOME.locationBtnDesc;
  const NextCard = Number(nextAppointment?.status) === 2 ? CardReservationPending : CardReservationItem;

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
      {/* ds-home-top: time-of-day greeting, avatar → profile */}
      <View style={styles.top}>
        <View style={styles.brandRow}>
          <AppText style={styles.wordmark} numberOfLines={1} adjustsFontSizeToFit>
            {timeGreeting}
          </AppText>
        </View>
        <Pressable hitSlop={8} onPress={() => router.navigate(routes.settings.root)}>
          {userData?.image ? (
            <Avatar uri={userData.image} size="sm" />
          ) : userData?.name ? (
            <Avatar name={userData.name} size="sm" />
          ) : (
            <View style={styles.avatarEmpty}>
              <Icon name="person" size="sm" color="ink" />
            </View>
          )}
        </Pressable>
      </View>

      {/* greeting */}
      <View style={styles.greeting}>
        <AppText variant="bodySm" color="inkMuted">
          {firstName ? `${localization.HOME.greeting}, ${firstName}` : localization.HOME.greeting}
        </AppText>
        <AppText variant="displayLg" style={styles.headline}>
          {localization.HOME.headline}
        </AppText>
      </View>

      {/* ds-hero: the one main action of the screen */}
      <View style={styles.hero}>
        <AppText style={styles.heroTitle}>{localization.HOME.heroTitle}</AppText>
        <AppText variant="bodySm" color="onPrimary" style={styles.heroText}>
          {localization.HOME.heroDesc}
        </AppText>
        <Pressable onPress={nextPage} style={styles.heroButton}>
          <Icon name="calendar" size="sm" color="primary" />
          <AppText style={styles.heroButtonText}>{localization.HOME.bookingBtn}</AppText>
        </Pressable>
      </View>

      {/* next appointment — only when there is one */}
      {nextAppointment ? (
        <>
          <View style={styles.section}>
            <SectionLabel>{localization.HOME.nextAppointment}</SectionLabel>
            <Pressable hitSlop={8} onPress={() => router.navigate(routes.appointments.root)} style={styles.sectionLink}>
              <AppText style={styles.sectionLinkText}>{localization.HOME.allAppointments}</AppText>
            </Pressable>
          </View>
          <NextCard item={nextAppointment} redirectScreen={openAppointment} />
        </>
      ) : null}

      <ListGroup style={styles.list}>
        <ListRow icon="info" label={localization.HOME.aboutUsBtn} value={localization.HOME.aboutUsBtnDesc} onPress={onAboutUs} />
        <ListRow icon="locationDot" label={localization.HOME.locationBtn} value={locationValue} onPress={openLocationHandler} />
        {company?.contact ? (
          <ListRow icon="phone" label={localization.HOME.contactBtn} value={localization.HOME.contactBtnDesc} onPress={callSalon} />
        ) : null}
      </ListGroup>
    </ScrollView>
  );
}

const useStyles = makeStyles((colors) => ({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingTop: 8, paddingBottom: 24 },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1, marginRight: 12 },
  wordmark: {
    fontFamily: fonts.displaySemiBold,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.ink,
  },
  avatarEmpty: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceSunken,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: { paddingHorizontal: 16, marginTop: 20, gap: 2 },
  headline: { fontSize: 28, lineHeight: 30 },
  hero: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.primary,
    gap: 8,
  },
  heroTitle: {
    fontFamily: fonts.displaySemiBold,
    fontSize: 28,
    lineHeight: 30,
    textTransform: "uppercase",
    color: colors.onPrimary,
  },
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
  heroButtonText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 0.84,
    color: colors.primary,
  },
  // ds-sec: label left, underlined link right
  section: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", paddingRight: 16 },
  sectionLink: { marginTop: 20, marginBottom: 4 },
  sectionLinkText: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    color: colors.ink,
    textDecorationLine: "underline",
  },
  list: { marginTop: 16 },
}));

export default withScreen(App);
