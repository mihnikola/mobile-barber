import React from "react";
import { ScrollView } from "react-native";
import type { ApiRecord } from "@/context/types";
import { makeStyles } from "@/theme";
import { Dialog, DialogAction, ListGroup, ListRow } from "@/components/ui";

type Props = {
  locations?: ApiRecord[];
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  handleLocationSelect: (location: ApiRecord) => void;
  title: string;
  buttonText: string;
};

/** Location picker (DS dialog with a list of salon addresses). */
function LocationsComponent({ locations, modalVisible, setModalVisible, handleLocationSelect, title, buttonText }: Props) {
  const styles = useStyles();
  const onConfirm = () => setModalVisible(false);

  return (
    <Dialog visible={modalVisible} onRequestClose={onConfirm} title={title}>
      <ScrollView style={styles.list}>
        <ListGroup style={styles.group}>
          {locations?.map((locationItem) => (
            <ListRow
              key={locationItem.id}
              icon="locationDot"
              label={locationItem.address}
              onPress={() => handleLocationSelect(locationItem)}
            />
          ))}
        </ListGroup>
      </ScrollView>
      <DialogAction title={buttonText} tone="secondary" onPress={onConfirm} />
    </Dialog>
  );
}

const useStyles = makeStyles((colors) => ({
  list: { maxHeight: 300 },
  // inside the dialog panel: no side margins, sits on the bg tone
  group: { marginHorizontal: 0, marginVertical: 0, backgroundColor: colors.bg, boxShadow: [], borderWidth: 0 },
}));

export default LocationsComponent;
