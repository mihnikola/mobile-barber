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

export function convertDayInitalValue(data) {
  const dataValue = data.split(",")[0];
  const [day, month, year] = dataValue.split("/");
  const result = `${year}-${month}-${day}`;
  return result;
}

export function convertToDay(dateString) {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Get the day of the month
  const day = date.getDate();

  return day; // Output: January
}
export function getCurrentUTCOffset() {
  const now = new Date();

  // getTimezoneOffset() returns the difference in minutes between UTC and local time.
  // The sign is inverted compared to how offsets are usually written (e.g., UTC+2 vs -120 minutes).
  const offsetMinutes = now.getTimezoneOffset(); // Will be -120 for Adrani (CEST/UTC+2)

  // Invert the sign and convert to hours
  const offsetHours = -offsetMinutes / 60;

  // Format the offset string
  let offsetString = "";
  if (offsetHours > 0) {
    offsetString = `+${offsetHours}`;
  } else if (offsetHours < 0) {
    offsetString = `${offsetHours}`; // Already includes the '-' sign
  } else {
    offsetString = `+0`; // For UTC
  }

  return offsetString;
}

export function getTimeForUTCOffset(offsetHours) {
  // 1. Get the current moment (internally stored as milliseconds since epoch, which is timezone-agnostic).
  const now = new Date();
  const newString = offsetHours.substring(1);
  const offsetHoursV = parseInt(newString);

  let targetDate;

  if(offsetHours.includes("-")){
// 2. Create a *new* Date object to represent the time at the specific UTC offset.
  // We start with the UTC time of 'now' and apply the offset.
  targetDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() - offsetHoursV, // Apply the offset directly to UTC hours
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    )
  );
  }else{
    // 2. Create a *new* Date object to represent the time at the specific UTC offset.
  // We start with the UTC time of 'now' and apply the offset.
  targetDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + offsetHoursV, // Apply the offset directly to UTC hours
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    )
  );
  }
  

  // 3. Format the date components from the manipulated UTC date object.
  const year = targetDate.getUTCFullYear();
  // getUTCMonth() is 0-indexed (0 for January, 11 for December), so add 1.
  const month = (targetDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = targetDate.getUTCDate().toString().padStart(2, "0");

  // 4. Format the time components from the manipulated UTC date object.
  const hours = targetDate.getUTCHours().toString().padStart(2, "0");
  const minutes = targetDate.getUTCMinutes().toString().padStart(2, "0");
  const seconds = targetDate.getUTCSeconds().toString().padStart(2, "0");

  // Return the full date and time string
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
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

export const saveExpoTokenStorage = async (value) => {
  try {
    await AsyncStorage.setItem("tokenExpo", value);
  } catch (e) {
    // saving error
  }
};
export const getExpoTokenStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("tokenExpo").then((resToken) => {
      return resToken;
    });
    return token;
  } catch (e) {
    // error reading value
  }
};
export const removeExpoTokenStorage = async () => {
  try {
    await AsyncStorage.removeItem("tokenExpo").then((resToken) => {
      return resToken;
    });
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

export const convertAmPmTo24HourFormat = (dateTimeAmPmString) => {
  // Example input: "2025-05-26T9:39:20 AM" or "2025-05-26T9:39:20 PM"

  // Split the string into date part, time part, and AM/PM indicator
  const parts = dateTimeAmPmString.split("T");
  if (parts.length < 2) {
    console.error("Invalid input format: Missing 'T' separator.");
    return null;
  }
  const datePart = parts[0]; // "2025-05-26"

  const timeAndAmPm = parts[1].split(" ");
  if (timeAndAmPm.length < 1) {
    console.error(
      "Invalid input format: Missing AM/PM indicator or space after time."
    );
    return null;
  }
  const timePart12Hour = timeAndAmPm[0]; // "9:39:20"
  const ampm = timeAndAmPm[1]; // "AM" or "PM"

  // Split the 12-hour time into hours, minutes, and seconds
  let [hour, minute, second] = timePart12Hour.split(":").map(Number);

  // Perform AM/PM conversion
  if (ampm === "PM" && hour < 12) {
    hour += 12; // Add 12 for PM hours (e.g., 1 PM becomes 13)
  } else if (ampm === "AM" && hour === 12) {
    hour = 0; // 12 AM (midnight) becomes 00
  }

  // Format hours, minutes, and seconds to always be two digits
  const formattedHour = String(hour).padStart(2, "0");
  const formattedMinute = String(minute).padStart(2, "0");
  const formattedSecond = String(second).padStart(2, "0");

  // Reconstruct the date-time string in 24-hour format
  const outputTime24Hour = `${formattedHour}:${formattedMinute}:10`;
  const fullOutput = `${datePart}T${outputTime24Hour}`; // Or just outputTime24Hour if only time is needed

  return {
    fullDateTime24Hour: fullOutput,
    time24Hour: outputTime24Hour,
  };
};
