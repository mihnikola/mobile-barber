import { useState, useCallback } from "react";

const useSelectedDate = (initialDate) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isSunday, setIsSunday] = useState(false);
  const [markedDates, setMarkedDates] = useState();
  const handleDayPress = useCallback((day) => {
    if(!day){
      return null;
    }
    const { dateString } = day;

    setSelectedDate(dateString || day);
    getMarkedDatesForSundays(dateString || day);

    const isSun = new Date(dateString || day).getDay() === 0;
    if (isSun) {
      setIsSunday(true);
    } else {
      setIsSunday(false);
    }
  }, []);

  const getMarkedDatesForSundays = useCallback((selectedDateString) => {
    const markedDates = {};

    // Add the provided selectedDate to the markedDates object if it exists
    if (selectedDateString) {
      markedDates[selectedDateString] = {
        selected: true,
        selectedColor: "#2596be",
      }; // You can customize selectedColor
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the current day for consistent date calculations

    // Loop for the current month (i=0) and the next three months (i=1, 2, 3)
    for (let i = 0; i < 4; i++) {
      // Get the first day of the month we are currently processing
      // `new Date(year, month, 1)` correctly handles month and year rollovers
      const currentMonthDate = new Date(
        today.getFullYear(),
        today.getMonth() + i,
        1
      );

      const year = currentMonthDate.getFullYear();
      const month = currentMonthDate.getMonth(); // 0-indexed month (0 for January, 11 for December)

      // Get the number of days in the current month
      // `new Date(year, month + 1, 0)` gives the last day of the current month
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Iterate through each day of the current month
      for (let dayNum = 0; dayNum <= daysInMonth; dayNum++) {
        const date = new Date(year, month, dayNum);

        // Check if the current day is a Sunday (getDay() returns 0 for Sunday)
        if (date.getDay() === 0) {
          // Sunday is 0, Monday is 1, ..., Saturday is 6
          // Format the date as YYYY-MM-DD
          const formattedYear = date
            .toLocaleString()
            .split(",")[0]
            .split("/")[2];
          const formattedDay = date
            .toLocaleString()
            .split(",")[0]
            .split("/")[1]
            .padStart(2, "0");
          const formattedMonth = date
            .toLocaleString()
            .split(",")[0]
            .split("/")[0]
            .padStart(2, "0");

          const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;

          // Get any existing properties for this date (e.g., if it was already marked as selected)
          const existingProps = markedDates[formattedDate] || {};

          // Now, combine existing properties with the 'disabled' properties for Sundays
          // This ensures 'selected' is preserved if the selected day is also a Sunday.
          markedDates[formattedDate] = {
            ...existingProps, // Keep selected: true if it was previously set
            disabled: true,
          };
        }
      }
    }

    setMarkedDates(markedDates);
  }, []);

  return {
    selectedDate,
    handleDayPress,
    isSunday,
    markedDates,
  };
};

export default useSelectedDate;
