import { StyleSheet, View, Text, TextInput } from "react-native";

const SharedInputTextAreaMark = ({
  description,
  setDescription,
  placeholderText,
}) => {
  return (
    <View style={styles.container}>
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
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  textInput: {
    width: "100%",
    minHeight: 100,

    fontSize: 14,
    color: "white",

    // Note: The `textAlignVertical` prop is for Android to ensure text starts at the top.
    // iOS handles this automatically.
  },
  previewContainer: {
    alignContent: "flex-end",
    alignItems: "flex-end",
    width: "80%",
  },
  previewText: {
    fontSize: 16,
    color: "grey",
  },
});

export default SharedInputTextAreaMark;
