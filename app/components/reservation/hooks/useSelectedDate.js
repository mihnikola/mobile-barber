import { useState, useCallback } from 'react';

const useSelectedDate = (initialDate) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isSundayData, setIsSundayData] = useState(false);
  const handleDayPress = useCallback((day) => {
    const isSunday = new Date(day.dateString).getDay() === 0;
    if (!isSunday) {
      setSelectedDate(day);
    }else{
      setIsSundayData(true);
    }
  }, []);
  return { selectedDate, handleDayPress, isSundayData };
};


export default useSelectedDate;