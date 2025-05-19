import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
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

// Set up locale for Serbian language
// LocaleConfig.locales["srb"] = {
//   monthNames: [
//     "Januar",
//     "Februar",
//     "Mart",
//     "April",
//     "Maj",
//     "Jun",
//     "Jul",
//     "Avgust",
//     "Septembar",
//     "Oktobar",
//     "Novembar",
//     "Decembar",
//   ],
//   dayNames: [
//     "Nedelja",
//     "Ponedeljak",
//     "Utorak",
//     "Sreda",
//     "Četvrtak",
//     "Petak",
//     "Subota",
//   ],
//   dayNamesShort: ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
// };
// LocaleConfig.defaultLocale = "srb";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
LocaleConfig.defaultLocale = "en";

const DateComponent = () => {
  
  const currentDate = new Date();
  const formattedDate = currentDate?.toISOString()?.split("T")[0];
  const { reservation, updateReservation } = useContext(ReservationContext)!;
  const [selectedItem, setSelectedItem] = useState(null);

  const navigation = useNavigation();
  const { selectedDate, handleDayPress } = useSelectedDate(formattedDate);
  const { timesData, isLoading, error } = useFetchTimes(
    selectedDate,
    reservation
  );

  const reportHandler = () => {
    const { employer, service } = reservation;
    if (employer && service && selectedItem && selectedDate) {
      updateReservation({...reservation, dateReservation: selectedDate, timeData: selectedItem  })
      navigation.navigate("components/reservation/index");
    }
  };


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
            [selectedDate?.dateString || ""]: {
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
        {isLoading && <Loader />}
        {!isLoading && !error && timesData.length > 0 && (
          <Summary
            data={timesData}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
        )}
        {timesData.length === 0 && <NotSummary />}

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
