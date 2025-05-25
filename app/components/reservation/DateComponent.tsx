import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CalendarList } from "react-native-calendars";
import ReservationContext from "@/context/ReservationContext"; // Adjust the path if needed
import FlatButton from "@/shared-components/Button"; // Adjust the path if needed
import Loader from "@/components/Loader"; // Adjust the path if needed
import NotSummary from "@/shared-components/NotSummary"; // Adjust the path if needed
import Summary from "@/shared-components/Summary"; // Adjust the path
import Details from "@/shared-components/Details"; // Adjust the path
import useFetchTimes from "./hooks/useFetchTimes";
import useSelectedDate from "./hooks/useSelectedDate";
import { calendarTheme } from "@/helpers";
import { useNavigation } from "@react-navigation/native";

const DateComponent = () => {
  const currentDate = new Date();
  const formattedDate = currentDate?.toISOString()?.split("T")[0];
  const { reservation, updateReservation } = useContext(ReservationContext)!;
  const [selectedItem, setSelectedItem] = useState(null);

  const navigation = useNavigation();
  const { selectedDate, handleDayPress, isSundayData } = useSelectedDate(formattedDate);
  const { timesData, isLoading, error } = useFetchTimes(
    selectedDate,
    reservation
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
    const dateObject = {
      dateString: selectedDate,
    };
    handleDayPress(dateObject);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.calendarContainer}>
        <CalendarList
          style={styles.calendar}
          theme={calendarTheme}
          onVisibleMonthsChange={(months) => {}}
          current={formattedDate}
          futureScrollRange={2}
          markedDates={{
            [selectedDate?.dateString || formattedDate]: {
              selected: true,
            },
          }}
          onDayPress={handleDayPress}
          showScrollIndicator
          pastScrollRange={0}
          horizontal
          pagingEnabled
          minDate={formattedDate}
          hideExtraDays
        />
      </View>

      <View style={styles.timesAndDetails}>
        {!isSundayData && isLoading && <Loader />}
        {!isLoading && !error && timesData.length > 0 && (
          <Summary
            data={timesData}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
        )}
        {isSundayData && timesData.length === 0 && <NotSummary />}

        {reservation && <Details data={reservation} />}
      </View>
      <View style={styles.buttonContainer}>
        <FlatButton text="Continue" onPress={reportHandler} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
