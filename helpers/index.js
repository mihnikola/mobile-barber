import AsyncStorage from "@react-native-async-storage/async-storage";

export function addMinutesToTime(inputTime, minutesToAdd) {
  // Parsiraj ulazno vreme (format je hh:mm)
  const [hours, minutes] = inputTime?.split(":").map(Number);

  // Kreiraj datum sa tim vremenom
  let date = new Date();
  date.setHours(hours, minutes, 0, 0); // Postavi vreme

  // Dodaj traženi broj minuta
  date.setMinutes(date.getMinutes() + minutesToAdd);

  // Formatiraj rezultat
  let updatedHours = String(date.getHours()).padStart(2, "0");
  let updatedMinutes = String(date.getMinutes()).padStart(2, "0");

  return `${updatedHours}:${updatedMinutes}`;
}
export const calendarTheme = {
  monthTextColor: "white",
  backgroundColor: "white",
  calendarBackground: "black",
  textSectionTitleColor: "white",
  selectedDayBackgroundColor: "white",
  selectedDayTextColor: "black",
  todayTextColor: "white",
  dayTextColor: "white",
  textMonthFontWeight: "bold",
  textDisabledColor: "grey",
};
export function convertToMonthName(dateString) {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Get the month name (e.g., January)
  const monthName = date
    .toLocaleString("en-US", { month: "long" })
    .substring(0, 3)
    .toUpperCase();

  return monthName; // Output: January
}

export function convertToDay(dateString) {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Get the day of the month
  const day = date.getDate();

  return day; // Output: January
}

export const convertDate = (item) => {
  const date = new Date(item);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  

  // Get the day of the week in Croatian
  const dayOfWeek = weekdays[date.getDay()];

  // Format the date to day-month-year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Combine everything into the desired format
  return `${dayOfWeek} ${day}-${month}-${year}`;
};

export const getStorage = async () => {

  try {
   const token = await AsyncStorage.getItem("token").then((resToken) => {
      return resToken;
    });
    return token;
  } catch (e) {
    // error reading value
  }
};
export const saveStorage = async (value) => {
  try {
    await AsyncStorage.setItem("token", value);
  } catch (e) {
    // saving error
  }
};

export const removeStorage = async () => {
  try {
    await AsyncStorage.removeItem("token").then((resToken) => {
      return resToken;
    });
  } catch (e) {
    // saving error
  }
};
