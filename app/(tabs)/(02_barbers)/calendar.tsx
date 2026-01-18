import DateComponent from "@/components/reservation/DateComponent";
import { useDismissOnUnauthorizedFocus } from "@/hooks/useRouterTest";
import { useLocalSearchParams } from "expo-router";

const Calendar = () => {
  const { reevaluted } = useLocalSearchParams();
  const { isToken } = useDismissOnUnauthorizedFocus();
  if (!isToken) return null; // hook handles redirect
  return <DateComponent reevaluted={reevaluted} />;
};

export default Calendar;
