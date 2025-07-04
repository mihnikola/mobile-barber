import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, ScrollView, Text, BackHandler } from "react-native";
import { CalendarList } from "react-native-calendars";
import ReservationContext from "@/context/ReservationContext"; // Adjust the path if needed
import FlatButton from "@/shared-components/Button"; // Adjust the path if needed
import Loader from "@/components/Loader"; // Adjust the path if needed
import NotSummary from "@/shared-components/NotSummary"; // Adjust the path if needed
import Summary from "@/shared-components/Summary"; // Adjust the path
import Details from "@/shared-components/Details"; // Adjust the path
import useFetchTimes from "./hooks/useFetchTimes";
import useSelectedDate from "./hooks/useSelectedDate";
import { calendarTheme, convertDayInitalValue } from "@/helpers";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const DateComponent = () => {
  const currentDate = new Date();

  const { reservation, updateReservation } = useContext(ReservationContext)!;
  const [selectedItem, setSelectedItem] = useState(null);

  const navigation = useNavigation();
  const { selectedDate, handleDayPress, isSunday, markedDates } =
    useSelectedDate(currentDate);
  const { timesData, isLoading, error } = useFetchTimes(
    selectedDate,
    reservation,
    isSunday
  );
useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          // Return true to disable the default back button behavior
         navigation.navigate('components/services/index');
         return true;
         
        };
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
  
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }, [])
    );
  const reportHandler = () => {
    const { employer, service } = reservation;
    if (employer && service && selectedItem && selectedDate) {
      updateReservation({
        ...reservation,
        dateReservation: selectedDate,
        timeData: selectedItem,
      });
      navigation.navigate("components/reservation/index");
    }
  };

  useEffect(() => {
    const dateValue = selectedDate.toLocaleString("en-GB");
    const valueInitialData = convertDayInitalValue(dateValue);
    handleDayPress(valueInitialData);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.calendarContainer}>
        <CalendarList
          style={styles.calendar}
          theme={calendarTheme}
          onVisibleMonthsChange={(months) => {}}
          current={currentDate.toDateString()}
          futureScrollRange={2}
          markedDates={markedDates}
          onDayPress={handleDayPress}
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
            {!isLoading && !error && timesData.length > 0 && (
              <Summary
                data={timesData}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
              />
            )}
            {!isLoading && timesData.length === 0 && <NotSummary />}
          </>
        )}
        {isSunday && (
          <View style={styles.notWorkingDays}>
            <Text style={styles.notWorkingDaysContent}>
              We don't work on Sundays
            </Text>
          </View>
        )}

        {reservation && <Details data={reservation} />}
      </View>
      {selectedItem && (
        <View style={styles.buttonContainer}>
          <FlatButton text="Continue" onPress={reportHandler} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
  calendarContainer: {
    marginTop: 50,
    width: "100%",
  },
  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "transparent",
    display: "flex",
    width: "100%",
  },
  timesAndDetails: {
    display: "flex",
  },
  buttonContainer: {
    marginTop: 5,
  },
});

export default DateComponent;
