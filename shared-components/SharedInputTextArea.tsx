import { StyleSheet } from "react-native";

import { TextArea } from "@/components/ui/TextField";
import { colors } from "@/theme";

/** @deprecated Use `<TextArea>` from `@/components/ui`. Bordered card variant (reservation note). */
const SharedInputTextArea = ({
  description,
  setDescription,
  placeholderText,
}: {
  description?: string;
  setDescription?: (text: string) => void;
  placeholderText?: string;
}) => (
  <TextArea
    value={description}
    onChangeText={setDescription}
    placeholder={placeholderText}
    styles={styles}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 12,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 15,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: { width: "90%", minHeight: 80 },
});

export default SharedInputTextArea;
