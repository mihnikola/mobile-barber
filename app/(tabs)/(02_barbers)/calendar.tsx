import DateComponent from "@/components/reservation/DateComponent";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";
import { useDismissOnUnauthorizedFocus } from "@/hooks/useRouterTest";
import { useLocalSearchParams } from "expo-router";

const Calendar = () => {
  const { reevaluted } = useLocalSearchParams();
  const { isToken } = useDismissOnUnauthorizedFocus();
  if (!isToken) return null; // hook handles redirect
  return <DateComponent reevaluted={reevaluted} />;
};

// export default withSafeArea(Calendar);
export default Calendar;
