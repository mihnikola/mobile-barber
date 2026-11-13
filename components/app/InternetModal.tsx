import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { Dialog, Icon } from "@/components/ui";

/** Blocking "no internet" dialog (DS dialog with icon tile; no button, closes when back online). */
export default function NoInternetModal({ visible }: { visible: boolean }) {
  const { localization } = useLocalization();

  return (
    <Dialog
      visible={visible}
      icon={<Icon name="wifiOff" size={32} color="ink" />}
      title={localization.INTERNET.title}
      text={localization.INTERNET.error}
    />
  );
}
