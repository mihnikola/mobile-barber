import { useState, useCallback } from 'react';

const useSelectedDate = (initialDate) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDayPress = useCallback((day) => {
    const isSunday = new Date(day.dateString).getDay() === 0;
    if (!isSunday) {
      setSelectedDate(day);
    }
  }, []);

  return { selectedDate, handleDayPress };
};

export default useSelectedDate;