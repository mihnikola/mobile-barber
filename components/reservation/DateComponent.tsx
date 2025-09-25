import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";
import { CalendarList } from "react-native-calendars";
import ReservationContext from "@/context/ReservationContext"; // Adjust the path if needed
import Loader from "@/components/Loader"; // Adjust the path if needed
import NotSummary from "@/shared-components/NotSummary"; // Adjust the path if needed
import Summary from "@/shared-components/Summary"; // Adjust the path
import useFetchTimes from "./hooks/useFetchTimes";
import useSelectedDate from "./hooks/useSelectedDate";
import { calendarTheme, convertDayInitalValue } from "@/helpers";
import { calendarLocales } from "@/helpers/calendarLocales";

import SharedButtonDateReservation from "@/shared-components/SharedButtonDateReservation";
import { router } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { useCompany } from "@/context/CompanyContext";

const DateComponent = () => {
  const currentDate = new Date();
  const { localization } = useLocalization();
  const { company } = useCompany();

  const { reservation, updateReservation } = useContext(ReservationContext)!;
  const [selectedItem, setSelectedItem] = useState(null);
  const { selectedDate, handleDayPress, isSunday, markedDates } =
    useSelectedDate(currentDate);
  const { timesData, isLoading, error, resetError } = useFetchTimes(
    selectedDate,
    reservation,
    isSunday
  );
  const reportHandler = () => {
    const { employer, service } = reservation;
    if (employer && service && selectedItem && selectedDate) {
      updateReservation({
        ...reservation,
        dateReservation: selectedDate,
        timeData: selectedItem,
      });
      router.push("/(tabs)/(02_barbers)/reservation");
    }
  };

  useEffect(() => {
    const dateValue = selectedDate.toLocaleString("en-GB");
    const valueInitialData = convertDayInitalValue(dateValue);
    handleDayPress(valueInitialData);
  }, []);

  useEffect(() => {
    calendarLocales(localization.code);
  }, [localization.code]);

  return (
    <ScrollView style={styles.container}>
      <SharedTabHeader
        image={company?.media?.coverImageAppointments}
        title={localization.DATE.title}
      />
      <View style={styles.calendarContainer}>
        <CalendarList
          key={localization.code}
          style={styles.calendar}
          theme={calendarTheme}
          onVisibleMonthsChange={(months) => {
            setSelectedItem(null);
            handleDayPress({});
          }}
          current={currentDate.toDateString()}
          futureScrollRange={2}
          markedDates={markedDates}
          onDayPress={(months) => {
            handleDayPress(months);

            setSelectedItem(null);
          }}
          showScrollIndicator
          pastScrollRange={0}
          horizontal
          pagingEnabled
          minDate={currentDate.toDateString()}
          hideExtraDays
        />
      </View>

      <View style={styles.timesAndDetails}>
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
};

const styles = StyleSheet.create({
  captureContainer: {
    position: "absolute",
    marginHorizontal: 15, // Side padding for the list
  },
  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    paddingVertical: 140,
  },
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
    width: "100%",
  },
  greyLine: {
    width: "100%",
    height: 4, // Adjust the height for the thickness of the line
    backgroundColor: "grey", // Set the line color to white
    marginTop: -1, // Optional: You can adjust this to fine-tune the position
  },
  calendar: {
    borderWidth: 1,
    backgroundColor: "transparent",
    display: "flex",
    color: "yellow",
    width: "100%",
  },
  timesAndDetails: {
    display: "flex",
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default DateComponent;
