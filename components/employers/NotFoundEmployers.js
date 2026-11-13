import { EmptyState } from "@/components/ui/EmptyState";
import { useLocalization } from "@/context/LocalizationContext";

/** Empty list of barbers. Built from `EmptyState`. */
const NotFoundEmployers = () => {
  const { localization } = useLocalization();
  return <EmptyState title={`${localization.BARBERS.notFound} `} />;
};

export default NotFoundEmployers;
