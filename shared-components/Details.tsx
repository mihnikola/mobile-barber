import React from "react";
import { View } from "react-native";
import SharedDetailsEmployerCard from "./SharedDetailsEmployerCard";
import SharedDetailsServiceCard from "./SharedDetailsServiceCard";
import SharedOthersServices from "./SharedOthersServices";
import SummaryService from "./SummaryService";

const Details = ({ data }) => {
  const { employer, service, otherServices } = data;
  return (
    <View>
      <SharedDetailsEmployerCard data={employer} otherServices={otherServices} />

      <SharedDetailsServiceCard data={service} otherServices={otherServices} />
      {otherServices?.length > 0 &&
        otherServices.map((item: any, index: number) => (
          <SharedOthersServices
            key={`${item.id ?? item._id ?? item.service?.id ?? item.service?._id ?? "service"}-${index}`}
            data={item}
          />
        ))}
        {otherServices?.length > 0 && <SummaryService service={service} data={otherServices}/>}
    </View>
  );
};

export default Details;
