import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

const RadioButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.active && styles.active]}>
      <View style={[styles.iconContainer, props.active && styles.active]}>
        <IconSymbol name={props.icon} color={props.color} size={32} />
      </View>
      <View style={styles.containerInfo}>
        <View>
          <Text style={styles.label}>{props.title}</Text>
        </View>
        <View>
          <Text style={styles.value}>{props.value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    flexDirection: "row",
  },
  active: {
    borderColor:"white",
  },
  label: {
    color: "grey",
    padding: 5,
  },
  value: {
    color: "white",
    padding: 5,
  },
  iconContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    display: "flex",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 100,
    width: 60,
    height: 60,
    padding: 12,
  },

  containerInfo: {
    flex: 2,
    display: "flex",
    padding: 20,
  },
});

export default RadioButton;
