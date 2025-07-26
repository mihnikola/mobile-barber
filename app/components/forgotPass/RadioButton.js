import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

const RadioButton = (props) => {
  return (
    <View
      // onPress={props.onPress}
      style={[styles.container, props.active && styles.active]}
    >
      <View style={[styles.iconContainer, props.active && styles.active]}>
        <IconSymbol name={props.icon} color={props.color} size={32} />
      </View>
      <View style={styles.containerInfo}>
        <View>
          <Text style={styles.label}>{props.title}</Text>
        </View>
        <View>
          <TextInput keyboardType="email-address" autoCapitalize="none" style={styles.value} value={props.value} onChangeText={props.onChangeText} placeholder="Enter a email" placeholderTextColor="black" />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    flexDirection: "row",
    marginBottom: 30
  },
  active: {
    borderColor: "white",
  },
  label: {
    color: "grey",
    padding: 5,
  },
  value: {
    color: "black",
    backgroundColor: "white",
    padding: 10,
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
