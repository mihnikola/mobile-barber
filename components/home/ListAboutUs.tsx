import React from "react";
import { Linking } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { ListGroup, ListRow } from "@/components/ui";
import SectionLabel from "./SectionLabel";

/** Contact section (Phase 5.6): section label + phone row. */
const ListAboutUs = ({ contact }: { contact?: string }) => {
  const { localization } = useLocalization();
  // tap → phone app with the number filled in (digits and + only)
  const call = () => {
    const phone = String(contact ?? "").replace(/[^\d+]/g, "");
    if (phone) Linking.openURL(`tel:${phone}`);
  };

  return (
    <>
      <SectionLabel>{localization.HOME.contact}</SectionLabel>
      <ListGroup>
        <ListRow icon="phone" label={contact} onPress={contact ? call : undefined} />
      </ListGroup>
    </>
  );
};

export default ListAboutUs;
