import { useLocalization } from "@/context/LocalizationContext";
import { useAsync } from "@/lib/hooks/useAsync";
import { catalogApi } from "@/lib/api/services";

/** Loads the app's initial payload (onboarding / company info). */
const useInitialData = () => {
  const { localization } = useLocalization();
  const { data: initialData, isLoading, error, run } = useAsync([], { initialLoading: true });

  const getInitialData = () => run(() => catalogApi.initial(), localization.INITIAL.error);

  return { initialData, isLoading, error, getInitialData };
};

export default useInitialData;
