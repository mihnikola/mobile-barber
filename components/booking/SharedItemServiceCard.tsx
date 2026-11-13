import { formatDuration, formatPrice } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";
import { ListItem, MetaRow } from "@/components/ui/Card";
import { useLocalization } from "@/context/LocalizationContext";

/** Service row in the services list. Built from `ListItem` + `MetaRow`. */
const SharedItemServiceCard = (props: any) => {
  const { redirectHandler, data } = props;
  const { image, name, duration, price } = data;
  const { localization } = useLocalization();

  return (
    <ListItem
      onPress={() => redirectHandler(data)}
      leading={image ? <Avatar uri={image} bordered /> : null}
      title={name}
    >
      <MetaRow icon="clock" spaced>{formatDuration(duration)}</MetaRow>
      <MetaRow icon="price" iconColor="star" font="bold">{formatPrice(price, localization.code)}</MetaRow>
    </ListItem>
  );
};

export default SharedItemServiceCard;
