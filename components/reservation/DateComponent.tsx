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

import SharedButtonDateReservation from "@/components/legacy/SharedButtonDateReservation";
import { router, useFocusEffect, useIsFocused } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { coverImageAppointments } from "@/constants";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { fonts, makeStyles, useTheme } from "@/theme";
import { AppText, Loader } from "@/components/ui";
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
          {isSunday && (
            <View style={styles.notWorkingDays}>
              <AppText size={20} style={styles.notWorkingDaysContent}>
                {localization.DATE.holidaySunday}
              </AppText>
            </View>
          )}
        </View>
        {selectedItem && (
          <View style={styles.buttonContainer}>
            <SharedButtonDateReservation
              loading={isLoading}
              disabled={isLoading}
              onPress={reportHandler}
              text={localization.DATE.continue}
            />
          </View>
        )}
      </ScrollView>
    );
  }
};

const useStyles = makeStyles((colors) => ({
  notWorkingDays: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  notWorkingDaysContent: {
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    fontFamily: fonts.regular,
  },
  calendarContainer: {
    marginTop: 10,
    backgroundColor: colors.background,
    fontFamily: fonts.regular,


  },

  calendar: {
    backgroundColor: "transparent",
    color: colors.yellow,
    width: "100%",
    fontFamily: fonts.regular,
  },

  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
}));

export default DateComponent;
