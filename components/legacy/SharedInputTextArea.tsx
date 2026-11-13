
import { TextArea } from "@/components/ui/TextField";
import { makeStyles } from "@/theme";

/** @deprecated Use `<TextArea>` from `@/components/ui`. Bordered card variant (reservation note). */
const SharedInputTextArea = ({
  description,
  setDescription,
  placeholderText,
}: {
  description?: string;
  setDescription?: (text: string) => void;
  placeholderText?: string;
}) => {
  const styles = useStyles();
  return (<TextArea
    value={description}
    onChangeText={setDescription}
    placeholder={placeholderText}
    styles={styles}
  />);
};

const useStyles = makeStyles((colors) => ({
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
}));

export default SharedInputTextArea;
