import { Button } from "@/components/ui/Button";
import { useLocalization } from "@/context/LocalizationContext";

/** @deprecated Use `<Button variant="socialLight">` from `@/components/ui`. */
const CustomAppleButton = ({ onPress, isAppleLoading }: { onPress?: () => void; isAppleLoading?: boolean }) => {
  const { localization } = useLocalization();
  return (
    <Button
      variant="socialLight"
      title={localization.APPLE_BTN.label}
      image={require("@/assets/images/apple.png")}
      onPress={onPress}
      loading={isAppleLoading}
    />
  );
};

export default CustomAppleButton;
