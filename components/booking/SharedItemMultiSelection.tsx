import { Avatar } from "@/components/ui/Avatar";
import { ListItem, MetaRow } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { useLocalization } from "@/context/LocalizationContext";

/** Selectable service row ("more services"). Built from `ListItem` + `MetaRow`. */
const SharedItemMultiSelection = (props: any) => {
  const { redirectHandler, data, isSelected } = props;
  const { image, name, duration, price, category } = data;
  const { localization } = useLocalization();

  return (
    <ListItem
      onPress={() => redirectHandler(category, data)}
      leading={image ? <Avatar uri={image} bordered /> : null}
      title={localization.code === "en" ? name.nameEn : name.nameLocal}
      trailing={<Icon name={isSelected ? "check" : "circle"} size="xl" color="inkMuted" />}
    >
      <MetaRow icon="clock" spaced>{`${localization.DETAILS.duration} ${duration}`}</MetaRow>
      <MetaRow icon="price" iconColor="star">{`${localization.DETAILS.price} ${price}`}</MetaRow>
    </ListItem>
  );
};

export default SharedItemMultiSelection;
