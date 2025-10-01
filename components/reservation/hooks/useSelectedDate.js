import { useState } from "react";

const useSelectedDate = (initialDate) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isSunday, setIsSunday] = useState(false);
  const [markedDates, setMarkedDates] = useState();
  const handleDayPress = (day) => {
    console.log("daydaydaydayday",day)
    if (!day) {
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
  };

  const getMarkedDatesForSundays = (selectedDateString) => {
    const markedDates = {};
    if (selectedDateString) {
      markedDates[selectedDateString] = {
        selected: true,
        selectedColor: "white",
      };
    }
    console.log("markedDates",selectedDateString)

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 4; i++) {
      const currentMonthDate = new Date(
        today.getFullYear(),
        today.getMonth() + i,
        1
      );

      const year = currentMonthDate.getFullYear();
      const month = currentMonthDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let dayNum = 0; dayNum <= daysInMonth; dayNum++) {
        const date = new Date(year, month, dayNum);
        if (date.getDay() === 0) {
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
          const existingProps = markedDates[formattedDate] || {};
          markedDates[formattedDate] = {
            ...existingProps,
            disabled: true,
          };
        }
      }
    }

    setMarkedDates(markedDates);
  };

  return {
    selectedDate,
    handleDayPress,
    isSunday,
    markedDates,
  };
};

export default useSelectedDate;
