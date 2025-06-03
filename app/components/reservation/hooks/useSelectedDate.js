import { useState, useCallback } from "react";

const useSelectedDate = (initialDate) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isSunday, setIsSunday] = useState(false);
  const handleDayPress = useCallback((day) => {
    const { dateString } = day;

    setSelectedDate(dateString || day);

    const isSun = new Date(dateString || day).getDay() === 0;
    if (isSun) {
      setIsSunday(true);
    }else{
      setIsSunday(false);
    }
  }, []);
  return { selectedDate, handleDayPress, isSunday };
};

export default useSelectedDate;
