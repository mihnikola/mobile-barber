import React from "react";
import { Dialog, DialogAction, Icon } from "@/components/ui";

type Props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  buttonText: string;
  title: string;
};

/** "No locations" notice (DS dialog). */
function LocationNotFound({ modalVisible, setModalVisible, buttonText, title }: Props) {
  const onConfirm = () => setModalVisible(false);

  return (
    <Dialog visible={modalVisible} onRequestClose={onConfirm} icon={<Icon name="locationDot" size={32} color="ink" />} title={title}>
      <DialogAction title={buttonText} onPress={onConfirm} />
    </Dialog>
  );
}

export default LocationNotFound;
