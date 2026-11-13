import type { ApiRecord } from "@/context/types";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useReservation } from "@/context/ReservationContext";
import useFetchTimes from "./hooks/useFetchTimes";
import useSelectedDate from "./hooks/useSelectedDate";
import { addMinutesToTime, convertDayInitalValue, formatTimeRange } from "@/lib/date";
import { formatPrice } from "@/lib/format";

import { router, useFocusEffect, useIsFocused } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { makeStyles } from "@/theme";
import { Card, EmptyState, Loader } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";
import WeekStrip from "./date/WeekStrip";
import TimeSlots from "./date/TimeSlots";
import SummaryBar from "./date/SummaryBar";
import { fromDateString, shortDateLabel } from "./date/dateUtils";

/**
 * Booking step 3 — date and time on one screen (design Ekran05 / Ekran06):
 * week strip, morning/afternoon slot grid, bottom summary bar with a round "continue" arrow.
 * Same data and flow as before (useSelectedDate / useFetchTimes, Sundays closed, → review).
 */
const DateComponent = () => {
  const styles = useStyles();

  const [check, setCheck] = useState(false);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setCheck(true);
      } else {
        router.push({
          pathname: routes.auth.login,
          params: { data: "calendar" },
        });
      }
    } catch {
      router.push(routes.auth.login);
    }
  };

  const isF = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [isF]),
  );

  const currentDate = new Date();
  const { localization } = useLocalization();

  const { reservation, updateReservation } = useReservation()!;
  const [selectedItem, setSelectedItem] = useState<ApiRecord | null>(null);
  const { selectedDate, handleDayPress, isSunday } = useSelectedDate(currentDate);
  const { timesData, isLoading, error, resetError } = useFetchTimes(selectedDate, reservation, isSunday);

  const reportHandler = () => {
    const { employer, service } = reservation as ApiRecord; // set earlier in the booking flow
    if (employer && service && selectedItem && selectedDate) {
      updateReservation({
        ...reservation,
        dateReservation: selectedDate,
        timeData: selectedItem,
      });
      router.push(routes.booking.reservation);
    }
  };

  useEffect(() => {
    const dateValue = selectedDate.toLocaleString("en-GB");
    const valueInitialData = convertDayInitalValue(dateValue);
    handleDayPress(valueInitialData);
  }, [localization.code]);

  const onSelectDay = (dateString: string) => {
    handleDayPress(dateString);
    setSelectedItem(null);
  };

  // summary bar: date · time range, total price of the service + extra services
  const res = (reservation ?? {}) as ApiRecord;
  const others: ApiRecord[] = res.otherServices ?? [];
  const totalPrice = (Number(res.service?.servicePrice) || 0) + others.reduce((s, o) => s + (Number(o.price) || 0), 0);
  const extraDuration = others.reduce((s, o) => s + (Number(o.duration) || 0), 0);
  const selectedDateString = typeof selectedDate === "string" ? selectedDate : undefined;
  const dayLabel = selectedDateString ? shortDateLabel(fromDateString(selectedDateString), localization.code) : "";
  const timeRange = selectedItem
    ? formatTimeRange(
        selectedItem.value,
        addMinutesToTime(selectedItem.value, Number(res.service?.serviceDuration) || 0, extraDuration),
      )
    : "";

  const hasTimes = !isLoading && !error && !resetError && timesData.length > 0;
  const dayIsFull = !isSunday && !isLoading && !resetError && (error || timesData.length === 0);
  const canContinue = Boolean(selectedItem) && !isLoading;

  if (!check) return null;

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <HeaderCoverImageContainer title={localization.DATE.title} step={3} />

        <View style={styles.strip}>
          <WeekStrip selected={selectedDateString} onSelect={onSelectDay} />
        </View>

        {isSunday && <EmptyState icon="calendar" title={localization.DATE.holidaySunday} />}
        {!isSunday && isLoading && <Loader variant="inline" />}
        {!isSunday && resetError && <EmptyState icon="calendar" title={localization.DATE.chooseDate} />}
        {hasTimes && !isSunday && (
          <TimeSlots data={timesData} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        )}
        {dayIsFull && (
          <Card>
            <EmptyState
              icon="calendar"
              title={localization.DATE.fullTitle}
              description={error ? String(error) : localization.DATE.noAvailableDates}
            />
          </Card>
        )}
      </ScrollView>

      <SummaryBar
        hint={
          selectedItem
            ? undefined
            : isSunday || dayIsFull
              ? localization.DATE.pickOtherDay
              : localization.DATE.pickTime
        }
        meta={selectedItem ? [dayLabel, timeRange].filter(Boolean).join(" · ") : undefined}
        total={selectedItem && totalPrice > 0 ? formatPrice(totalPrice, localization.code) : undefined}
        disabled={!canContinue}
        onContinue={reportHandler}
        continueLabel={localization.DATE.continue}
      />
    </View>
  );
};

const useStyles = makeStyles((colors) => ({
  screen: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  content: { paddingBottom: 16 },
  strip: { paddingHorizontal: 16, marginTop: 4, marginBottom: 16 },
}));

export default DateComponent;
