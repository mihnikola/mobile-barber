import { useLocalization } from "@/context/LocalizationContext";
import { SegmentedTabs } from "@/components/ui";

type Status = "pending" | "approved" | "rejected";

/**
 * Appointment status filter as design-system SegmentedTabs (same three statuses as before;
 * the DS's „Predstojeći / Prošli“ split is a flow change, out of scope — D-024).
 */
export default function AppointmentsStatuses({
  active,
  handleStatus,
}: {
  active: string;
  handleStatus: (id: string) => void;
}) {
  const { localization } = useLocalization();
  return (
    <SegmentedTabs<Status>
      value={active as Status}
      onChange={handleStatus}
      options={[
        { value: "pending", label: localization.APPOINTMENTS.pending },
        { value: "approved", label: localization.APPOINTMENTS.approved },
        { value: "rejected", label: localization.APPOINTMENTS.rejected },
      ]}
    />
  );
}
