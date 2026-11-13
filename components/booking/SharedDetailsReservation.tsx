import { View } from "react-native";
import SharedDetailsEmployerCard from "@/components/booking/SharedDetailsEmployerCard";
import SharedDetailsServiceCard from "@/components/booking/SharedDetailsServiceCard";
import SharedOthersServices from "@/components/booking/SharedOthersServices";
import SummaryService from "@/components/booking/SummaryService";

const SharedDetailsReservation = ({ data }) => {
  const { employer, service, otherServices } = data;

  return (
    <View key={data._id || data.id}>
      <SharedDetailsEmployerCard
        data={employer}
        otherServices={otherServices}
      />

      <SharedDetailsServiceCard data={service} otherServices={otherServices} />
      {otherServices?.length > 0 &&
        otherServices?.map((item: any, index: number) => (
          <SharedOthersServices
            // API items are { service: {...} } without own id -> fall back to nested id + index
            key={`${item.id ?? item._id ?? item.service?.id ?? item.service?._id ?? "service"}-${index}`}
            data={item}
          />
        ))}
      {otherServices?.length > 0 && (
        <SummaryService
          service={service}
          data={otherServices}
          totalPrice={data?.totalPrice}
          totalDuration={data?.totalDuration}
        />
      )}
    </View>
  );
};

export default SharedDetailsReservation;
