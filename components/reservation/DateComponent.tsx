import type { ApiRecord } from "@/context/types";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
} from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { useReservation } from "@/context/ReservationContext";
import NotSummary from "@/components/booking/NotSummary"; // Adjust the path if needed
import Summary from "@/components/booking/Summary"; // Adjust the path
import useFetchTimes from "./hooks/useFetchTimes";
import useSelectedDate from "./hooks/useSelectedDate";
import { convertDayInitalValue } from "@/lib/date";
import { getCalendarTheme } from "@/theme/calendar";
import { calendarLocales } from "@/helpers/calendarLocales";

import { router, useFocusEffect, useIsFocused } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { coverImageAppointments } from "@/constants";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { makeStyles, useTheme } from "@/theme";
import { Button, EmptyState, layout, Loader } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";

const DateComponent = () => {
  const styles = useStyles();
  const { colors } = useTheme();

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
    } catch (error) {
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

  const today = new Date();
  const localDateString = today.toLocaleDateString("sv-SE"); // Format: YYYY-MM-DD

  const { localization } = useLocalization();
  const { company } = useCompany();

  const pathName = routes.booking.reservation;

  const { reservation, updateReservation } = useReservation()!;
  const [selectedItem, setSelectedItem] = useState(null);
  const { selectedDate, handleDayPress, isSunday, markedDates } =
    useSelectedDate(currentDate);
  const { timesData, isLoading, error, resetError } = useFetchTimes(
    selectedDate,
    reservation,
    isSunday,
  );
  const reportHandler = () => {
    const { employer, service } = reservation as ApiRecord; // set earlier in the booking flow
    if (employer && service && selectedItem && selectedDate) {
      updateReservation({
        ...reservation,
        dateReservation: selectedDate,
        timeData: selectedItem,
      });
      router.push(pathName);
    }
  };

  useEffect(() => {
    const dateValue = selectedDate.toLocaleString("en-GB");
    const valueInitialData = convertDayInitalValue(dateValue);
    handleDayPress(valueInitialData);
    calendarLocales(localization.code);
  }, [localization.code]);

  if (!LocaleConfig.locales[localization.code]) {
    return <Loader variant="overlay" />;
  }

  if (check) {
    return (
      <ScrollView style={styles.container}>
        <HeaderCoverImageContainer
          title={localization.DATE.title}
          image={coverImageAppointments}
        />

        <View style={styles.calendarContainer}>
          <CalendarList
            markingType="custom"
            key={localization.code}
            style={styles.calendar}
            theme={getCalendarTheme(colors)}
            onVisibleMonthsChange={(months) => {
              setSelectedItem(null);
              handleDayPress({});
            }}
            current={localDateString}
            minDate={localDateString}
            futureScrollRange={2}
            pastScrollRange={0}
            markedDates={markedDates}
            horizontal
            pagingEnabled
            onDayPress={(months) => {
              handleDayPress(months);
              setSelectedItem(null);
            }}
          />
        </View>

        <View>
          {!isSunday && (
            <>
              {isLoading && <Loader variant="inline" />}
              {resetError && <NotSummary text={localization.DATE.chooseDate} />}
              {!isLoading && !error && timesData.length > 0 && !resetError && (
                <Summary
                  data={timesData}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              )}
              {!isLoading && timesData.length === 0 && !resetError && (
                <NotSummary text={localization.DATE.noAvailableDates} />
              )}
            </>
          )}
          {isSunday && <EmptyState icon="calendar" title={localization.DATE.holidaySunday} />}
        </View>
        {selectedItem && (
          <View style={styles.buttonContainer}>
            {/* hidden while loading, as before (old button was display:none when disabled) */}
            {!isLoading && (
              <Button style={layout.buttonBlock} onPress={reportHandler} title={localization.DATE.continue} />
            )}
          </View>
        )}
      </ScrollView>
    );
  }
};

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
  calendarContainer: { marginTop: 8, marginHorizontal: 16, backgroundColor: colors.surface, borderRadius: 16, overflow: "hidden" },
  calendar: { backgroundColor: "transparent", width: "100%" },
  buttonContainer: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24 },
}))

export default DateComponent;
