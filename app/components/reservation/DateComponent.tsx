import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Image, BackHandler } from "react-native";
import { CalendarList } from "react-native-calendars";
import ReservationContext from "@/context/ReservationContext"; // Adjust the path if needed
import FlatButton from "@/shared-components/Button"; // Adjust the path if needed
import Loader from "@/components/Loader"; // Adjust the path if needed
import NotSummary from "@/shared-components/NotSummary"; // Adjust the path if needed
import Summary from "@/shared-components/Summary"; // Adjust the path
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
      navigation.navigate("components/reservation/index");
    }
  };

  useEffect(() => {
    const dateValue = selectedDate.toLocaleString("en-GB");
    const valueInitialData = convertDayInitalValue(dateValue);
    handleDayPress(valueInitialData);
  }, []);

   useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          // Return true to disable the default back button behavior
          console.log("object");
          navigation.navigate("components/services/index");
          return true;
        };
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
  
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }, [])
    );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/team.jpg")}
        style={styles.coverImage}
      />
      <Text style={styles.capture}>Choose your date</Text>
      <View style={styles.calendarContainer}>
        <CalendarList
          style={styles.calendar}
          theme={calendarTheme}
          onVisibleMonthsChange={(months) => {
            setSelectedItem(null);
            handleDayPress({});
          }}
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
            {resetError && <NotSummary text="Please select your day" />}
            {!isLoading && !error && timesData.length > 0 && !resetError && (
              <Summary
                data={timesData}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
              />
            )}
            {!isLoading && timesData.length === 0 && !resetError && (
              <NotSummary text="No appointments for the chosen date" />
            )}
          </>
        )}
        {isSunday && (
          <View style={styles.notWorkingDays}>
            <Text style={styles.notWorkingDaysContent}>
              We don't work on Sundays
            </Text>
          </View>
        )}
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
  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    margin: 5,
    fontStyle: "italic",
    position: "absolute",
    top: 150,
    left: 70,
  },
  coverImage: {
    width: "100%",
    height: 200,
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
    marginTop: 5,
  },
});

export default DateComponent;
