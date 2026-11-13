import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { ListGroup, ListRow } from "@/components/ui";
import SectionLabel from "./SectionLabel";

/** Contact section (Phase 5.6): section label + phone row. */
const ListAboutUs = ({ contact }: { contact?: string }) => {
  const { localization } = useLocalization();

  return (
    <>
      <SectionLabel>{localization.HOME.contact}</SectionLabel>
      <ListGroup>
        <ListRow icon="phone" label={contact} />
      </ListGroup>
    </>
  );
};

export default ListAboutUs;
