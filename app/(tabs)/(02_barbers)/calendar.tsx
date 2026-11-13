import DateComponent from "@/components/reservation/DateComponent";
import { useDismissOnUnauthorizedFocus } from "@/hooks/useRouterTest";
import { useLocalSearchParams } from "expo-router";
import { withScreen } from "@/components/ui";

const Calendar = () => {
  const { isToken } = useDismissOnUnauthorizedFocus();
  if (!isToken) return null; // hook handles redirect
  return <DateComponent />;
};

export default withScreen(Calendar);
