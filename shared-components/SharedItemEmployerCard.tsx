import { View } from "react-native";

import { Avatar } from "@/components/ui/Avatar";
import { ListItem, MetaRow } from "@/components/ui/Card";
import { roundValue } from "@/helpers";

/** Employee row in the barbers list. Built from `ListItem` + `MetaRow` + `Avatar`. */
const SharedItemEmployerCard = (props: any) => {
  const { redirectHandler, data } = props;
  const { image, name, seniority, averageRating, userCount } = data;

  return (
    <ListItem onPress={() => redirectHandler(data)} leading={<Avatar uri={image} name={name} />} title={name}>
      {/* seniority line had no font family in the old card -> system font kept (Phase 5 decides) */}
      <MetaRow icon="trophy" font="system" spaced>{`${seniority || seniority?.title}`}</MetaRow>
      <View style={{ gap: 5 }}>
        <MetaRow icon="star" iconColor="gold" font="bold">{`${roundValue(averageRating)}/5`}</MetaRow>
        <MetaRow icon="person" iconColor="gold" font="bold">
          {userCount || 0}
        </MetaRow>
      </View>
    </ListItem>
  );
};

export default SharedItemEmployerCard;
