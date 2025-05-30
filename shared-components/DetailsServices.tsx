import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface DetailsServicesProps {
  data: {
    image: ImageSourcePropType;
    name: string;
    price: string;
  };
}
const DetailsServices: React.FC<DetailsServicesProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: data?.image}} />
      <View style={styles.info}>
        <Text style={styles.title}>{data?.name}</Text>
        <Text style={styles.duration}>{data?.duration} MIN</Text>
        <Text style={styles.price}>{data?.price} RSD</Text>
      </View>
    </View>
  );
};
export default DetailsServices;

const styles = StyleSheet.create({
  info: {
    display: "flex",
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
  duration:{
    fontSize: 13,
    color: "#ffffff",


  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: "#ffffff",
    textTransform: 'uppercase'
  },
  price: {
    fontSize: 16,
    color: "grey",
    fontStyle: "italic",
  },
});
