import { useLocalization } from "@/context/LocalizationContext";
import { dataIfOk, useAsync } from "@/lib/hooks/useAsync";
import { usersApi } from "@/lib/api/services";

/** Loads employees for a location + service. */
const useFetchEmployers = () => {
  const { localization } = useLocalization();
  const { data: emplData, isLoading, error, run } = useAsync([], { initialLoading: true });

  const fetchAllEmployees = (location, service) =>
    run(async () => dataIfOk(await usersApi.list({ location, service })), localization.BARBERS.error);

  return { fetchAllEmployees, emplData, isLoading, error };
};

export default useFetchEmployers;
