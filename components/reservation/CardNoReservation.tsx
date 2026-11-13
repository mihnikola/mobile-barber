import { EmptyState } from "@/components/ui/EmptyState";
import { useLocalization } from "@/context/LocalizationContext";

/** No appointments (not logged in). Built from `EmptyState`. */
const CardNoReservation = () => {
  const { localization } = useLocalization();
  return <EmptyState title={localization.APPOINTMENTS.error} description={localization.APPOINTMENTS.noLogin} />;
};

export default CardNoReservation;
