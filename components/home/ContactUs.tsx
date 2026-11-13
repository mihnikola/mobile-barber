import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { ListGroup, ListRow } from "@/components/ui";
import SectionLabel from "./SectionLabel";

/** Working hours section (Phase 5.6): section label + one row per line. */
const ContactUs = ({ workDays, workSaturday, holidays }: { workDays?: string; workSaturday?: string; holidays?: string }) => {
  const { localization } = useLocalization();
  const lines = [workDays, workSaturday, holidays].filter(Boolean);

  return (
    <>
      <SectionLabel>{localization.HOME.aboutUs}</SectionLabel>
      <ListGroup>
        {lines.map((line, i) => (
          <ListRow key={i} icon={i === 0 ? "clock" : undefined} label={line} />
        ))}
      </ListGroup>
    </>
  );
};

export default ContactUs;
