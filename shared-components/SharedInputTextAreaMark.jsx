import { StyleSheet } from "react-native";

import { TextArea } from "@/components/ui/TextField";

/** @deprecated Use `<TextArea>` from `@/components/ui`. Borderless variant (rating comment). */
const SharedInputTextAreaMark = ({ description, setDescription, placeholderText }) => (
  <TextArea
    value={description}
    onChangeText={setDescription}
    placeholder={placeholderText}
    styles={styles}
  />
);

const styles = StyleSheet.create({
  container: { paddingTop: 15 },
  input: { width: "100%", minHeight: 100 },
});

export default SharedInputTextAreaMark;
