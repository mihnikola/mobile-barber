import { StyleSheet } from "react-native";

import { ListItem } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

/** Location row. Built from `ListItem` (roomier padding + gap than other list cards). */
const SharedItemLocation = (props: any) => {
  const { redirectHandler, data } = props;
  return (
    <ListItem
      onPress={() => redirectHandler(data)}
      leading={<Icon name="locationDot" size={30} color="danger" />}
      title={data.address}
      style={styles.card}
    />
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, gap: 20, alignContent: "center", alignSelf: "center" },
});

export default SharedItemLocation;
