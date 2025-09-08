import { StyleSheet, View, Text, TextInput } from "react-native";

/**
 * A reusable component for a multiline text input field.
 * @returns {JSX.Element} The multiline text input component.
 */
const SharedInputTextArea = ({ description, setDescription }): JSX.Element => {
  return (
    <View style={styles.container}>
      {/* The core multiline TextInput component */}
      <TextInput
        style={styles.textInput}
        onChangeText={setDescription}
        value={description}
        placeholder="Enter your details here..."
        placeholderTextColor="grey"
        multiline={true} // This is the key prop for multiline behavior
        numberOfLines={4} // Optional: Hint for Android's initial height
        textAlignVertical="top" // Ensures text starts at the top on Android
        maxLength={170}
      />

      {description.length > 150 && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>{description.length} / 170</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    width: "90%",
    minHeight: 100,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 14,
    color: "white",

    // Note: The `textAlignVertical` prop is for Android to ensure text starts at the top.
    // iOS handles this automatically.
  },
  previewContainer: {
    alignContent: "flex-end",
    alignItems: "flex-end",
    width: '80%'

  },
  previewText: {
    fontSize: 16,
    color: "grey",
  },
});

export default SharedInputTextArea;
