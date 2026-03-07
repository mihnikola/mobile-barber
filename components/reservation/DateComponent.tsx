import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  BackHandler,
} from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import ReservationContext from "@/context/ReservationContext"; // Adjust the path if needed
import Loader from "@/components/Loader"; // Adjust the path if needed
import NotSummary from "@/shared-components/NotSummary"; // Adjust the path if needed
import Summary from "@/shared-components/Summary"; // Adjust the path
import useFetchTimes from "./hooks/useFetchTimes";
import useSelectedDate from "./hooks/useSelectedDate";
import { calendarTheme, convertDayInitalValue } from "@/helpers";
import { calendarLocales } from "@/helpers/calendarLocales";

import SharedButtonDateReservation from "@/shared-components/SharedButtonDateReservation";
import { router, useFocusEffect } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import { SharedLoader } from "@/shared-components/SharedLoader";
import SharedBackButton from "@/shared-components/SharedBackButton";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedTitle from "@/shared-components/SharedTitle";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DateComponent = ({reevaluted}) => {
  const [check, setCheck] = useState(false);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setCheck(true);
      } else {
        router.push({
          pathname: "/(z_auth)/",
          params: { data: "calendar" },
        });
      }
    } catch (error) {
      router.push("/(z_auth)/");
    }
  };

  const isF = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [isF, reevaluted]),
  );

  const currentDate = new Date();

  const today = new Date();
  const localDateString = today.toLocaleDateString("sv-SE"); // Format: YYYY-MM-DD

  const { localization } = useLocalization();
  const { company } = useCompany();

  const pathName = "/(tabs)/(02_barbers)/reservation";

  const { reservation, updateReservation } = useContext(ReservationContext)!;
  const [selectedItem, setSelectedItem] = useState(null);
  const { selectedDate, handleDayPress, isSunday, markedDates } =
    useSelectedDate(currentDate);
  const { timesData, isLoading, error, resetError } = useFetchTimes(
    selectedDate,
    reservation,
    isSunday,
  );
  const reportHandler = () => {
    const { employer, service } = reservation;
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
    return <SharedLoader />;
  }

  const routerBackHandler = () => {
    router.back();
  };
  if (check) {
    return (
      <ScrollView style={styles.container}>
        <SharedBackButton onPress={routerBackHandler} />

        <SharedCoverImage image={company?.media?.coverImageAppointments} />
        <SharedTitle title={localization.DATE.title} />

        <View style={styles.calendarContainer}>
          <CalendarList
            markingType="custom"
            key={localization.code}
            style={styles.calendar}
            theme={calendarTheme}
            onVisibleMonthsChange={(months) => {
              setSelectedItem(null);
              handleDayPress({});
            }}
            current={localDateString}
            minDate={localDateString}
            futureScrollRange={5}
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
              {isLoading && <Loader />}
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
              <Text style={styles.notWorkingDaysContent}>
                {localization.DATE.holidaySunday}
              </Text>
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

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 150,
    opacity: 0.2,
  },
  notWorkingDays: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  notWorkingDaysContent: {
    fontSize: 20,
    color: "white",
    padding: 20,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
  },
  calendarContainer: {
    marginTop: 10,
  },

  calendar: {
    borderWidth: 1,
    backgroundColor: "transparent",
    color: "yellow",
    width: "100%",
  },

  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default DateComponent;
