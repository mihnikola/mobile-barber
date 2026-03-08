import { StyleSheet, View, Text, TextInput } from "react-native";

/**
 * A reusable component for a multiline text input field.
 * @returns {JSX.Element} The multiline text input component.
 */
const SharedInputTextArea = ({
  description,
  setDescription,
  placeholderText,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      {/* The core multiline TextInput component */}
      <TextInput
        style={styles.textInput}
        onChangeText={setDescription}
        value={description}
        placeholder={placeholderText}
        placeholderTextColor="grey"
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        maxLength={170}
        scrollEnabled={false}
      />

      {description?.length > 150 && (
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
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  textInput: {
    width: "90%",
    minHeight: 100,

    fontSize: 14,
    color: "white",

    // Note: The `textAlignVertical` prop is for Android to ensure text starts at the top.
    // iOS handles this automatically.
  },
  previewContainer: {
    position: "absolute",
    alignContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    bottom: 2,
  },
  previewText: {
    fontSize: 9,
    color: "red",
    opacity: 0.7
  },
});

export default SharedInputTextArea;
