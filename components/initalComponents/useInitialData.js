import { useLocalization } from "@/context/LocalizationContext";
import { get } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { useAsync } from "@/lib/hooks/useAsync";

/** Loads the app's initial payload (onboarding / company info). */
const useInitialData = () => {
  const { localization } = useLocalization();
  const { data: initialData, isLoading, error, run } = useAsync([], { initialLoading: true });

  const getInitialData = () => run(() => get(endpoints.initial), localization.INITIAL.error);

  return { initialData, isLoading, error, getInitialData };
};

export default useInitialData;
