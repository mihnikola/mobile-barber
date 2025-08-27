import { View, TextInput, StyleSheet, Text } from "react-native";

const MultilineInputExample = ({ description, setDescription }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your description here..."
        placeholderTextColor="grey"
        multiline={true} // This makes it a multi-line input
        numberOfLines={4} // Optional: Sets initial height to show 4 lines
        onChangeText={(newText) => setDescription(newText)}
        value={description}
        maxLength={180}
        textAlignVertical="top" // Aligns text to the top for better multi-line appearance
      />
      {description.length > 150 && (
        <Text style={styles.info}>{description.length}/180</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    color: "grey",
    fontSize: 10,
    width: "100%",
    textAlign: "right",
    paddingTop: 5,
  },
  input: {
    color: "white",
    width: "100%",
    height: 100, // Set a fixed height or use flex-grow for dynamic height
    borderColor: "gray",
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
});

export default MultilineInputExample;
