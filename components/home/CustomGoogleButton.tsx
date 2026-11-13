import { Button } from "@/components/ui/Button";
import { useLocalization } from "@/context/LocalizationContext";

/** @deprecated Use `<Button variant="socialDark">` from `@/components/ui`. */
const CustomGoogleButton = ({ onPress, isGoogleLoading }: { onPress?: () => void; isGoogleLoading?: boolean }) => {
  const { localization } = useLocalization();
  return (
    <Button
      variant="socialDark"
      title={localization.GOOGLE_BTN.label}
      image={require("@/assets/images/googleg_64dp.png")}
      onPress={onPress}
      loading={isGoogleLoading}
      style={{ marginTop: 20, marginBottom: 30 }}
    />
  );
};

export default CustomGoogleButton;
