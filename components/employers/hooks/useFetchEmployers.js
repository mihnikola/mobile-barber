import { useLocalization } from "@/context/LocalizationContext";
import { getData } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { dataIfOk, useAsync } from "@/lib/hooks/useAsync";

/** Loads employees for a location + service. */
const useFetchEmployers = () => {
  const { localization } = useLocalization();
  const { data: emplData, isLoading, error, run } = useAsync([], { initialLoading: true });

  const fetchAllEmployees = (location, service) =>
    run(async () => dataIfOk(await getData(endpoints.users.root, { location, service })), localization.BARBERS.error);

  return { fetchAllEmployees, emplData, isLoading, error };
};

export default useFetchEmployers;
